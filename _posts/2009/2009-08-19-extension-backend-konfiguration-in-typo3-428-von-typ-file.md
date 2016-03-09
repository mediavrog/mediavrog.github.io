---
layout: post
title: 'Extension Backend Konfiguration in Typo3 4.2.8 von Typ file'
published: true
comments: true
date: 2009-08-19 07:08:19
tags:
    - bug
    - extension
    - konfiguration
    - typo3
categories:
    - extensions
    - typo3
permalink: /blog/2009/08/19/typo3/extension-backend-konfiguration-in-typo3-428-von-typ-file
image:
    thumb: typo33.jpg
---
> Ich bin gerade bei der Entwicklung einer neuen Extension auf ein seltsames Problem gestoßen, 
> bei der in der Typo3 Extension Backend Konfiguration kein File Upload möglich ist:



In der ext\_conf\_template.txt (vgl. [Hintergrundinformationen zum Konfigurieren von Extensions][1]) 
habe ich folgende Konfiguration vorgenommen:

```typoscript
# cat=cfe.basic/file; type=file; label= Use your own configuration
customConfig = EXT:cfeConfiguration.js
```

Nun sollte Typo3 im Backend ein Uploadfeld bereitstellen, welches nur Javascript-Dateien akzeptiert.

Der Output sieht aber ganz anders aus: ein Select-Feld mit der Dateiendung &#8211; nichts weiter.
  
<figure>
    <img src="/images/be-config-file-error.gif" />
    <figcaption>Konfigurationstyp: file wird als select gerendert und nicht wie erwartet als upload Feld</figcaption>
</figure>  

Kennt jemand dieses Problem unter Typo3 4.2.8? Würde mich freuen zu hören!
 Derweil versuche ich dem Problem auf die Schliche zu kommen&#8230;

 [1]: /blog/2007/05/28/typo3/extensions/backend-be-extension-konfiguration-von-konstanten-direkt-nach-installation-moglich-machen