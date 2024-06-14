---
prev: true
next: false
description: How modders can use LethalAnalytics in a way that respects user privacy and keeps users informed.
---

# README & User Privacy

::: danger
When using LethalAnalytics, it's extremely recommended that you include some sort of ``README`` notice for your mod. Such notice may be required by law in certain areas.
:::

See the below example for assistance (it's in the ``README`` of LethalAnalytics). **It's always important to be transparent and respect user privacy.** <u>NEVER upload PII or otherwise personal/private user information.</u> Users should know what events are being collected and why.

## Telemetrics
Unless turned off in the config, LethalAnalytics may upload small amounts of Lethal Company and LAs user data. This helps me understand what features are used the most and what I can improve.

**What's collected?**
- OS, LC, and LethalAnalytics version data
- Your CPU (type), GPU (type), and screen resolution
- The names of mods that use LAs, the amount of events sent (but not their contents), and a few game events
- Your language and region (ex. en-US, Chicago)

::: info
Your Steam username is NOT sent (to keep things anon.).
:::

## Consent & Opting Out
Thanks to [LethalConfig](https://thunderstore.io/c/lethal-company/p/AinaVT/LethalConfig/), LethalAnalytics allows its users to disable *some or all* telemetrics tracking via a simple, in-game config. If your mod gets disabled, you wont see any analytics events from that user.

You can check whether telemetrics have been disabled by acessing the following (read-only) bool values:
```c#
AnalyticsManager.telemetricsEnabled			(all properties)
gaSession.telemetricsEnabled				(your property)
```

::: danger
The above values are provided for informational purposes. DO NOT bother users who've disabled telemetrics.
:::