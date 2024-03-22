---
prev: true
next: true
description: How to create Configurable Company pages for your plugin and how to use them.
---

# Developing Pages with Configurable Company

Here you will understand what are pages, how to create and use them.

## What is a Page

The in-game menu provides an easy way to distribute your configurations and categories into **pages**, allowing the user to see what plugin added some configuration and the developer to have a reserved panel so there are no conflicts with other plugins.

## Creating a Page

Creating a page is the simplest of operations you can do. Call `LethalConfiguration.CreatePage()` and it will provide you with the needed builder.

Here is an example on how you can create a page:

:::info
If you don't know what a parameter does, check [parameters](#parameters) section.
:::

```csharp
ConfigurationPage page = LethalConfiguration.CreatePage()
    .SetName("My plugin page")
    .Build();
```

:::tip
It's not necesary to call `Build()` if you are assigning the builder to a `ConfigurationPage` as it will implicitly call the build method to create the page.
:::

## Parameters

- `SetName(string)`: The name that will be displayed on the in-game menu.

## Using a Page

To use a page, you need to store the page variable itself and assign [configuration categories](/dev/apis/configurable-company/developing-categories.md) to it.

`ConfigurationCategoryBuilder.SetPage(page)`

:::tip
You can declare pages as `internal static readonly` variables to access them anywhere in your project.
:::
