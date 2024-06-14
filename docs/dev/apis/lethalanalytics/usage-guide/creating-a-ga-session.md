---
prev: true
next: true
description: How to set up an instance of a GASession and connect to Google Analytics using LethalAnalytics.
---
# Creating a GA session

Just reference the static ``AnalyticsManager`` class and call the ``registerGASession(...)`` method to connect your mod to Google Analytics (GA4):
```c#
GASession gaSession = AnalyticsManager.registerGASession("net.YourUsername.YourMod", "Your Mod Name", "1.0.0", "Your mod desc. that explains what data you will collect and WHY you're collecting it.", "G-YOURMEASUREMENTID");
```
See [Creating a GA4 property](/dev/apis/lethalanalytics/usage-guide/creating-a-ga4-property/) if you need a ``MEASUREMENT ID``.

If needed, you can register multiple GA sessions (and still send events to each, separately).

::: warning
Please be careful about changing your ``modId``, ``modName``, and ``modVersion``. This can cause issues with session creation and user consent settings.
:::

Here's some documentation about its parameters:
| Parameter | Type | Description |
|:--------|:-----:|:-------------|
| modId | string | A unique static ID for your mod (ex. net.RB007.LethalMod). This should NEVER change. It's used to send user update events and check if a user is new. |
| modName | string | The name of your mod. This should also NEVER change (unless the public name of your mod somehow changes). Must only contain chars A-z, 0-9, and spaces (no special chars). This is the name users will see inside the LethalAnalytics config. |
| modVersion | string | Your mod's version (ex. 1.0.0). This will be displayed in your GA4 reports and is used to send user update events. This should change when your mod version changes. |
| modDesc | string | A short description for your mod. Please explain what data/events you wish to collect AND WHY you'll be collecting them. <ins>**NEVER collect PII or otherwise private info.**</ins> Please be transparent and respect user privacy. Make the Lethal Company modding community proud! |
| measurementId | string | Your GA4 measurement ID (ex. G-RB007ONKOFI). Check that this is correct. Be careful about sharing it and feel free to hide/obfuscate it in your code if desired. |
| screenTitle | string (optional) | The title name to send when a session is created for GA4 (default: MainMenu). |
| renewScreenTitle | string (optional) | The title name to send when a session is continued for GA4 (default: InGame). |
| sendSystemInfo | bool (optional) | Whether to send the user's CPU and GPU type along with the GA4 session_start event (as event params). OS info and screen res. will be sent regardless. |
| sessionLengthMins | int (optional) | How long a GA4 user session is set to last in minutes (default: 30). By default, sessions are re-created if they timeout (as long as the game is still open). Only change this if you know what you're doing. |

By default, every instance of ``GASession`` sends a few user events:
| Event Name | Description |
|:--------|:-------------|
| session_start | This event is sent as soon as the ``registerGASession(...)`` method is called for each user. It starts each user's session. |
| page_visit | This event is sent as soon as the ``registerGASession(...)`` method is called for each user. Includes some basic version info (and their CPU (type) and GPU (type) if enabled). |
| first_visit | This event is sent as soon as ``registerGASession(...)`` method is called for each user (for the first time). It's what lets you know if a user ran your mod for the first time. |
| update | This event is sent as soon as each user reaches Lethal Company's main menu (and they just updated your mod). It's what lets you know if a user recently updated your mod (and to what version). |
| session_end | This event is sent as soon as each user quits Lethal Company (through the main menu). It ends each user's session. |