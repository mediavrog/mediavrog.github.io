---
layout: post
title: 'After Effects stürzt beim Rendern ab'
published: true
comments: true
date: 2008-08-10 05:08:09
tags:
    - after effects
    - bugfix
    - rendern
    - speicherproblem
categories:
    - after-effects-ae
permalink: /blog/2008/08/10/weitere-themen/after-effects-ae/after-effects-sturzt-beim-rendern-ab
---
> Hier ein kleiner Life-Saver. Wenn beim Rendern eines Films After Effects CS2 oder CS3 immer wieder aus scheinbar unerfindlichen Gründen abstürzt, dann kann die Ursache in einem Problem der Speicherverwaltung bezüglich des Ebenencaches in After Effects liegen.



AE bricht dann während des Renderns mit einer Fehlermeldung ab, welche in etwa besagt dass nicht genügend Speicher vorhanden wäre.

Abhilfe schafft hier ein kleiner Trick:



## Die versteckten Optionen.

Einfach die **SHIFT-Taste gedrückt halten** und _Bearbeiten > Voreinstellungen > Allgemein_ wählen. Nun erscheint in der Dropdown-Box der Optionen eine neue Auswahl &#8222;**Versteckt**&#8222;. Um den Speicherüberlauf (?) zu beheben, wählt man **Ebenencache deaktivieren** und ca. alle **50 Frames entleeren**. Das Rendern dauert nun zwar ein wenig länger, läuft dafür aber durch.