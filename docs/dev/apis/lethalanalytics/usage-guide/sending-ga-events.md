---
prev: true
next: true
description: How to send custom events to Google Analytics using LethalAnalytics.
---
# Sending GA events

In order to send GA events, you'll need an instance of a ``GASession``. It's recommended that you store the previously shown GASession instance (from [Creating a GA session](/dev/apis/lethalanalytics/usage-guide/creating-a-ga-session/)) in an internal static variable. That way, you can safely access it throughout your mod assembly.
```c#
internal static GASession gaSession = AnalyticsManager.registerGASession(...);
```
Then, call the ``sendGAEvent(...)`` method, from your ``GASession`` instance, to send custom GA events to your property.
```c#
gaSession.sendGAEvent("category", "name", new Dictionary<string, string>() { ["event_param"] = "event_value" });
```

::: warning
Please be careful about sending events too quickly and keep event params minimal. Your mod shouldn't dramatically affect a user's networking.
:::

Here's some documentation about its parameters:
| Parameter | Type | Description |
|:--------|:-----:|:-------------|
| event_category | string | The category/type for the event (ex. client, state, event, etc.). |
| event_name | string | The name of the event (ex. jeb_attack, host, emote, etc.). Check https://support.google.com/analytics/answer/13316687 for help. Do not use reserved prefixes or event names (type: web). |
| event_params | Dictionary<string, string> | A dictionary of string key/value pairs that are sent as GA4 event parameters. Check https://support.google.com/analytics/answer/13316687 for help. Do not use reserved prefixes or parameter names (type: web). |
| isEngaged | bool (optional) | Whether the event should send user engagement time with it (and prolong the current session). It's recommended to keep this set to true. |

And here's an example of it in action (in the wild 😲):
```c#
[HarmonyPatch(typeof(GrabbableObject))]
public class ItemPatch
{
  [HarmonyPatch("OnBroughtToShip")]
  [HarmonyPostfix]
  public static void patchCollect(ref Item ___itemProperties, ref int ___scrapValue)
  {
    YourModClass.gaSession.sendGAEvent("event", "collect", new Dictionary<string, string>() { ["item_name"] = ___itemProperties.itemName, ["scrap_value"] = ___scrapValue.ToString(), ["elapsed"] = StartOfRound.Instance.timeSinceRoundStarted.ToString() });
  }
}
```
The event logs when a user brings a new scrap item to the ship and sends its name, value, and the time since the ship landed, to the GA property.