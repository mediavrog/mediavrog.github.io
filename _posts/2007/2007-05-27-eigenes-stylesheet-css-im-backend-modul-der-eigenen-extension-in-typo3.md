---
layout: single
title: 'Eigenes Stylesheet im Backend Modul einer Extension in Typo3'
published: true
comments: true
date: 2007-05-27 09:05:54
tags:
    - backend-modul
    - css
    - extension
    - stylesheet
categories:
    - typo3
permalink: /blog/2007/05/27/typo3/extensions/eigenes-stylesheet-css-im-backend-modul-der-eigenen-extension-in-typo3
image:
    thumb: typo3.jpg
---
> Für alle die es auch interessiert. Es gibt die Möglichkeit, ein zusätzliches Stylesheet im Backendmodul einer selbst geschriebenen Typo3-Extension zu laden.

## Konfiguration

In der main-Funktion des Backendmoduls wird per

```typoscript
$this->doc = t3lib_div::makeInstance('mediumDoc');
```

eine Instanz des template-Objektes erstellt, welches einige interessane Funktionen bietet. (Nachzulesen in der
 [offiziellen Klassendokumentation][1]).

Unter Anderen besitzt es die Membervariable `styleSheetFile2`, welche standardmäßig nicht gesetzt ist.
Und genau hier docken wir an. Beispielhaft hier mal meine Implementation:

```typoscript
$this->doc->styleSheetFile2 = "../".substr(t3lib_extMgm::extPath($this->extName),strlen(PATH_site))."mod1/style.css";
```

`$this->extName` habe ich selbst als Membervariable meines Module gesetzt (`tx_meineExtension`).
Die style.css liegt wie zu erkennen im Ordnerdes mod1-Verzeichnisses.  
Die subst-Funktion wird verwendet um einen relativen Pfad zu generieren.

**Update**
  
Robert Heel postete diesen einfacheren Vorschlag &#8211; Danke!
```typoscript
$this->doc->styleSheetFile2=$GLOBALS["temp_modPath"].’style.css’;
```

 [1]: http://typo3.org/fileadmin/typo3api-3.8.0/d4/d79/classtemplate.html "Klassendokumentation ansehen"