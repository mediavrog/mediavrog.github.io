---
layout: post
title: 'Mobile Widgets - Eine Einführung'
published: true
comments: true
date: 2010-06-07 12:06:51
tags:
    - apple
    - blackberry
    - google
    - microsoft
    - nokia
    - palm
    - rim
    - s60
    - vodafone
    - w3c
    - widgets
    - wrt
categories:
    - widgets-wgt
permalink: /blog/2010/06/07/widgets-wgt/mobile-widgets-eine-einfuhrung
image:
    thumb: mobileworld.png
---
> Während meiner Tätigkeit bei [MyMobai][1] habe ich aktuelle Möglichkeiten zur mobilen Cross-Plattform Entwicklung evaluiert. Neben der Nutzung von Tools wie **Titanium** und **PhoneGap** sind dabei vor allem **Widgets** sehr interessant.
> 
> In diesem und folgenden Artikeln möchte ich daher über meine Erfahrung damit berichten. Zu Beginn eine Einführung zu Widgets:



## Was sind Widgets?

### Ein Widget ist per Definition

> eine Komponente eines grafischen Fenstersystems. Das Widget besteht zum einen aus dem Fenster, einem sichtbaren Bereich, der Maus- und/oder Tastaturereignisse empfängt, und zum anderen aus dem nicht sichtbaren Objekt, das den Zustand der Komponente speichert und über bestimmte Zeichenoperationen den sichtbaren Bereich verändern kann. Widgets sind immer in ein bestimmtes Fenstersystem eingebunden und nutzen dieses zur Interaktion mit dem Anwender oder anderen Widgets des Fenstersystems. [Quelle: Wikipedia]

Aus Nutzersicht sind Widgets im klassischen Sinne kleine Programme, welche einen ganz konkret abgegrenzten Anwendungsfall abbilden. Sie lassen sich ohne Einarbeitung bedienen und besitzen nur wenige Ansichten. Doch gerade auf mobilen Endgeräten stimmt dies nicht immer: es existiert zwar eine Vielzahl von einfachen Widgets wie Feedreadern und kleinen Utility-Programmen, aber **auch komplexe Anwendungen wie Location Based Services** werden auf Basis der Widget-Technologie implementiert.

Technisch gesehen sind Widgets auf den meisten Plattformen einfache **Packages aus XHTML-, Javascript,- CSS- und Bildressourcen**. Damit sie ausgeführt werden können, wird eine so genannte **Widget Runtime** (_WRT_) benötigt, welche auch auf mobilen Geräten vorzufinden sind.

### Vorteile von Widgets

Der größte Vorteil bei der Widgetentwicklung ist wohl die **einfache Umsetzung mittels bekannter Webtechnologien (X)HTML, CSS und JavaScript**. Im Gegensatz zur nativen Programmierung wie mit objective-c oder C++ finden auch Fronendentwickler einen leichten Einstieg in die mobile Anwendungsentwicklung. Vorhandenes Know-How kann dadurch ohne Umwege genutzt werden.

Auch **im Vergleich zu Webanwendungen** bieten Widgets einige Vorteile:

  * Mit dem Widget werden die zur Ausführung benötigten Ressourcen wie Anwendungscode und Bilder auf dem Zielgerät mitinstalliert. Unnötiger Traffic für Applikationsressourcen wird somit gezielt vermieden.
  * Viele Widgets nutzen die dynamische Abfrage von Daten mittels AJAX um sich zu aktualisieren oder Inhalte von verschiedenen Diensten einzubinden. Dies wird vor allem durch eine lockere bzw. konfigurierbare Cross-Domain-Policy ermöglicht.

Weiterhin stellt die WRT einem Widget Zugriff auf **Geräte-API** bereit. Damit ist ein Widget, im Gegensatz zu mobilen Webseiten, in der Lage auf Funktionen wie Messaging, Multimediaanwendungen usw. des Geräts zuzugreifen und steht einer nativen Anwendung diesbezüglich in nichts nach.

* * *

**Auf der nächsten Seite wird ein Überblick über aktuelle Widget Runtimes gegeben.** 



> Nach der kurzen Einführung zu Widgets werden nun aktuelle Plattformen vorgestellt, auf denen Widgets eingesetzt werden können.
> 
> Vorraussetzung dafür ist das Vorhandensein einer **Widget Runtime** &#8211; einer Art Browserumgebung, welche mit Javascript-API Zugriff auf Gerätefunktionen bietet.

## Mobile Anwendungsplattformen – Ein Überblick

Widgets sind auf Apples Dashboard sehr populär geworden und haben ihren Weg auch auf andere Systeme gefunden. Dazu gehören vermehrt Mobiltelefone / Smartphones, welche eine Widget Runtime als alternativen Anwendungs-Entwicklungweg zur nativen Entwicklung bereitstellen.


  
  
  
    Eine Einordnung von Begriffen rund um das Thema mobile Anwendungsentwicklung
  


In obiger Grafik sind zur Einordnung der Widget-Technologie verschiedene Begrifflichkeiten der mobilen Anwendungsentwicklung zusammengestellt. Sie ist in 4 Ebenen unterteilt:

Mobilfunk-Ebene (ganz außen / grau)
:   Der Vollständigkeit halber sind bestehende und kommende mobile Funktechnologien gruppiert.

Service-Ebene (außen / rot)
:   Hersteller von mobilen Endgeräten und Dienstleister im Bereich mobile. Teilweise sind Mischformen vertreten wie z. B. _Apple_. Zu den jeweiligen Unternehmen finden sich die Namen der App-Stores.

Anwendungsschicht (mitte / grün)
:   Technologien zur App-Entwicklung. je weiter außen sich eine Technologie befindet, umso plattformunabhängiger ist sie.

OS-Schicht (innen / blau)
:   mobile Betriebssysteme. Je weiter außen ein OS angeordnet ist, umso offener ist es. Betriebssysteme im innenkreis sind eher proprietär

Widgets sind in dieser Darstellung knapp unter den reinen Webanwendungen eingeordnet. Die Verbindung zu ihnen zeigt die Verwendung ähnlicher Technologien (XHTML/CSS/JavaScript) an. Weniger plattformunabhängig lässt sich mit Sprachen wie objective-c und C entwickeln. Die Grafik zeigt deutlich, dass viele Plattformen neben nativen Sprachen auch Widgets unterstützen.

## Aktuelle Widget-Plattformen und Standards

Zur genauen Betrachtung habe ich in folgender Tabelle einige Informationen zu Widget Runtimes zusammengetragen. Zu allen mir bekannten aktuellen mobilen Widget Umgebungen sind Daten zur Spezifkation, unterstützten Geräten und nützlichen Links zu Entwicklerressourcen angegeben:


  
    
      WRT / Name
    
    
    
      Standards / Spezifikationen
    
    
    
      Plattformen / Geräte
    
    
    
      Links
    
  
  
  
    
      W3C Widgets
    
    
    
      W3C Widgets
    
    
    
      Die Basis für einige Widget-Plattformen.
    
    
    
      w3.org »
    
  
  
  
    
      Opera Widget Runtime / Opera Browser 9+
    
    
    
      Opera Widgets
    
    
    
      
        
          Opera Mobile
        
        
          Windows Mobile
        
        
          versch. OS (x86, Sparc, PowerPC, embedded)
        
        
          Nintendo Wii
        
      
    
    
    
      
        
          Infos
        
        
        
          dev.opera.com »
        
        
        
          Publish
        
        
        
          widgets.opera.com/
        
      
    
  
  
  
    
      JIL / Vodafone 360
    
    
    
      
        JIL 1.0.x: W3C draft 12/2008
      
      
      
        JIL 1.2 +: W3C Candidate Release Docs
      
    
    
    
      Vodafone 360; erstes Gerät war das Samsung H1; mit der Verbreitung der Vodafone 360 Runtime werden nun auch einige Android Geräte unterstützt.
    
    
    
      
        
          Infos
        
        
        
          jil.org »Vodafone mobilewidgetdev »
        
        
        
          Publish
        
        
        
          Vodafone Apps
        
      
    
  
  
  
    
      Vodafone Widget Manager
    
    
    
      W3C / Opera Widgets
    
    
    
      Symbian S60 Applikation zum Verwalten von Widgets. Wird wohl zugunsten von 360 mit JIL bald nicht mehr weiterentwickelt.
    
  
  
  
    
      Nokia Widget Runtime in mehreren Versionen
    
    
    
      Nokia proprietär
    
    
    
      Viele Nokia-Geräte der Symbian S60 Plattform ab Edition 3 (Details zur Geräteunterstützung)
    
    
    
      
        
          Infos
        
        
        
          Nokia WebDev Library »Forum Nokia »
        
        
        
          Publish
        
        
        
          OVI Store
        
      
    
  
  
  
    
      Blackberry WRT
    
    
    
      Blackberry
    
    
    
      Blackberrys mit OS 5+; Das &#8222;Widget&#8220; ist dabei ein WebView in einer nativen Skeleton-App.
    
    
    
      
        
          Infos
        
        
        
          BB Widgets SDK »Guides »
        
        
        
          Publish
        
        
        
          Blackberry AppWorld
        
      
    
  
  
  
    
      Palm WebOS
    
    
    
      Mojo Widgets
    
    
    
      WebOS und damit Palm/HP Geräte.
    
    
    
      
        
          Infos & Publish
        
        
        
          Developer Center »
        
      
    
  
  
  
    
      Windows Mobile Widgets
    
    
    
      Microsoft proprietär
    
    
    
      Windows Mobile 6.5+.
    
    
    
      
        
          Infos
        
        
        
          MSDN »
        
        
        
          Publish
        
        
        
          Windows Mobile Marketplace
        
      
    
  
  
  
    http://msdn.microsoft.com/en-us/library/ff599590%28v=MSDN.10%29.aspx   
    
    
      Schlussbetrachtung
    
    
    
      Wie bereits mehrfach erwähnt werden Widgets bereits von einer Vielzahl an Plattformen unterstützt. Aufnahezu allen modernen Mobiltelefonen sind sie verfügbar und können ohne aufwendige Fortbildungen von Frontend-Entwicklern umgesetzt werden. Leider sind trotz Standardisierung durch das W3C immer noch proprietäre Ansätze etabliert, was ein „Write once, run everywhere“ trotz Webtechnologien nahezu unmöglich macht.
    
    
    
      In eine gute Richtung entwickelt zur Zeit sich der Widget-Standard des JIL. Treibende Kräfte wie Vodafone entwickeln in diesem Konsortium eine umfangreiche Spezifikation (basierend auf offenen W3C Standards) für Widget, Widget-Runtime und API, welche auf vielen Endgeräten zum Einsatz kommen soll.
    
    
    
      In folgenden Artikeln möchte ich näher auf Spezifika und Stolpersteine einzelner WRTs anhand eines Beispielprojekts eingehen. Im Verlauf dieser Reihe werden auch Möglichkeiten untersucht, Widgets Cross-Plattform zu entwickeln.
    

 [1]: http://www.mymobai.de