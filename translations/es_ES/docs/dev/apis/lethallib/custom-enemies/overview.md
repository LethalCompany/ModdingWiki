---
prev: false
next: true
description: A tutorial on implementing custom enemies to Lethal Company.
---

# Custom Enemies - Overview

## Preamble

Make sure you've done everything in the [LethalLib main page](/dev/apis/lethallib) first. This page will briefly run through what needs to be done in order to implement your own custom enemies.

In next pages, we will assume you have a copy of the example project repository on you, and when we are referring to our Unity project, we are talking about the Unity project included in the example project repository.

## Example Enemy Project Repository

:::warning IMPORTANT
Grab yourself a copy of the example enemy project at https\://github.com/Hamunii/LC-ExampleEnemy! Every asset used in the project is MIT Licensed, and can be used as a base for your own mod!
:::

We have an example enemy project which includes the full source code, Unity project, and Blender project files used for making the enemy.

## Blender

Blender is an amazing free program and it can do everything you want when making your 3D model. If you don't have a 3D model and want to make one yourself, we highly recommend using Blender.

You can install Blender from https\://www\.blender.org/, and it's also available on Flathub for Linux users.

For getting started with making your 3D models in Blender, see [3D Modeling With Blender](./blender-resources.md).

## Unity

Lethal Company uses Unity version 2022.3.9f1, and therefore we should use it too in order to avoid any issues with version differences when exporting our asset bundles.

:::warning IMPORTANT

Alternatively, you could use a patchbay like [qwpgraph](https://flathub.org/apps/org.rncbc.qpwgraph) to always force Unity to output into the audio device of your choosing. Do note that this only works if you are on PipeWire. If you are unsure on whether or not you are running PipeWire, you can see if `$ ps -e | grep pipewire` outputs anything. This command will list active processes that have "pipewire" in their name.
:::

For information about how our custom enemy is configured in Unity, see [Unity Project](./unity-project.md).

## Enemy AI

Lastly, we will go through some helpful information for coding your own enemy AI. For the article, see [Coding Our AI](./coding-ai.md).
