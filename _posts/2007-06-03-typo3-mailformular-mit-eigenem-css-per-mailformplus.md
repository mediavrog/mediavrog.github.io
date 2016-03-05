---
layout: post
title: 'Typo3 - Mailformular mit eigenem CSS (per Mailformplus)'
published: true
comments: true
date: 2007-06-03 12:06:10
tags:
    - css,
    - formular
    - konfiguration
    - mailformplus
    - mailformular
    - stylesheet
    - typo3
categories:
    - ts-snippets
permalink: /blog/2007/06/03/typo3/ts-snippets/typo3-mailformular-mit-eigenem-css-per-mailformplus
image:
    thumb: typo33.jpg
---
> Ich empfehle die Nutzung von Mailformplus (aktuell in der Version 4) für Formulare mit Typo3, da man in dieser Extension das Formular mit einem eigenen Template aufbaut und somit die CSS-Klassen und -IDs einfach selbst bestimmt (und es außerdem noch sehr viele Vorteile bietet).



Hat man diese Klassen fest gelegt, so kann man diese nun im Main Stylesheet der Typo3 Seite formatieren.

Um die Übersicht zu gewährleisten bietet Mailformplus noch eine andere Möglichkeit:

### ein CSS für das Formular kann dynamisch nachgeladen werden.

Dies erreicht man einfach durch folgendes Typoscript:

plugin.tx_thmailformplus_pi1.stylesheetFile = fileadmin/mailformplus/styles.css

Die ganze [Dokumentation gibts auf der Seite von typo3.org][1].

 [1]: http://typo3.org/documentation/document-library/extension-manuals/th_mailformplus/4.0.0/view/ "Mailformplus Doku öffnen"