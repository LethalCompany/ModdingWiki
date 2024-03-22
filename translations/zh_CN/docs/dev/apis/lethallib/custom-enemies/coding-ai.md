---
prev: true
next: false
description: 介绍如何编写自己的敌人 AI。
---

# 编写自定义 AI

:::warning 重要
You should use a [decompiler](/dev/initial-setup#decompiler) to look how the enemy AI scripts work in the game. All the game code is contained inside `Lethal Company/Lethal Company_Data/Managed/Assembly-CSharp.dll`, so you should open that file in your decompiler!
:::

:::tip
See our tips for optimizing your mod testing workflow on [Mod Testing Tips](/dev/mod-testing-tips.md)! 这些在调整 AI 时会格外实用。
:::

## EnemyAI 概述

Every enemy in Lethal Company inherits from the abstract EnemyAI class, so we do the same. We will now go over some of the relevant methods:

The `Start()` method will run when the enemy spawns in a level. We can initialize our variables here.

The `Update()` method will run every frame, and we should try to avoiding intensive calculations here. Also, if `movingTowardsTargetPlayer` is set to True, the Enemy will automatically set its destination to the target player, at an interval of 0.25 seconds.

This is also where the enemy position gets updated for clients other than the host:

```cs
// ... in EnemyAI, Update()
if (!inSpecialAnimation)
{
    base.transform.position = Vector3.SmoothDamp(base.transform.position, serverPosition, ref tempVelocity, syncMovementSpeed);
    base.transform.eulerAngles = new Vector3(base.transform.eulerAngles.x, Mathf.LerpAngle(base.transform.eulerAngles.y, targetYRotation, 15f * Time.deltaTime), base.transform.eulerAngles.z);
}
```

This also means that if `syncMovementSpeed` is zero, or a very big number, the enemy movement will appear janky on clients other than the host.

The `DoAIInterval()` method runs in an interval we've set in Unity on our custom AI script which is attached to our enemy prefab. We have set this to 0.2 seconds, which is also used in the game by for example the BaboonHawk enemy and probably other enemies too.

这是 `base.DoAIInterval()` 的作用：

```cs
// ... in EnemyAI
public virtual void DoAIInterval()
{
    if (moveTowardsDestination) {
        // agent is the Nav Mesh Agent attached to our prefab
        agent.SetDestination(destination);
    }
    // 如果从 serverPosition 到当前位置的距离高于我们
    // 在 Unity 中的自定义 AI 脚本中设置的 updatePositionThreshold，
    // 则将 serverPosition 更新为服务器上的当前敌人位置。
    SyncPositionToClients();
}
```

我们可以看到，当 `moveTowardsDestination` 为 True 时，敌人会更新其目的地。 It is True by default, and also gets set True if you run the `SetDestinationToPosition()` method, returning true, which means the enemy was able to pathfind to the player. Running that method also sets `movingTowardsTargetPlayer` to False, and updates the `destination` variable.

The `OnCollideWithPlayer()` method will run when an object with a trigger collider and the Enemy AI Collision Detect (Script). This is also the collider we can hit with a shovel, and we need to implement `HitEnemy()` for our enemy to be able to take damage and die.

::: tip
When we want to implement these methods from `EnemyAI` into our AI script, we will have to use the `override` modifier on the method to override the virtual base method. We will also want to call the original virtual method inside our override method like this:

```cs
public override void DoAIInterval()
{
    // 运行原始虚拟方法
    base.DoAIInterval();
    // ... 自定义逻辑
}
```

:::

## 行为示例

### 敌人移动

The `TargetClosestPlayer()` method can be used to make the enemy change its targetPlayer to the closest player.
Then, we can for example do `SetDestinationToPosition(targetPlayer.transform.position)` to make our enemy pathfind to where targetPlayer stands.

### 使用随机而不同步

We can implement our own random variable which we initialize with a set seed in our `Start()` method, and use it like this:

```cs
System.Random enemyRandom;

public override void Start()
{
    base.Start();
    enemyRandom = new System.Random(StartOfRound.Instance.randomMapSeed + thisEnemyIndex);
}
```

And we can use it for example this: `enemyRandom.Next(0, 5)`. This will choose the next random integer in our range.

We should still be careful about using random, as it is still possible that for example some `if` statement might have a different outcome due to some small desync, and then our random numbers also get desynced.

One way to ensure we don't get desync is to use ClientRpc methods, as those are networked. See the Unity Docs on [ClientRpcs](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/clientrpc/) for more information. To be able to use these methods like in Unity, we can use [Unity Netcode Patcher](https://github.com/EvaisaDev/UnityNetcodePatcher). It is already set up in our example enemy project.

## 制作更复杂的 AI

In order to properly structure our AI when it gets more complex is to use enums. Enums can be used to more explicitly define the "state" that our AI is in. Do note however that the game uses `currentBehaviourStateIndex` for the state of the enemy's behavior, and this can be changed with `SwitchToBehaviourClientRpc()`. For example:

```cs
class MyComplexAI : EnemyAI {
    // 注意：还可以在 Unity 中的敌人脚本中添加行为状态，
    // 你可以在其中配置语音/特效片段或动画，
    // 以便在切换到特定行为状态时播放。
    // 如果不这样做，就会出现索引超出范围的异常。
    enum State
    {
        WANDERING,
        CHASING,
        // ... 以及更多的状态
    }
    // ...
    private void SomeExampleMethod()
    {
        // 敌人的所有者（默认为主机）需要调用下面的方法。
        // 该方法是一个 ClientRpc，这意味着它将为所有客户端运行。
        // 这将更新 currentBehaviourStateIndex。
        SwitchToBehaviourClientRpc((int)State.CHASING);
    }
}
```

Now we have two states in this example, the `WANDERING` state and the `CHASING` state. What's great about enums is that we can very easily add a new state to our AI. In order to use our new states we need to modify our `DoAIInterval()` method.

```cs
class MyComplexAI : EnemyAI
{
    enum State
    {
        WANDERING,
        CHASING,
        // ... 以及更多的状态
    }
    // ...
    public override void DoAIInterval()
    {
        // 运行初始虚拟方法来同步敌人的位置
        // 并更新敌人的路径目标。
        base.DoAIInterval();

        // switch 是一种更高级的 if 语句，可以让
        // 我们更轻松地定义在每个状态下应该
        // 发生的事，而不是仅使用一大堆 if。
        switch(currentBehaviourStateIndex)
        { 
            case State.WANDERING:
                // ... 处理寻找玩家或
                // 四处游荡的逻辑。

                // 这个断点非常重要，它意味着
                // 我们不会继续进行下一段代码
                // 来处理不同的状态。
                break; 
            case State.CHASING:
                // ... 当我们追逐一名玩家时，还有其他逻辑可以处理。
                break;
        }
    }
}
```

Now all we need to do is instruct _when_ the AI should change state:

```cs
// ... in our DoAIInterval() method
switch(currentBehaviourStateIndex)
{ 
    case State.WANDERING:
        // ... logic for looking for a player or just wandering around.
        if (foundPlayer)
        {
            SwitchToBehaviourClientRpc((int)State.CHASING);
            // The game will also print out some debug statements when the
            // above method is called.
        }
        break;
    case State.CHASING:
        // ... other logic to handle when we are chasing at a player.
        if (lostPlayer)
        {
            SwitchToBehaviourClientRpc((int)State.WANDERING);
        }
        break;
}
```

We've now converted our AI into a state machine by using an enum! This helps you organize larger AI systems into chunks that can't interfere with each other so you'll encounter less bugs. It's also a lot easier for you to now add more states to your AI without having to use a bunch of `if` checks.

## 外部资源

### C# 参考

[Virtual modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/virtual)\
[Override modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/override)\
[Abstract modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstract)\
[Enums](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum)\
[Switch statement](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement)

### 联网 - Unity 文档

:::warning 重要
We are using [Unity Netcode Patcher](https://github.com/EvaisaDev/UnityNetcodePatcher) to make our custom Rpc methods work.
:::

[ClientRpc](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/clientrpc/)\
[ServerRpc](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/serverrpc/)
