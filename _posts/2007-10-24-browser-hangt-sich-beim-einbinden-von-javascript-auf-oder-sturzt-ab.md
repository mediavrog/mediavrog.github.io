---
layout: post
title: 'Browser hängt sich beim Einbinden von Javascript auf oder stürzt ab'
published: true
comments: true
date: 2007-10-24 07:10:25
tags:
    - absturz
    - browser
    - javascript
    - jsmin
    - kompression
    - obfuscation
    - yui-compressor
categories:
    - browser
    - javascript
image:
    thumb: javascript.jpg
---
> Viele Probleme beim Einbinden von Javascript Bibliotheken oder Frameworks (z.B. mootools, dojo,..) rühren aus einer
 starken Komprimierung, welche das Script zugleich &#8222;verschleiert&#8220; (obfuscate).

Das Script wird dann beim Aufruf in einigen Fällen (z.B. Dean Edwards Packer) mit einer **eval()** Funktion wieder
 aufbereitet (quasi entpackt) und für den Browser nutzbar gemacht. Diese starke Form der Komprimierung unter Zuhilfenahme von eval() zum Entpacken führt ab und zu zum Absturz des Browsers (sowohl IE 6 / IE 7 als auch Firefox und weitere) bzw. das Script läuft sich fest. Um das zu verhindern sollte man auf eine andere Kompressionsmethode zurückgreifen.

## Meine Empfehlungen:

  * eine etwas geringere Komprimierungsstufe (welche kein eval benutzt) wählen, z.B. [**jsMin**][1] 
      * + kann on-the-fly komprimiert werden, da relativ schnell
      * + keine Browserabstürze da ohne eval
      * + Implementierung in diversen Programmiersprachen verfügbar
      * &#8211; keine Optimale Komprimierung, da nur Leerzeichen, Kommentare und Zeilenumbrüche entfernt werden
      * &#8211; das Javascript bleibt danach immer noch lesbar
  * der neue [**YUI-Kompressor**][2] aus dem Hause Yahoo 
      * + ein Mix aus überflüssigen Zeichen entfernen und Verschleierung (obfuscation) sorgt für sehr hohe Kompressionsraten
      * + die Scripte sind nicht mehr lesbar und somit besser geschützt
      * + keine Browserabstürze da ohne eval
      * + auf jedem System einsetzbar &#8211; basiert auf Java Technologie
      * &#8211; nicht on-the-fly nutzbar, weil es langsamer ist als z.B. jsmin oder dojo compressor

Letztere Variante ist mir sehr sympathisch und ich werde den Kompressor die Tage mal testen. Die Sourcen hab
 ich schon gezogen :) Ergebnisse gibts dann in einem neuen Artikel.

 [1]: http://www.crockford.com/javascript/jsmin.html "Weitere Infos zu JSMin öffnen"
 [2]: http://www.julienlecomte.net/blog/2007/08/13/introducing-the-yui-compressor/ "Weitere Infos zu, YUI Kompressor öffnen"