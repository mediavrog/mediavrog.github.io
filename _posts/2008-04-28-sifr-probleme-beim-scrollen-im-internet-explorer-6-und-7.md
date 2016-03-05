---
layout: post
title: 'sIFR Probleme beim Scrollen im Internet Explorer 6 und 7'
published: true
comments: true
date: 2008-04-28 01:04:19
tags:
    - bugfix
    - Internet Explorer (IE)
    - scrollen
    - scrolling
    - sifr
categories:
    - javascript
permalink: /blog/2008/04/28/javascript/sifr-probleme-beim-scrollen-im-internet-explorer-6-und-7
image:
    thumb: javascript.jpg
---
> Wie schon in einem vergangenen Artikel bemerkt, gibt es immer noch Probleme im Einsatz mit [sIFR][1] &#8211; ein hartnäckiges Problem und ein absoluter Blocker im IE ist das Verhalten von [sIFR][1]-Überschriften mit transparentem Hintergrund.



Eine kurze Erklärung: [der Sachverhalt bezieht sich auf sIFR 3 Revisionen bis 405]

## Beschreibung des Fehlverhaltens / Voraussetzungen

Nutzt man den transparenten Hintergrund von [sIFR][2]-Überschriften (in der replace-Methode wmode: &#8222;transparent&#8220; übergeben) so kann man im Internet Explorer, sobald sich der Mauszeiger über einer der per [sIFR][1] ersetzten Überschriften befindet, [die Seite nicht mehr scrollen][3]. Der Flash-Film entzieht dem document irgendwie den Fokus, welcher sich dann im Flash-Film selbst befindet &#8211; alle Events kommen somit nicht mehr im document der Seite an.

Dieses Problem tritt nur im Internet Explorer (6/7) auf. In anderen Browsern wie Firefox, Safari, Opera gibt es damit keine Probleme.

**Wichtig**: Setzt man den wmode-Parameter auf window (oder eben gar nicht), so tritt der Bug nicht auf, aber der Hintergrund der Überschriften wird mit einer Farbe gefüllt. Man sollte sich vorher überlegen, ob die Transparenz unbedingt nötig ist, da auch einige [Performanceprobleme mit transparenten Flash-Filmen][4] auftreten können &#8211; insbesondere wenn viele Überschriften mit [sIFR][1] ersetzt werden.

## Dirty Workaround

Sofern sich die Überschriften immer am selben Platz befinden und nicht durch DHTML verschoben werden (z.B. durch ein Akkordeon-Effekt) und die Überschriften nicht klickbar sein müssen, gibt es einen Weg um Scrollen auf der Seite zu ermöglichen.

### Die Idee

Lege über jede ersetzte Überschrift einen DIV-Layer, mit statischer Position und Breite/Höhe der [sIFR][1]-Überschrift. Somit kann das Flash-Objekt den Fokus nicht mehr stehlen.

### Umsetzung

Dazu nutzt man den onReplacement-Callback der als Parameter an die replace-Methode übergeben werden kann (siehe [Dokumentation][5]).

onReplacement (Function)
Event handler which fires when an element has been replaced. It's argument is a FlashInteractor object

Anhand dieses Callback kann man pro ersetzter Überschrift JS Code ausführen. In **Pseudocode**:

onReplacement: function(obj){
if(ie){
     var tmpSize = getSize(obj.ancestor);
     var tmpPos = getPos(obj.ancestor);

     //create Div with size/pos from above with position absolute
     var bogusLayer = new Element("div").setPos(tmpPos).setSize(tmpSize).setPositionMode("static");
     bogusLayer.setOpacity(0.001);

     //insert div into dom, above the sifr-replaced object
     bogusLayer.injectAsFirstElement(obj.ancestor);
}
}

Bis Mark Wubben einen wirklichen Workaround gefunden hat, ist dies eine Möglichkeit den Bug zu umgehen.

 [1]: http://novemberborn.net/sifr3 "sIFR Homepage öffnen"
 [2]: http://novemberborn.net/sifr3 "sIFR Homepage  öffnen"
 [3]: http://discuss.joyent.com/viewtopic.php?pid=177300 "Diskussion über den Bug im Joyent-Forum öffnen"
 [4]: http://mediavrog.net/blog/2008/02/25/browser/firefox/flash-wmode-transparent-evil-firefox/ "Artikel zu Performanceproblemen von Flash-Filmen (besonders im Firefox)"
 [5]: http://wiki.novemberborn.net/sifr3/JavaScript+Methods "Dokumentation zu sIFR Javascript Methoden und Parameter öffnen."