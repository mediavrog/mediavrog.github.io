---
layout: single
title: 'TYPO3 - Direct Mail Newsletter werden nicht verschickt'
published: true
comments: true
date: 2008-05-29 02:05:21
tags:
    - direct-mail
    - htaccess
    - newsletter
    - typo3
categories:
    - typo3
permalink: /blog/2008/05/29/typo3/typo3-direct-mail-newsletter-werden-nicht-verschickt
image:
    thumb: typo33.jpg
---
> Das solide Newslettersystem Direct Mail bereitet besonders Einsteigern immer wieder Kopfschmerzen: 
> Oftmals werden Newsletter aus unerklärlichen Gründen nicht verschickt und die Nutzerführung war für die Redakteure, 
> welche letztenendes den Newsletter aufbereiten und verschicken sollen bis vor Kurzem recht umständlich.

Dieser Beitrag soll die wichtigsten Probleme behandeln und mit Hilfe der Kommentare ständig erweitert werden.

## HTML-Newsletter werden nicht verschickt

Dieses Problem lässt sich zum Glück in den meisten Fällen einfach und schnell regeln. Die häufigste Ursache liegt
 in der Liste der Abonnements &#8211; sind diese händisch eingepflegt oder per direct\_mail\_subscription nicht 
 komplett in die Datenbank geschrieben, so fehlt der **Haken im Feld** &#8222;
 **Newsletter im HTML-Format empfangen**&#8220; bei den Abonnementen. Damit dieses automatisch gesetzt wird, sollte 
 man im Template für das Anmeldeformular ein hidden-Feld einfügen und den Wert auf 1 setzen.

Somit wird für jeden neuen Abonnementen der html Newsletter abonniert.
  
[Welche Gründe gibt es noch? Schreib nen Kommentar.][1]

## Massenversand startet, verarbeitet Abonnenten aber es werden keine Mails verschickt

Für dieses Problem kann es mehrere Ursachen geben, das Resultat ist immer das selbe: Der Versand wird angestoßen, aber in der Versand-Statistik steht keine Anzahl der Versendeten Mails.

  * ### In Vebindung mit htaccess
    
    In einem meiner Projekte habe ich zur [Vermeidung von duplicate Content][2] per htaccess die Anfragen an die Domain domainname.tld auf www.domainname.tld umgeleitet. Nun habe ich mich trotzdem unter domainname.tld/typo3 eingeloggt und wollte einen Newsletter versenden. Es lief soweit alles normal und auch die Vorschau sah gut aus. Leider wurden die E-Mails per Massenversand nicht verschickt (vgl. Bild oben). Eine Testmail ergab außerdem, dass nicht der Inhalt des Newsletters, sondern die **gesamte Seite als Newsletter verschickt** wurde. Nach eingehender Prüfung musste ich feststellen, dass direct_mail nicht die per baseURL gesetzte URI als Ausgangsbasis zum Rendern/Erstellen des Inhalts des Newsletters verwendet, sondern den Pfad des eingeloggten Nutzers. In meinem Fall habe ich mich noch einmal ausgeloggt und unter www.domainname.tld/typo3 wieder eingeloggt &#8211; der Newsletter konnte problemlos verschickt werden.
  
    Fazit: Ich werde die htaccess-Konfiguration wohl noch einmal überprüfen, so dass alle Parameter beim Umleiten ohne www zu www mitgenommen werden.  
    
Welche Probleme habt ihr erfahren und wie gelöst? Hinterlasst einen Komentar oder einen Trackback. Ich möchte hier gern eine Problemlöse-Sammlung rund um direct_mail enstehen lassen.

 [1]: #commentform "Schreibe einen Kommetar dazu"
 [2]: http://mediavrog.net/blog/2007/07/26/seo/vermeidung-von-duplicate-content-im-bezug-auf-suchmaschinen/ "Artikel zum Thema Duplicate Content und Suchmaschinen in diesem Blog lesen"