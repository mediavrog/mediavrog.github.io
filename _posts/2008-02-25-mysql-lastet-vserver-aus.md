---
layout: post
title: 'mysql lastet vServer aus'
published: true
comments: true
date: 2008-02-25 12:02:52
tags:
    - auslastung
    - cpu
    - last
    - mysql
    - mysql.log
    - repair
    - server
    - sql
    - vserver
categories:
    - server
permalink: /2008/02/25/weitere-themen/server/mysql-lastet-vserver-aus
image:
    thumb: server.jpg
---
> In den vergangenen 4 Tagen war mein Server und damit auch einige Projekte kaum zu erreichen. Nach hin und her mit meinem Dienstleister, der mir auch erfreulicherweise den Weg zur Fehlerlösung ebnete, habe ich mich also heute auf die Suche nach dem Fehler gemacht.



Er sollte wohl **etwas mit mysql zu tun** haben, erfuhr ich in einer mail. Auch im Virtuozzo lag der CPU-Verbrauch des mysql-Dienstes bei 40% (Tendenz steigend) &#8211; die Auslastung der CPU des vServers lag derweil bei ca. 2700%. **Nach einem Stopp des mysql war alles ok** &#8211; nur liefen halt die Projekte und mein Blog nicht ;P

Nach wiederholtem Neustart und überprüfen der Projekte habe ich mal in die mysql.log geschaut (hätte ich viel eher machen sollen) und stellte fest, dass wohl **eine Tabelle kaputt ist**. **Unter &#8222;Prozesse&#8220;** (erreichbar über Interface wie phpmyadmin oder ähnlichem oder eben Konsole) zeichnete sich ein klares Bild ab &#8211; eine **Tabellenabfrage (keine besonders große mit joins oder sowas) wurde einfach nicht beendet und blieb ewig offen. Die CPU-Last stieg und stieg witer an**..

Lange Rede kurzer Sinn: **Ich habe die fehlerhaften Tabellen (bei mir waren es wp\_comments und wp\_postmeta) per REPAIR mal reparieren lassen.** In der Auswertung wurden auch fehlerhafte Sektoren erkannt und gefixed. Nun läuft wieder alles einwandfrei und ich weiß nächstes Mal wo ich anfange zu suchen.