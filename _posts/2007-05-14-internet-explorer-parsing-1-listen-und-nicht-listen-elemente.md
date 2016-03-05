---
layout: post
title: 'Internet Explorer parsing #1 : Listen und nicht-listen-Elemente'
published: true
comments: true
date: 2007-05-14 06:05:33
tags:
    - Ajax (AJ)
    - DOM
    - internet-explorer
    - Parsing
    - xhtml
categories:
    - internetexplorer
    - javascript
image:
    thumb: ie.jpg
---
> Die erste nun hier erfasste Eigenheit des XHTML-Parsings des IE in einer noch entstehenden Reihe.
> 
> In einem kleinen Ajax-Projekt mit dyn. Nachladen von Komboboxen sorgte ein unerklärlicher Fehler dafür, dass im IE (6.0 und 7) ab einem bestimmten Schritt der Wert eines hidden-Fields nicht mehr mit übergeben wurde.



Nach einigem Stöbern und Kontrolle meiner Anwendung per MS Script Debugger stellte ich fest, dass das hidden-Field ab einem bestimmten Schritt aus der DOM verschwand. Auslöser dieses Problems war fehlerhaftes XHTML-Markup. Anscheinend parst der IE ein Element, welches sich in einer Liste befindet, aber selbst von keinem Listenelement umgeben wird in das vorhergehende Listenelement.

## Ein Beispiel:

&lt;ul&gt;
	&lt;li&gt;&lt;/li&gt;
&lt;input /&gt;&lt;/ul&gt;


## Das Resultat:

&lt;ul&gt;
	&lt;li&gt;
&lt;div&gt;
&lt;input /&gt;&lt;/div&gt;&lt;/li&gt;
&lt;/ul&gt;
