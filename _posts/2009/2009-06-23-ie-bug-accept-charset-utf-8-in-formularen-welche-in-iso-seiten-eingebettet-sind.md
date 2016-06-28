---
layout: single
title: 'IE Bug: Accept-charset UTF-8 in Formularen, welche in ISO Seiten eingebettet sind'
published: true
comments: true
date: 2009-06-23 01:06:51
tags:
    - bugfix
    - ie
categories:
    - internetexplorer
    - xhtml
permalink: /blog/2009/06/23/xhtml/ie-bug-accept-charset-utf-8-in-formularen-welche-in-iso-seiten-eingebettet-sind
image:
    thumb: ie.jpg
---
> Der **Internet Explorer** verhält sich mal wieder ausnahmslos inkonsistent. Gibt man einem form-Element das Attribut 
> **accept-charset=&#8220;UTF-8&#8243;** und ist dieses Formular in einer ISO-kodierten (oder auch andere) Seite
> eingebettet, so verschickt der IE (alle Versionen) die Inhalte nur in UTF-8 wenn folgende Bedingung erfüllt ist:

## Die Lösung für das UTF-8 charset Problem

Die Eingabe muss ein UTF-8 Zeichen enthalten, welches NICHT in der umgebenden Kodierung (bspw. ISO) abgebildet werden
 kann. Andernfalls behält der IE die umgebende Kodierung und ignoriert damit das accept-charset.

Abhilfe schafft das Einfügen eines hidden-Fields, welches ein UTF-8 Zeichen enthält. Beispielsweise:

```html
<input type="hidden" name="dummyChar" value="♥" />
```

Ausführliche Informationen finden sich unter:
 <a href="http://michi.knallgrau.at/blog/stories/3643754/">http://michi.knallgrau.at/blog/stories/3643754/</a>
  
**Meinen besten Dank an Michi von Knallgrau, you made my day!**

Da kram ich mir doch meine [IE Voodoo Doll][1] wieder raus !!

 [1]: /blog/2007/09/28/browser/internetexplorer/internet-explorer-voodoo-doll-puppe