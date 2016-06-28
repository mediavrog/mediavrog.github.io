---
layout: single
title: 'Breadcrumbs in Typo3'
published: true
comments: true
date: 2007-05-30 01:05:33
tags:
    - seo
categories:
    - typo3
permalink: /blog/2007/05/30/typo3/ts-snippets/dynamischer-seitentitel-in-typo3-wie-klickpfadbreadcrumb
image:
    thumb: typo33.jpg
---
> Viele möchten Ihre Seite auch google gern schmackhaft machen. Dass man heutzutage ohne Suchworte im Titel 
nur mit sehr starkem Content eine vordere Platzierung erreicht ist wohl auch jedem klar, der mal bei google
 nach &#8222;xbox 360&#8220; sucht.

Es muss also ein dynamischer Seitentitel her, welcher hierarchisch aufgebaut einem Klickpfad (rootline, breadcrumb) ähnelt. Und genau diese Idee ist schon der Ansatz und die Lösung: wir erstellen im title-Tag einen Klickpfad ohne Verlinkungen. Doch Eins nach dem Anderen (folgende Sriptzeilen gehören natürlich ins Typoscript Setup):

### 1) Die Typo3-seitige Generierung des Titels ausschalten
   
```
config.noPageTitle = 2
```

### 2) den Klickpfad als HMENU in headerData
    
```typoscript
page.headerData.80 = COA
page.headerData.80 {
    wrap = |
    10 = HMENU
    10 {
        special = rootline
        special.range = 1|-1
        includeNotInMenu = 1

        1 = TMENU
        1.NO = 1
        1.NO.doNotLinkIt = 1
        1.NO.allWrap = |&nbsp;&#124;&nbsp;|*| |&nbsp;&#124;&nbsp;|*| |
    }

    20=TEXT
    20.data = DB:sys_template:1:sitetitle
    20.wrap = &nbsp;-&nbsp;|
}
```

### Damit wird ein Seitentitel nach folgendem Schema aufgebaut:

**Hauptseite \| Unterseite \| UnterUnterseite &#8211; Seitentitel (wie im Haupttemplate festgelegt)**

### Dabei wirken sich folgende Zeilen besonders auf das Setup aus:

* `includeNotInMenu = 1` Auch die Seitentitel von &#8222;Nicht im Menü&#8220;-Seiten werden angezeigt
* `special.range = 1|-1` Beginnt auf Ebene 1 (also unter root und zeigt die aktuelle Seite mit an)
* `20.data = DB:sys_template:1:sitetitle` Holt den Seitentitel des Haupttemplate aus der DB
* `1.NO.doNotLinkIt = 1` Wichtig damit keine HTML Anker um die Titel gelegt werden