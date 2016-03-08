---
layout: post
title: 'mod_rewrite aktivieren auf vServer von netclusive (für permalinks und RealURL)'
published: true
comments: true
date: 2007-07-26 12:07:16
tags:
    - mod_rewrite
    - netclusive
    - permalinks
categories:
    - server
permalink: /blog/2007/07/26/weitere-themen/server/mod_rewrite-aktivieren-auf-vserver-von-netclusive-fur-permalinks-und-realurl
image:
    thumb: server.jpg
---
> Da ich diese Infos in Zukunft sicher auch wieder brauchen werde, hier eine kleine Anleitung.

## Zum System:

PHP 5.1.2
  
Apache2
  
vServer mit shell-Zugang (als root)
  
Ich habe einen vServer v2 mit Suse 10

## Anleitung zum Aktivieren von mod_rewrite:

  1. Wechseln in das Verzeichnis &#8222;etc/sysconfig&#8220;
  
    `cd etc/sysconfig`
  
    Hier liegen die Konfigurationsdateien, welche bei Neustarts zum Initialisieren der Dienste verwendet werden.
    
  2. Bearbeiten der Datei &#8222;apache2&#8220;
  
    `vim apache2`
  
      * In den Einfügemodus wechseln
  
        Taste <kbd>i</kbd> (für Insert) drücken
        
      * Zeile suchen und Module rewrite hinzufügen
  
        `APACHE_MODULES=&#8220;actions alias [&#8230;]&#8220;` suchen (bei mir wars Zeile 84) 
        und in die Liste `rewrite` einfügen
  
        (eine Liste mit allen Modulnamen steht im Kommentar darüber)
        
      * Speichern und schließen
 
        Befehl `:wq!` (w - Speichern; q! - Schließen ohne nachfragen)
        
  3. Apache neu starten
  
    `rcapache2 restart`
    
  4. `phpinfo()` aufrufen und prüfen ob das Modul geladen ist
  
  5. Spaß mit WordPress permalinks und Typo3 RealURL haben :)

**Update:** Auf den meisten anderen Servern muss man glaube ich die Datei `etc/apache2/httpd.conf` editieren und das Modul hinzufügen._