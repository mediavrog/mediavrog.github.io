---
layout: post
title: 'String in Dom und Dom in String konvertieren<!--:en-->Parse string to dom and dom to string'
published: true
comments: true
date: 2009-10-21 08:10:50
tags:
    - javascript
    - widget
    - xml
categories:
    - javascript
permalink: /blog/2009/10/21/javascript/parse-string-to-dom-and-dom-to-strin
image:
    thumb: javascript.jpg
---
> Das Konvertieren von Text in ein DOM und zurück ist z.B. bei der Widget-Entwicklung sehr nützlich. Meist steht nur ein Key/Value Store zur Verfügung, um Daten abzuspeichern. Um darin XML zu speichern und wieder auszulesen, können die Klassen DOMParser und XMLSerializer verwendet werden.



var xmlstring = 'Blink';

var dom = (new DOMParser()).parseFromString(xmlstring, "text/xml");

var stringAgain = (new XMLSerializer()).serializeToString(dom);