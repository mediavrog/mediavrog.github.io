---
layout: post
title: 'Internet Explorer parsing: Listen und nicht-listen-Elemente'
published: true
comments: true
date: 2007-05-14 06:05:33
tags:
    - don
    - parsing
    - xhtml
categories:
    - ie
permalink: /blog/2007/05/14/browser/internetexplorer/internet-explorer-parsing-1-listen-und-nicht-listen-elemente
image: 
    thumb: ie.jpg
comments:
    - timstamp: 4
      name: "Maik 4"
      message: "Hskdljl"
      url: "http://mypage.com"
    - timstamp: 3
      name: "Maik 3"
      message: "Hskdlj"
      url: "http://mypage.com"
    - timstamp: 1
      name: "Maik 1"
      message: "Hskd"
      url: "http://mypage.com"
    - timstamp: 2
      name: "Maik 2"
      message: "Hs"
      url: "http://mypage.com"
---
> In einem kleinen Ajax-Projekt mit dyn. Nachladen von Komboboxen sorgte ein unerklärlicher Fehler dafür, dass im IE 
> (6.0 und 7) ab einem bestimmten Schritt der Wert eines hidden-Fields nicht mehr mit übergeben wurde.

Nach einigem Stöbern und Kontrolle meiner Anwendung per MS Script Debugger stellte ich fest, dass das hidden-Field ab einem bestimmten Schritt aus der DOM verschwand. Auslöser dieses Problems war fehlerhaftes XHTML-Markup. Anscheinend parst der IE ein Element, welches sich in einer Liste befindet, aber selbst von keinem Listenelement umgeben wird in das vorhergehende Listenelement.

## Ein Beispiel

```html
<ul>
    <li></li>
    <input />
</ul>
```

## Das Resultat

```html
<ul>
    <li><div><input /></div></li>
</ul>
```