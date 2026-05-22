---
title: "TGM to PGM Transition"
description: "A new era for Warzone"
date: "2022-01-24"
author: "BennyDoesStuff"
---

In addition to the stat reset announced, we will be replacing our own custom plugin, TGM, with a community alternative used by similar servers, PGM. PGM offers increased map customizability among many other features that make it a worthy plugin for Warzone. PGM also served as the inspiration for TGM's creation.

🗺️ **For Mapmakers**

* PGM uses a different format for map scripting (XML, instead of JSON)
* Map worlds must be for Minecraft 1.8.9
* Our new map collection will be made public soon
* Mapmakers should check the pinned messages in `#mapmaking` for more information on making PGM maps or converting their own TGM maps

🧑‍💻 **For Contributors**

* Warzone will use a custom open-source plugin, Mars, to hook into PGM and provide Warzone-specific features
* Mars depends on an open-source API server (similar to TGM's setup), Mars API – both are written in Kotlin
* Most aspects of gameplay are handled by [PGM](https://github.com/PGMDev/PGM), but we are happy to take feature requests & bug reports and implement them either in Mars or PGM when possible
* Contributors should check the pinned messages in `#contributing` for more information on contributing to Mars

🔨 **For Server Admins**

* TGM will be discontinued but will remain [available on GitHub](https://github.com/Warzone/TGM)
* We may offer support for TGM where possible, but it is highly recommended to switch to PGM & Mars if possible
* PGM only supports version 1.8.8 servers, but can support newer clients with protocol hack plugins (like ProtocolSupport & ViaVersion)
* We will support server admins setting up Mars on their server in `#contributing`
* Mars is not required to use PGM. PGM is enough for many cases.

We are happy to answer any questions about any of the changes in `#mapmaking` & `#contributing`

We'd like to extend a big thanks to all TGM mapmakers & contributors who have lent their time to improve our plugin & map collection over the years, and all TGM server admins who have continued to use and offer improvements to our plugin. We hope you will stay with us as we move forward into this new era of Warzone.
