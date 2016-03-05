---
layout: post
title: 'Google Chrome - Googles Antwort auf neue Anforderungen im Browsermarkt'
published: true
comments: true
date: 2008-09-02 02:09:51
tags:
    - browser
    - chrome
    - google
    - javascript engine
categories:
    - browser
    - chrome-browser
image:
    thumb: chrome.jpg
---
> Mit Google Chrome geht nun bald ein neuer Browser an den Start. Entwickelt von Google und an die neuen Herausforderungen im Netz angepasst, soll er als weiterer Konkurrent zum Internet Explorer fungieren.



Was für die Webentwickler und Datenschützer zunächst wie ein Albtraum erscheint, könnte sich dennoch als eine echte Alternative zu aktuellen Browsern herausstellen.

Der Browser soll noch im Verlauf des heutigen Tages als [Testversion zum Download][1] erhältlich sein.

Weitestgehend technische Erklärungen der Funktionen erhält man beim Lesen eines von [Scott McCloud][2] wunderschön gestalteten Comics (erhältlich bei [blogoscoped.com][3] oder **[hier im Blog][4]**).

## Eine Übersicht der Inhalte / Funktionen:



  * **Multi-Prozess orientiert:**
  
    Das Problem heutiger Browser sei, dass der Speicher über den Tag beim Öffnen vieler Seiten und dem Laden von Web-Applikationen langsam fragmentiert und somit für den Browser immer mehr speicher eingeräumt werden muss. Google will dies verhindern, indem jeder Tab seinen eigenen Prozess startet, der beim Schließen restlos entfernt und aufgeräumt werden kann (inkl. Speicher). Somit hängt auch nicht gleich der gesamte Browser fest, wenn es in einem Tab zu Problemen kommt > ein robuster Browser. 
  * **Überwachung des Speichers und der CPU-Auslastung von Tabs und Plugins:** 
  
    
  
    Speicherfresser können dank integriertem &#8222;Task-Manager&#8220; erkannt und eliminiert werden, falls es zu Problemen kommt frei nach dem Motto: &#8222;Placing blame where blame belongs&#8220; 
  * **Rendering Engine:**
  
    Es wurde die Open Source Webkit Engine eingesetzt, welche auch im Safari und im Opera zum Tragen kommt und für Geschwindigkeit und Konformität steht. 
  * **Javascript Engine V8:**
  
    Von einem dänischen Team wurde eine komplett neue Javascript Virtual Machine namens V8 entwickelt, da bisherige Engines nicht für die Anforderungen (Speicherbedarf..) moderner Web-Applikationen ausgelegt sind. V8 wird unter Anderem den Javascript Code in Maschinencode wandeln, anstatt ihn zur Laufzeit zu interpretieren, was die Abarbeitung schneller macht. Außerdem soll eine präzise Garbage-Collection zum Einsatz kommen. Durch diese und andere Features soll Javascript nun endlich schnell und stabil laufen, was allen Youtubes, Mindmeistern und Online-Offices zu Gute kommt. Zu guter Letzt steht sie unter einer Open Source Lizenz und kann somit auch von Anderen Projekten eingesetzt werden.
  * **Tabs:**
  
    
  
    Die Tabs beim Google Chrome Browser werden über der Adressleiste angezeigt (anstatt wie üblich unter dieser). Außerdem sind sie wie eigenständige Anwendungen zu betrachten (vgl. weiter oben) und lassen sich einzeln entkoppeln und mitsamt ihrem Status auf andere Monitore verschieben uws.
  * **Suche über Fremseiten:**
  
    Ein interessantes Feature, welches in dem Comic auf Seite 20 erwähnt wird ist folgende Funktionalität der Adressleiste: Während der Suche auf einer Seite (z.B. Amazon) erkennt der Browser das Suchfeld und es kann künftig direkt über die Adressleiste gesucht werden, indem man den Namen der Seite angibt und Tab drückt. Nun noch das Suchwort eigetragen und mit enter bestätigt spart man sich das laden einer kompletten Seite und gelangt sofort zu den Ergebnissen. Fraglich ist, bei welchen Seiten diese Funktion unterstützt wird bzw. wie gut die Erkennung eines Suchfeldes funktioniert
  * **Startseite:**
  
    Ähnlich wie beim Opera setzt man anstelle einer leeren Seite auf eine Art Übersichtsseite mit den neun zuletzt besuchten Seiten, den zuletzt durchgeführten Suchen und den letzten Bookmarks.
  * **Incognito Surfen:**
  
    Google Chrome bietet eine Tab-Variante für aonymes Surfen an. Keine Daten werden von diesem Tab gespeichert und tauchen somit auch nicht in der History auf. Lesezeichen können nicht angelegt, sonder nur gelesen werden. Cookies werden nach Beenden entfernt. Eine ähnliche Funktion bietet momentan noch der Internet Explorer 8 mit dem InPrivate-Modus (oder auch Porn-Modus laut diversen Diskussionen :)
  * **Web-Applikationen in eigenem schlanken Browser-Fenster:**
  
    Per Schortcut lassen sich Webapplikationen starten, in denen die übrigen Funktionen wie Adressleiste und Navigation ausgeblendet werden können um nicht von der Anwendung abzulenken.
  * **Funktionen gegen Malware und Phishing:**
  
    Die Tabs arbeiten in einer Art Sandbox (die Entwickler nennen die Umgebung sogar Jail&#8220;) ohne die Rechte Dateien auf die Festplatte zu schreiben oder zu lesen. Dadurch sollen sich auch eventuelle Schadprogramme nicht aus diesen Grenzen bewegen und werden beim Schließen eines Tabs ebenfalls zerstört. Google gibt aber zu, dass vom Nutzer (evtl. unabsichtlich) installierte Plugins diesen Sicherheitsmechanismus umgehen können. Um **Phishing vorzubeugen**, lädt Google Chrome ständig aktualisierte Listen von Malware und Phishing Seiten herunter und warnt den nutzer beim Betreten der Seite.
  * **Google Gears:**
  
    Die API für Google Gears ist gleich im Chrome Browser integriert.
  * **Open Source:**
  
    Der gesamte Code wird unter einer Open Source Lizenz veröffentlicht (ähnlich Mozilla Firefox), so dass andere Entwickler Teile in Ihren eigenen Projekten nutzen können.

## Fazit

Mit dem neuen Browser könnte Google nun schon nicht mehr nur das Internet, sondern auch die Anwendung &#8222;drumherum&#8220; beherrschen, was natürlich einige Ängste schürt. Trotzdem klingen die Features vielversprechend, insbesondere die V8 könnte die Performance von heutigen Webanwendungen erheblich steigern und Entwickler und Endnutzer könnten davon‚ profitieren. Nebenbei wird &#8211; sollten die Versprechen gehalten‚ werden &#8211; der relativ festgefahrene Browsermarkt mal wieder in Bewegung kommen und Browserhersteller gezwungen sein neue Wege einzuschlagen (ich denke da insbesondere an den Internet Explorer).

Ich bin gespannt, ob alle Erwartungen und Versprechen gehalten werden können und freue mich darauf, den neuen Browser mal auf einer Testfahrt zu erproben.

**Hier noch einmal der Link zu den Comics, falls‚ er oben überlesen wurde :)**
  
[][5]
  
[Bild: Copyright by Google]

 [1]: http://www.google.com/chrome "Testversion des google Chrome Browsers von google.com/chrome herunterladen"
 [2]: http://www.scottmccloud.com/ "Portfolio von von Scott Mc Cloud auf scottmccloud.com besuchen"
 [3]: http://blogoscoped.com/google-chrome "funktionen des neuen Google Chrome Browsers im comic-format auf blogoscoped.com lesen"
 [4]: http://mediavrog.net/blog/2008/09/02/browser/google-chrome-comic/ "Google Chrome Comic auf mediavrog.net lesen"
 [5]: http://mediavrog.net/blog/2008/09/02/browser/google-chrome-comic/ "Comic zu Google Chrome auf mediavrog.net lesen"