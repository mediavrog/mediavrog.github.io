---
layout: post
title: 'kj_imagelightbox 2 für mootools slimbox'
published: true
comments: true
date: 2008-05-23 08:05:21
tags:
    - extension
    - lightbox
    - mootools
    - slimbox
    - typo3
categories:
    - extensions
    - mootools
image:
    thumb: mootools.jpg
---
> Ich habe mich vor einiger Zeit mal mit dem Typo3 Plugin kj_imagelightbox 2 befasst und es in einem Projekt eingesetzt. Da ich aber anstatt der Kombination aus Prototype/Scriptaculous/Lightbox lieber eine mootools/slimbox einsetzen wollte, habe ich das Plugin entsprechend umgeschrieben, so dass es möglich wird, mootools zu verwenden.



**Meine Anpassungen basieren auf der Version 1.4.2 der kj Imagelightbox.**

## Die &#8222;neue&#8220; kj_imagelightbox

Folgende Möglichkeiten bieten sich nun in der Extension-Konfiguration:

  * **Use mootools slimbox** &#8211; JS will be mootools/slimbox instead of prototype/scriptaculous/lightbox (more lightweight) [_selbserklärend_]
  * **Deactivate inclusion of JSFramework &#8211;** useful if you are already using this js framework on your site [_Option zum Abschalten der Einbindung des Javascript-Frameworks, falls es auf der Seite schon verwendet wird_]

Alle anderen Einstellungen für die Lightbox werden auch für die Slimbox übernommen.

## Download

[t3x\_kj\_imagelightbox2-1\_4\_2 [ *.t3x, 738 kB ]][1]

[paypal]Ist dir diese Arbeit 1 € wert?[/paypal]
  
.

## gepatchte Files {.prepend-top}

  * class.ux\_tslib\_content.php
  * ext\_conf\_template.txt
  * ext_tables.php
  * neuer Ordner &#8222;slimbox&#8220; mit den Files der Slimbox sortiert in Ordnern css, images, js

Danke an den [Programmierer dieses schönen Plugins][2].

 [1]: http://mediavrog.net/blog/wp-content/uploads/2008/05/t3x_kj_imagelightbox2-1_4_2.t3x
 [2]: http://www.typo3-tutorials.org/meine-extensions/kj-imagelightbox-v2.html "kj imagelightbox auf typo3-tutorials.de runterladen und Kudos verteilen"