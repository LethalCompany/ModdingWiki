---
prev: true
next: true
description: Resources on making your own 3D enemy models for Unity.
---

# 3D Modeling With Blender

On this page, we have listed various resources in order to help you get started with making your own 3D models in Blender, including how to get your models into Unity.

:::tip
You can check the ExampleEnemy Blender project included in the example enemy repository for reference. It can be found under `AssetSources/Blender`.
:::

## Blender Basics

:::tip
Don't press random keys, as Blender has a lot of keyboard shortcuts and you might have no idea what you just did or how to undo it. That said, keyboard shortcuts can speed up your workflow by a lot, and you can use this [Blender Shortcuts Cheat Sheet](https://docs.google.com/document/d/1zPBgZAdftWa6WVa7UIFUqW_7EcqOYE0X743RqFuJL3o/edit?pli=1#heading=h.ftqi9ub1gec3) by Blender Guru, which can be useful.
:::

If you have absolutely no experience with Blender, the 5 first parts of this series will be relevant.\
[Blender 4.0 Beginner Donut Tutorial](https://www.youtube.com/playlist?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z) (playlist) - Blender Guru

- [Part 1: Introduction](https://youtu.be/B0J27sf9N1Y?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z) - Introduces the very basics of Blender
- [Part 2: Basic Modeling](https://youtu.be/tBpnKTAc5Eo?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z) - Self-explanatory (Learn to model a Donut)
- [Part 3: Modeling the Icing](https://youtu.be/AqJx5TJyhes?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z\&t=42) - introduces more advanced modeling techniques (Detailing)
- [Part 4: Sculpting](https://youtu.be/--GVNZnSROc?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z) - Sculpting can be especially useful when modeling organic things
- [Part 5: Shading](https://youtu.be/fsLO1F5x7yM?list=PLjEaoINr3zgEPv5y--4MKpciLaoQYZB1Z) - Materials, texturing, UV unwrapping

## Modeling

- [Fast Character Modeling with the Skin Modifier in Blender](https://youtu.be/DAAwy_l4jw4) - Joey Carlino
  - Introduces a super cool and easy modeling technique. I recommend this a lot for learning to make basic initial meshes for characters or creatures.

### Modeling - Common Issues

**Q: My mesh looks inverted in Blender or when imported to Unity.**

> This is because your normals got inverted in one way or another. Select your mesh in Edit Mode, press `A` to select everything, press `Shift+N` to recalculate your normals (do not select "Inside", that is the flipped state).\ <br>
> If this doesn't fix the problem after importing to Unity, you likely have resized your object by a negative amount. This looks normal in Blender, but not in Unity. To fix this, go into Object Mode, select your object, press `Ctrl+A`, select apply scale. Now your normals should have flipped in Blender. Now, recalculate normals.

## Materials, Texturing & UV Unwrapping

:::info
Unity does not understand Blender's shader node system. If you use it for anything other than the principled BSDF, you will have to bake your material as a texture before it will work in Unity. Also make note of the fact that Lethal Company automatically adds its own "style" to everything, so you don't need to worry about that. However, textures are not necessary so you can basically skip this section entirely.
:::

- [Blender 4.0 - Texture Painting quick start guide](https://youtu.be/iwWoXMWzC_c) - Jamie Dunbar
  - Introduction to texturing models.
- [Blender 4.0: How to UV Unwrap Anything](https://youtu.be/XleO7DBm1Us) - On Mars 3D
  - UV Unwrapping and dealing with UV maps.

## Rigging

- [Tutorial: My New Rigging Workflow in Blender](https://youtu.be/BiPoPMnU2VI) - Polyfjord
  - Inverse kinematics on a mechanical character. Very useful for rigging legs.
- [Rigging for impatient people - Blender Tutorial](https://youtu.be/DDeB4tDVCGY) - Joey Carlino
  - Includes a lot of useful information about rigging, but it's a very fast paced video. Can be fairly hard to follow for a complete beginner. Likely a better watch after you've seen the more basic introductory type tutorials first.
- [How to Rig and Animate in BLENDER!](https://youtu.be/1khSuB6sER0) - ProductionCrate
  - Learn how to make a rig for a humanoid character, fix issues with Blender's automatic weights feature, as well as inverse kinematics.

## Animation & NLA (Nonlinear Animation) Editor

:::info
We should put our individual animations in the NLA Editor so we can use them separately in Unity. The length of the animation in Unity will be the length that you set in the NLA editor. This is important to know if you set an animation cycle to repeat a certain amount of times in Blender when you want to for example preview it in combination with your other animations.
:::

- [The Nuts and Bolts of Blender's animation system](https://youtu.be/p3m57yAcsi0) - CGDive
  - Introduces concepts in a very in-depth way. Introduces Timeline, Dope Sheet, Graph Editor, NLA Editor, Actions.
- [Un-confusing the NLA Editor (Nonlinear Animation)](https://youtu.be/tAo7HxxxA08) - GCDive
  - A more in-depth video about the NLA Editor. Do note though, we do not need to do anything complex with the NLA Editor.
- [Become a PRO at Animation in 25 Minutes | Blender Tutorial](https://youtu.be/_C2ClFO3FAY) - CG Geek
  - Animating a walk cycle. Uses Timeline, Dope Sheet and Graph Editor. Uses references for animation.
- [Character animation for impatient people - Blender Tutorial](https://youtu.be/GAIZkIfXXjQ) - Joey Carlino
  - If you don't want to make and rig your own models.

### Animation - Common Issues

**Q: Objects in my model appear in different places as in Blender when exporting to Unity.**

> This might be because you have directly animated an object, instead of an armature. Try parenting your object to an armature and remake your animation with that.

**Q: Some animations do nothing in Unity.**

> This might be because you have animations with the same name in your NLA editor. Make sure your animations have unique names.

## Exporting Assets For Unity

To export your model, go to: `File` -> `Export` -> `FBX (.fbx)`\
This will open our FBX exporter window, where we have some options available to us. If you have put your animations in the NLA editor, you'll want to disable `All Actions` under the `Bake Animation` dropdown.

![Screenshot: Export as FBX Settings](/images/lethallib/custom-enemies/blender/BlenderExportAsFBX.png)

The most important thing here however is the transform section. Because of the differences in Blender's and Unity's coordinate systems, exporting your model is not quite as straight-forward as you'd think. It's very easy to get your model pointing in the wrong direction, being sideways, or even upside down if you don't have correct values set.

Blender considers "Forward" to be `-Y`, while in Unity it's `Z`. And "Up" in Blender is `Z`, while in Unity it's `Y`. "Forward" is illustrated with the green arrow in the image below, while the blue arrow is "Up". The left side represents Blender's coordinate space, center represents our export settings in Blender's space, while the right side represents the output in Unity's space.

![Illustration: Blender coordinates to Unity](/images/lethallib/custom-enemies/blender/BlenderToUnityCoordinates.png)

We set `Forward` (`-Y`) to `-Z Forward`, and `Up` (`Z`) to `Y Up` and our model appears correctly in Unity space. The reason `-Z Forward` becomes positive `Z` might be because technically, `Z` is inverted between Blender and Unity, which we can see in the illustration.

## Exporting an Updated Version of Your Model For Unity

:::danger
Make sure to have a backup of your Unity project before doing this!
:::

If you have made changes to your model in Blender and want to bring the updated model into Unity, you will want to export your model again, overwriting the previous FBX file. Don't delete the previous version of the model or the accompanying .meta file, and don't overwrite the model inside of Unity. We want to keep all the references intact, and the best way to do that is to overwrite the FBX file from outside of Unity.
