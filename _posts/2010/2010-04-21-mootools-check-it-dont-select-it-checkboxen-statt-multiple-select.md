---
layout: single
title: |
    Mootools "Check it, don't select it" - Checkboxen statt multiple Select<!--:en-->Mootools "Check it, don't select it" - checkboxes instead of multiple select
published: true
comments: true
date: 2010-04-21 12:04:37
tags:
    - checkbox
    - mehrfachauswahl
    - plugin
    - select
    - usability
categories:
    - mootools
permalink: /blog/2010/04/21/mootools/mootools-check-it-dont-select-it-checkboxen-statt-multiple-select
image:
    thumb: Check-it-dont-select-it.gif
---
> Bereits vor einigen Jahren habe ich das [Statement von Nicholas Rougeux bezüglich der Nutzerfreundlichkeit von Mehrfachauswahlfeldern][1] (select[multiple]) gelesen. Er stellt als Alternative dazu eine CheckedListBox vor. Diese habe ich zur freien Verwendung in eine Mootools-Klasse gepackt.



## Select[multiple] ist nicht sehr benutzerfreundlich

Um den Artikel kurz aufzugreifen: Auswahlfelder mit Mehrfachauswahl sind nicht sehr benutzerfreundlich. Der Nutzer muss zum Selektieren mehrerer Werte die Strg-Taste gedrückt halten &#8211; lässt er einmal aus Versehen los (z.B. beim Scrollen durch die Liste) und markiert nun einen Wert, so ist nur noch dieser allein ausgewählt. Das Gleiche Problem zeigt sich beim Benutzen der Hoch und Runter-Tasten zum Navigieren der Optionen.

## Eine Liste von Checkboxen als Alternative 

Checkboxen sind hingegen einfacher in der Bedienung: Ein Klick aktiviert sie, ein weiterer deselektiert sie wieder. Der Nutzer kann sich so leichter auf seine primäre Aufgabe (das Selektieren von Optionen) konzentrieren, als darauf zu achten, bestimmte Tasten zu drücken.

## CheckedListBox für Mootools

Zur Wiederverwendung und schnellen Verbesserung der Benutzerfreundlichkeit auch in bestehenden Systemen (wo z.B. die HTML-Templates nicht geändert werden sollen) habe ich eine Mootools-Klasse geschrieben, welche select[multiple]-Elemente in ungeordnete Listen von input[type=checkbox] überführt. Dabei übernimmt es die Dimensionen des select-Feldes, damit das Layout nicht springt.

In dieser Implementierung steht es frei, eine Mehrfachauswahl vollständig durch eine Liste von Checkboxen zu ersetzen oder die Mehrfachauswahl nur auszublenden. Letzteres kann vor allem sinnvoll sein, um bereits bestehende Javascripte, welche das select-Element in seiner Funktion erweitern (z.B. Filter) nicht anpassen zu müssen. Um das select zu komplett zu ersetzen, kann dem Konstruktor die Option replaceOriginal übergeben werden.

window.addEvent("domready", (function($){
   new CheckedListBox($("mySelect"));
   new CheckedListBox($("mySelect2"), {replaceOriginal: true} )
}).pass(document.id) );


## Download

Es ist natürlich noch viel Raum für Verbesserungen. Vorschläge/Patches sind willkommen :): 

Bis ich das Plugin für die Mootools Forge aufbereitet habe, kann folgender Download Link genutzt werden:

[CheckedListBox.js (2,88 kB)][2]{.download}

Das minimal benötigte CSS (vgl. auch die Demo weiter unten für ein vollständiges Beispiel):

.cidsi{
   border: 1px solid #ccc;
}

.cidsi li label:hover, .cidsi label.cidsi-checked{
   background-color: #EFFF79;
}

.cidsi li label{
   cursor: pointer;
   border-bottom: 1px dotted #ccc;
   text-indent: -35px;
   display: block;
   padding: 10px 10px 10px 35px;
}

.cidsi li label input{
   vertical-align: top;
   margin:0 10px;
}

* html .checklist label { height: 1%; }


## Demo

 [1]: http://c82.net/posts.php?id=25 "Beitrag auf c82.net in englischer Sprache lesen"
 [2]: http://mediavrog.net/blog/wp-content/uploads/2010/03/CheckedListBox.js