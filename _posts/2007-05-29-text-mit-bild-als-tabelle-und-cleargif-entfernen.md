---
layout: post
title: 'Text mit Bild als Tabelle (statt Definitionsliste) rendern / clear.gif entfernen'
published: true
comments: true
date: 2007-05-29 07:05:55
tags:
    - clear.gif
    - newsletter
    - text-mit-bild
    - typo3
categories:
    - ts-snippets
image:
    thumb: typo32.jpg
---
> Bei Newslettern kann es sehr hilfreich sein Inhalte bzw. den gesamten Newsletter mit Tabellen anstatt normalem Markup aufzubauen. Die Renderengines der Mailprogramme sind teilweise nicht sonderlich gut und bei Internet-Mail-Anbietern kommt es bei Verwendung von float-Konstrukten auch gern mal zu Darstellungsfehlern.



Damit die Mail möglichst überall gleich aussieht, habe ich mich eben für den Weg der Tabellen entschieden. Um in Typo3 den Inhaltstyp Text/Bild als Tabelle auszugeben benötigt man nur folgendes Typoscript Setup

tt_content.image.20.renderMethod = table

Damit nun auch noch die nervigen clear-Gifs verschwinden einfach

tt_content.textpic.20.noStretchAndMarginCells = 1

darunter und fertig.