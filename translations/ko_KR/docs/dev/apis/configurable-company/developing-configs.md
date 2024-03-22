---
prev: true
next: true
description: How to create Configurable Company configurations for your plugin and how to use them.
---

# Developing Configurations with Configurable Company

Configurations are the core of the API, they allow the developer to define options that the final user can modify to whatever value they want.

Additionally configurations will be synchronized between the host and clients when they join their game.

You can add a lot of information to configurations and even modify configurations from other plugins.

:::warning
As the developer you should avoid setting the value of a configuration manually as that might interfere with the player's choice.
:::

## Creating a configuration

To create a configuration is as simple as calling `LethalConfiguration.CreateConfig`. You can choose to provide an ID right from the start or later, however all configurations must contain an unique ID.

**IDs** must be lowercase, contain only letters, numbers, hypens `-` and underscores `_`. I'd recommend to make your IDs look something like `owner_your-plugin-configuration-name`.

Here is an example on how you can create a configuration:
:::info
If you don't know what a parameter does, check [parameters](#parameters) section.
:::

```csharp
LethalConfiguration.CreateConfig()
                .SetID("developer_some-mod_sample-configuration")
                .SetName("Sample configuration")
                .SetTooltip( // Optional but recommended
                    "This is a custom configuration that does nothing",
                    "This is a second line for the tooltip",
                    "",
                    "This is another line")
                .SetCategory(category) // Optional
                .SetType(ConfigurationTypes.String)
                .SetValue("Random value")
                .SetExperimental(false) // Optional
                .SetSynchronized(false) // Optional
                .Build(); // Optional
```

:::tip
It's not necesary to call `Build()` if you are assigning the builder to a `Configuration` as it will implicitly call the build method to create the configuration.
:::

## Parameters

- `SetID(string)`: The unique ID of the configuration.
- `SetName(string)`: The name that will be displayed on the in-game menu.
- `SetTooltip(string array)`: Each line of the configuration tooltip. Keep it short and informative.
- `SetCategory(string/ConfigurationCategory)`: Wich category will hold this configuration. There must be always a category, however a default one will be used as failsafe.
- `SetType(ConfigurationType)`: The type of values that this configuration accepts. You can choose one from the alredy existing types `ConfigurationTypes.` or create your own.
- `SetValue(object)`: The value that will contain upon creation. Might be changed instantly if read from file.
- `SetExperimental(bool)`: If this configuration is not guaranteed to work. This is only visual notification for the users.
- `SetSynchronized(bool)`: Marks the configuration to be synchronized with other clients when they join the game. Useful if a configuration might only change client-side.
- `SetNeedsRestart(bool)`: Marks the configuration that the client must restart the game for it to work properly.

:::warning
Once the `Build()` is called, you will <u>**not**</u> be able to modify the category any further.
:::

## Configuration Types

You can choose to create a configuration of your own type however it will take you less time to use one of the existing ones (or request a type to be implemented):

- `String`: Allows any text (up to 32 characters).
- `SmallString`: Allows a short text (up to 10 characters).
- `Boolean`: Allows true or false.
- `Percent`: Allows a float value that goes from **0** to **100**.
- `Float`: Allows any float or whole number value.
- `Integer`: Allows any whole number value.
- `RangeInteger(min, max)`: A integer that only accepts value within the specified range.
- `RangeFloat(min, max)`: A float that only accepts values within the specified range.
- `Slider(min, max)`: A slider that allows any non-rounded value within the specified range.
- `StringOfLength(length)`: A string that allows you to set a maximum amount of characters that can go from 1 to 48.
- `Options(Enumeration/object collection or array)`: A choosable option that allows for a specific value in a collection _The provided collection must be of just one type, you **can't** use an heterogeneous array_.

## Using a Configuration

There are multiple ways you can get the value of a configuration. Each one might be used according to the situation.

- `configuration.Get<T>()`: This will retrieve the value as an instance of T, no failsafes are used if the conversion of the value to T fails.
- `configuration.Get<T>(T failsafe)`: This will retrieve the value as an instance of T but if the conversion fails it will return the `failsafe` value instead.
- `configuration.TryGet<T>(out T value)`: This is a standard TryGet that will return true if the Get succeded and false if it failed. The resulting value will be stored in `T value`.
- `configuration.Value`: Will return the raw object for the configuration without any cast or check.

You also have the option to get a configuration from it's ID, allowing you to even get configurations declared in other plugins.

```csharp
string configurationId = "some-mod_configuration";
if (LethalConfiguration.TryGetConfig(configurationId, out Configuration category)) {
    // If the configuration exists you can use it
} else {
    // If the configuration does not exists you might need to create it
}
```

_Some configuration types will be automatically converted to other types if you request it. For example the **Options** type will allow you to get the index of the item if you use `Get<int>()` or the value itself if you request it as `Get<T>()` (T being the type of the collection)._

To set a configuration you need to use `configuration.TrySet(newValue, ChangeReason)` and will return true if the set was succesful.

You can also reset a configuration to it's default value using `configuration.Reset()`.

:::warning
Keep in mind that setting or resetting configurations is not recommended as may interfere with the needs of the final user.\
I encourage you to **not** set configurations by yourself and instead let the player choose their values.
:::
