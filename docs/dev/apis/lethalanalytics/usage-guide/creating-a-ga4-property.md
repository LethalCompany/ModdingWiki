---
prev: true
next: true
description: How to create your own GA4 property in Google Analytics (for beginners).
---
<style>
.gapi { border-radius: 10px; }
</style>

# Creating a GA4 property

- Navigate to ``https://analytics.google.com/`` --> ``Create`` --> ``Property``.
- Enter your ``property name`` and ``time zone`` --> ``Next``.

<img class="gapi" alt="Create property screen" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/create_property.png"></img>
- Select an industry (ex. ``Games``) and business size (ex. ``Small``) --> ``Next``.

<img class="gapi" alt="Business info screen" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/business.png"></img>
- Select (at least) `Examine user behavior` --> ``Create``.

<img class="gapi" alt="Select intent screen" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/eub.png"></img>
- Choose the ``Web`` platform. --> Enter your ``modId`` (ex. net.YourUsername.YourMod) as the ``URL`` and type your mod name as the ``Stream name`` (verify that ``Enhanced measurement`` is on).

<img class="gapi" alt="Web platform img" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/cap.png"></img>

<img class="gapi" alt="Create web stream screen" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/web.png"></img>
- Select your newly-created ``web stream`` --> Copy the ``MEASUREMENT ID``.

<img class="gapi" alt="Copy mid image" src="/images/lethalanalytics/usage-guide/creating-a-ga4-property/mid.png"></img>
- That's it. You're all set! Use your ``MEASUREMENT ID`` when [registering a GA session](/dev/apis/lethalanalytics/usage-guide/creating-a-ga-session/). Once your users run your mod, they'll show up in your ``Realtime`` (and normal) reports with any sent events.

::: tip
Generally, it's best to keep your MEASUREMENT ID safe. Anyone with it can send data to your property (Google does a decent job at removing bots/spam, though). Feel free to hide/obfuscate it in your code.
:::