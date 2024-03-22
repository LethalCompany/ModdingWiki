---
prev: true
next: false
description: An introduction to coding your own enemy AI.
---

# Coding Our Custom AI

:::warning IMPORTANT
You should use a [decompiler](/dev/initial-setup#decompiler) to look how the enemy AI scripts work in the game. All the game code is contained inside `Lethal Company/Lethal Company_Data/Managed/Assembly-CSharp.dll`, so you should open that file in your decompiler!
:::

:::tip
See our tips for optimizing your mod testing workflow on [Mod Testing Tips](/dev/mod-testing-tips.md)! These will be particularly helpful when tweaking your AI.
:::

## Overview of EnemyAI

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

This is what `base.DoAIInterval()` does:

```cs
// ... in EnemyAI
public virtual void DoAIInterval()
{
    if (moveTowardsDestination) {
        // agent is the Nav Mesh Agent attached to our prefab
        agent.SetDestination(destination);
    }
    // Updates serverPosition to current enemy position on server if
    // distance from serverPosition to current position is above
    // updatePositionThreshold, which we set in our custom AI script
    // in Unity.
    SyncPositionToClients();
}
```

As we can see, the enemy updates its destination when `moveTowardsDestination` is True. It is True by default, and also gets set True if you run the `SetDestinationToPosition()` method, returning true, which means the enemy was able to pathfind to the player. Running that method also sets `movingTowardsTargetPlayer` to False, and updates the `destination` variable.

The `OnCollideWithPlayer()` method will run when an object with a trigger collider and the Enemy AI Collision Detect (Script). This is also the collider we can hit with a shovel, and we need to implement `HitEnemy()` for our enemy to be able to take damage and die.

::: tip
When we want to implement these methods from `EnemyAI` into our AI script, we will have to use the `override` modifier on the method to override the virtual base method. We will also want to call the original virtual method inside our override method like this:

```cs
public override void DoAIInterval()
{
    // Run original virtual method
    base.DoAIInterval();
    // ... custom logic
}
```

:::

## Behavior Examples

### Enemy Movement

The `TargetClosestPlayer()` method can be used to make the enemy change its targetPlayer to the closest player.
Then, we can for example do `SetDestinationToPosition(targetPlayer.transform.position)` to make our enemy pathfind to where targetPlayer stands.

### Using Random Without Desync

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

## Making More Complex AI

In order to properly structure our AI when it gets more complex is to use enums. Enums can be used to more explicitly define the "state" that our AI is in. Do note however that the game uses `currentBehaviourStateIndex` for the state of the enemy's behavior, and this can be changed with `SwitchToBehaviourClientRpc()`. For example:

```cs
class MyComplexAI : EnemyAI {
    // Note: also add your behavior states in your enemy script in Unity,
    // where you can configure things like a voice/sfx clip or an animation
    // to play when changing to a specific behavior state.
    // If we don't do that, we will get an index out of range exception.
    enum State
    {
        WANDERING,
        CHASING,
        // ... and many more states
    }
    // ...
    private void SomeExampleMethod()
    {
        // The owner of the enemy (the host by default) needs to call the 
        // method below. The method is a ClientRpc, meaning it will run for
        // all clients. This will update currentBehaviourStateIndex.
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
        // ... and many more states
    }
    // ...
    public override void DoAIInterval()
    {
        // Run the original virtual method to sync enemy position
        // and update the enemy's pathing target.
        base.DoAIInterval();

        // The switch is a more advanced if statement that allows us to
        // more easily define what should happen in each state vs using
        // just a bunch of ifs.
        switch(currentBehaviourStateIndex)
        { 
            case State.WANDERING:
                // ... handle logic for looking for a player or
                // just wandering around.

                // This break is VERY IMPORTANT, it means that it won't 
                // just continue onto our next bit of code for the
                // different states.
                break; 
            case State.CHASING:
                // ... other logic to handle when we are chasing a player.
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

## External Resources

### C# Reference

[Virtual modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/virtual)\
[Override modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/override)\
[Abstract modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstract)\
[Enums](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum)\
[Switch statement](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement)

### Networking - Unity Docs

:::warning IMPORTANT
We are using [Unity Netcode Patcher](https://github.com/EvaisaDev/UnityNetcodePatcher) to make our custom Rpc methods work.
:::

[ClientRpc](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/clientrpc/)\
[ServerRpc](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/serverrpc/)
