---
next: false
description: Learn how to prepare your finished Lethal Company mod and upload it to thunderstore.
---

# Publishing your mod

There are a number of options for releasing your mods, such as different modding websites.

However, the wider Lethal Company modding community has primarily targeted the [Thunderstore](https://thunderstore.io/c/lethal-company/). Hence, we will focus on publishing to this website.

There are a number of reasons we recommend this:

- Thunderstore has a mod manager, and is used by the open-source R2ModMan mod manager -- this makes it significantly easier for users to find and install mods
- If the entire modding community targets the same modding website, that means mods are less scattered in different locations
- It makes it easier for the modding community to provide help (such as this wiki), compared to supporting multiple different platforms

<!-- ## Mod websites -->

<!-- - https://www.moddb.com/games/lethal-company -->

<!-- - https://www.nexusmods.com -->

<!-- - https://mod.io/g **(Not available currently, since Lethal Company has not been registered there yet)** -->

## Using Thunderstore

First, create an account. Once you've created your account, you'll need to set up a "Team". Do this by going to your account settings, which you can find at the top right of the window, over here:

![Thunderstore account settings](/images/publishing-your-mod/thunderstoresettings.png)

Then, go to the "Teams" tab, and click on "Create Team":

![Thunderstore Create Team button](/images/publishing-your-mod/thunderstorecreateteam.png)

We recommend using your username as team name, unless you actually have a team and an agreed-upon name for it.

To upload a mod for Lethal Company, you'll first want to go to the [Lethal Company category](https://thunderstore.io/c/lethal-company/).

All you need to do here is press the "Upload" button, which you can find at the top left:

![Thunderstore Upload button](/images/publishing-your-mod/thunderstoreupload.png)

You'll be met with the following page:

![Thunderstore Upload package page](/images/publishing-your-mod/thunderstoreuploadpackage.png)

A mod needs to be a specific format to be valid for the Thunderstore. This allows them to present your description, image, and other properties to the users.

The documentation on this format can be found [here](https://thunderstore.io/c/lethal-company/create/docs/).

For those who want a short explanation, however, you'll want to create a folder with the following:

- icon.png (PNG icon for the mod, must be 256x256 resolution)
- README.md (Readme in markdown syntax to be rendered on the package's page)
- manifest.json (JSON file with the package's metadata)
- Your mod file(s) itself (e.g. `MyMod.dll`)

Below is an example of a manifest:

```json
{
    "name": "MoonOfTheDay",
    "version_number": "1.0.3",
    "website_url": "https://github.com/MaxWasUnavailable/MoonOfTheDay",
    "description": "This is a description for a mod. 250 characters max",
    "dependencies": [
        "LethalAPI-1.0.0"
    ]
}
```

Note that you can leave dependencies empty if your mod does not have any:

```json
    "dependencies": []
```

::: warning
**Note that if you use BepInEx, you will have to add `BepInEx-BepInExPack-5.4.2100` to your dependencies:**

```json
    "dependencies": ["BepInEx-BepInExPack-5.4.2100"]
```

:::

Once you're done with all of this, happy with the way your README [will look](https://thunderstore.io/tools/markdown-preview/), and your manifest [is valid](https://thunderstore.io/tools/manifest-v1-validator/), you simply need to create a zip file and upload the mod!

**Note that the zip file has to be created using the individual files, not the folder they're in. E.g. select all of the files listed above, and _then_ create a zip.**

## Updating on Thunderstore

To update a mod on the Thunderstore, you'll need to repeat the upload process. **Make sure you have increased the version in your `manifest.json` file!**

# Discord

- The [Unofficial Lethal Company Community](https://discord.gg/nYcQFEpXfU) has a [#mod-releases](https://discord.com/channels/1169792572382773318/1169851544359927858) channel.
