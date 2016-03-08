---
layout: post
title: 'Typo3 - Benutzer > Aufgaben richtig nutzen (Taskcenter)'
published: true
comments: true
date: 2007-07-11 11:07:16
tags:
    - messaging
    - taskcenter
    - extensions
categories:
    - typo3
permalink: /blog/2007/07/11/typo3/typo3-benutzer-aufgaben-richtig-nutzen-taskcenter
image:
    thumb: typo31.jpg
---
> In vielen frischen Typo3-Installationen findet sich unter Benutzer > Aufgaben nur ein &#8222;Voreinstellungen für Export&#8220;-Button, welcher keine Funktion hat.
> 
> Um in den Genuss von eines internen Messaging- oder Workflow-Systems zu kommen muss man einfach die entsprechenden Extension installieren.


## Eine kurze Übersicht:

 _(mit einem * versehene Ext habe ich nicht zum Laufen gebracht)_

  * UserTask Center, **Quick note** (sys_notepad)
  
    Fügt dem Taskcenter des Nutzers ein kleines Feld zum Editieren hinzu, wo er wie auf einem Zettel ein paar Notizen verfassen und ablegen kann  
    &nbsp;
    
  * UserTask Center, **Messaging** (sys_messages)
  
    Erlaubt es den Typo3-Nutzern Nachrichten untereinander schnell auszutauschen. Enthält einen Posteingang/-ausgang, Archiv und startet bei Antworten auf eine Nachricht automatisch einen Thread  
    &nbsp;
    
  * UserTask Center, **Recent** (sys_recent)
  
    Listet die zuletzt angelegten/bearbeiteten Seiten inklusive Datum auf. Hat ein Nutzer keine Rechte die Seiten zu bearbeiten, so werden sie ihm auch nicht angezeigt.  
    &nbsp;
    
  * UserTask Center, **Workflow and Tasks** (sys_workflows)
  
    Diese Extension sollte ein Workflow System und basierend auf sys_todos auch eine Aufgabenverwaltung (ToDo&#8217;s) ermöglichen. Leider scheinen diese beiden Extensions in der aktuellen Typo3 Version (4.1.1) nicht zu funktionieren. Nach der Installation erscheint ein Punkt &#8222;Aufgaben&#8220;, hinter dem sich aber nichts verbirgt. Schade!
  
    _Eventuell kann eine Konfiguration Bestandteil der Installation sein &#8211; habe hiervon aber keine Kenntnis._  
    &nbsp;
    
  * UserTask Center, **Backend News** ( vd_backendnews )
  
    Über diese Extension kann man News im Taskcenter verfassen und in Kategorien ordnen. Sehr feine Extension!.
  
    Nicht wundern wenn diese Extension nach der Installation nicht funktioniert, sie muss noch konfiguriert werden: 
    
      * Sysfolder anlegen
      
      * Benutzergruppe mit Taskcenter News-Rechten ausstatten 
      
        ```
          * Taskcenter news categories
          * Taskcenter news posts, sowie unter _Allowed exlude fields:_
          * Taskcenter news categories: Category name
          * Taskcenter news posts: News title
          * Taskcenter news posts: Publication time
          * Taskcenter news posts: Text
          * Taskcenter news posts: Category
        ```
        
      * TSConfig für Nutzergruppe:
      
        ```
          * VD_BACKENDNEWS.edit = 1
          * VD_BACKENDNEWS.pid = pid des Sys-Ordners
        ```

  * UserTask Center, **Plugin list** ( taskcenter_modules )

    Sollte alle Seiten auflisten, die mit einem Plugin versehen sind. Leider erscheint kein neuer Punkt im Taskcenter nach der Installation.