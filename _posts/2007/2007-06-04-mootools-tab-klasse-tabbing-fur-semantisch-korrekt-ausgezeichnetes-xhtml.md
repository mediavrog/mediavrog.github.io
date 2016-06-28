---
layout: single
title: 'mootools - "SmartTabs" : Tab-Klasse / Tabbing für semantisch korrekt ausgezeichnetes XHTML'
published: true
comments: true
date: 2007-06-04 12:06:38
tags:
    - javascript
    - semantisch
    - tabs
categories:
    - mootools
permalink: /blog/2007/06/04/mootools/mootools-tab-klasse-tabbing-fur-semantisch-korrekt-ausgezeichnetes-xhtml
image:
    thumb: mootools.jpg
---
> Ich habe mit mootools 1.0 eine kleine Tab-Klasse geschrieben, welche Tabs auch aus Listen erzeugen kann, damit
> das XHTML semantisch korrekt bleibt und somit auch für Screenreader der Inhalt schlüssig angeordnet ist.


Andere Scripts die ich bis jetzt fand, funktionierten meist überhaupt nicht, wenn Javascript ausgeschalten war oder
 die Überschriften und zugehörige Inhalte waren semantisch nicht korrekt angeordnet.

Ich prüfe momentan noch, ob die Klasse unter mootools 1.1 läuft und dann werde ich sie hier für jedermann verfügbar
 veröffentlichen. Die Klasse läuft problemlos ab mootools 1.0 :)

## Kurzinfo:

  * Tabs mit Javascript/mootools
  * Größe: ca. 4,3 kB
  * basiert auf Framwork: mootools 1.0/1.1
  * Lizenz: MIT

## Features:

  * Tabs aus Listen erzeugen
  * mehrere Tabs auf einer Seite problemlos
  * onActive und onBackground Callback Funktionen für z.B. Animation beim Tabwechsel
  * Klasse &#8222;json&#8220; kann als Javascript-Flag an den Body gehangen werden, um per CSS die Inhalte auch ohne Javascript fein darstellen zu können
  * Tabbing auch per Links in den Tabs möglich

## Download:

  <a href="/uploads/classtabs.js" class="btn btn-success">
  Download SmartTabs &#8211; semantic Tabs with mootools</a>

## Initialisierung:

```javascript
var props = {
    scope: ".highslide-html",
    baseulSelector: ".tabbed",
    contentSelector: ".tabcontent",
    togglerSelector: ".tabbed li.tabtoggler",
    activeTabClass: "active", 
    insertAsListItem: "li",
    addJsFlag: true
};
var tabnow = new tabs(props);
```

## ToDo&#8217;s:

  * Tabs in Tabs schachteln
  * Links außerhalb der Tabs steuern Tabbing
  * Links die Tabbing steuern generell verbessern/erweitern

**Eine kleine Doku sowie Beispiele folgen demnächst.** 
Wer findig ist, kann die Klasse schon nutzen oder schreibt mir einfach.

Es würde mich freuen wenn Du einen Kommentar hinterlässt wenn Du SmartTabs verwendest.
  
Ansonsten sind Verbesserungsvorschläge gern willkommen.