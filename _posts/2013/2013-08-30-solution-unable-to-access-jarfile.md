---
published: true
title: "Unable to access jarfile /Applications/Android solution"
layout: single
tags: 
  - android studio
  - proguard
categories: 
  - android
---

When trying to run ProGuard from Android Studio (for example during the process of building a signed Application), the following error may pop up.

`Error [ProjectName] Unable to access jarfile /Applications/Android`
This is most likely caused in an environment, where Android Studio is installed in a path containing whitespaces and the called proguard script cannot handle whitespaces in the path. On my Mac workmachine, I installed Android Studio at:

 `/Applications/Android Studio.app`
The solution is as simple as editing

`/Applications/Android Studio.app/sdk/tools/proguard/bin/proguard.sh`
and changing

`java -jar $PROGUARD_HOME/lib/proguard.jar "$@"`
to

`java -jar "$PROGUARD_HOME/lib/proguard.jar" "$@"`