---
layout: post
title: 'mootools - custom Form Elements 1.8beta: Checkboxen und Radiobuttons selbst per CSS gestalten'
published: true
comments: true
date: 2007-06-06 07:06:29
tags:
    - custom form elements
    - style
    - forms
categories:
    - mootools
permalink: /blog/2007/06/06/mootools/mootools-customformelements-checkboxen-und-radiobuttons-selbst-per-css-gestalten
image:
    thumb: cfe.jpg
---
> **Update 08.01.10: Custom Form Elements hat sich weiterentwickelt und ist nun unter 
> [http://customformelements.net](http://customformelements.net) zu finden.**
>
> Ein kleines Stück Code, welches Checkboxen und Radiobuttons (und jetzt auch viele andere Formularelemente)
>per Javascript durch kleine DIV-Container ersetzt, welche man dann selbst per CSS gestalten kann.

An der Funktionalität jeder Checkbox und der Radiobuttons im Formular ändert sich nichts :)
Auch Labels werden unterstützt. Es ist damit also möglich, per CSS die Styles der Elemente eines Formulars anzupassen 
> siehe [Demoseite][1].

## Kurzinfo: 

  * custom Form Elements 1.8beta &#8211; Checkboxen und Radiobuttons selbst per CSS stylen
  * Größe ca. 17 kB (komprimiert; inkl. aller Module)
  * **basiert auf mootools ab v1.1**
  * benötigt folgende mootools Module 
      * Core, Class,Class.Extras, Array, String, Function, Number, Element, Element.Event, Element.Filters, Element.Selectors, Window.DomReady
  * Lizenz: MIT
  * erfolgreich getestet unter: IE7+, Firefox 2+, Opera 9.02+, Chrome 3+

## Features:

  * ersetzt 
      * Checkboxes
      * Radiobuttons
      * Fileupload
      * Textinput (inkl. Password) und Textarea
      * Select
      * Submit/Reset/Image
  * &#8230; auf der gesamten Seite oder in einem bestimmen Element (z.B. Formular) mit einer angegebenen ID durch kleine DIV-Container
  * generiert auf Wunsch Tooltips anhand der title-Attribute
  * unterstützt Tabbing / Fokussierung
  * &#8222;unobstrusive&#8220; &#8211; ohne Javascript werden die normalen Formularfelder gezeigt
  * weiteres auf der [Demoseite][1]

## Download:

  * [https://github.com/mediavrog/cfe][2]

## Demo:

  * unter [http://customformelements.net/demopage.php][3]

## Donate / Spenden

This library helped you building great things? Buy me a beer :)

{% include _donate.html %}

 [1]: http://customformelements.net/demopage.php
 [2]: https://github.com/mediavrog/cfe "Demopage zu customFormElements öffnen"
 [3]: http://customformelements.net/demopage.php "Demopage zu customFormElements öffnen"