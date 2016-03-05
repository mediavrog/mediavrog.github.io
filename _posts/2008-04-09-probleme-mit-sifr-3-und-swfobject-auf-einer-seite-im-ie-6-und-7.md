---
layout: post
title: 'Probleme mit sIFR 3 und SWFObject auf einer Seite im IE 6 und 7'
published: true
comments: false
date: 2008-04-09 10:04:07
tags:
    - bug
    - bugfix
    - ie-6
    - ie-7
    - sifr
    - swfobject
    - useDomLoaded
categories:
    - internetexplorer
image:
    thumb: ie.jpg
---
> **Dieser Bugfix wird in neuen sIFR 3 builds nicht mehr benötigt: vgl. UPDATE 11.04.08 weiter unten und die Kommentare.**
> 
> &#8212;&#8212;&#8212;-
> 
> In einem Projekt bin ich vor Kurzem auf ein seltsames Verhalten von [sIFR 3][1] gestoßen.



## Problembeschreibung

Komischerweise zeigte meine Testseite im Internet Explorer 6 und 7 keinen Inhalt an. Der XHTML Quelltext blieb (fast) leer.

Alles was im Quelltext stand war

&lt;script src="wp-content/themes/meinTheme/swf/meineFont.swf" type="sifr/prefetch"&gt;&lt;/script&gt;

&#8230; ansonsten war die Seite weiß und leer.

Nach einer kurzen Recherche bin ich dann auf den [Beitrag von EightEightZero][2] gestoßen, welcher auch mit dem Problem zu kämpfen hatte, aber einen Bugfix anbietet. Das Problem taucht bei Verwendung von [sIFR 3][1] und [SWFObject 1.5][3] auf ein und derselben Seite auf. Leider hat das Setzen des im Bugfix beschriebenen Parameters keine Wirkung in meiner Testumgebung gezeigt.

Nach weiterem Stöbern in der [Dokumentation von sIFR 3 bezüglich der Javascript Konfiguration][4] und einigen [sIFR-Foren][5]-Beiträgen habe ich letzendlich die passende Lösung gefunden. Der Parameter hat in der von mir verwendeten Version von sIFR (version 3, revision 382) einfach einen anderen Namen bekommen:

sIFR.useDomLoaded = !sIFR.ua.ie;

Dies teilt sIFR mit, dass es im IE (sIFR.ua.ie > true, wenn IE) die useDomLoaded-Funktionalität nicht anwenden soll. Nach dem Löschen des Cache sollte die Seite nun ohne Probleme im Internet Explorer 6 und auch in der 7er Version des IE angezeigt werden.

**Wichtig**: Dieser Parameter muss **nach** sIFR.prefetch und **vor** sIFR.activate gesetzt werden

### UPDATE 11.04.08: 

Ich bin jetzt auf die sIFR Version 3 r395 umgestiegen und der oben beschriebene Bugfix ist nicht mehr nötig.

Dabei ist mir noch eins aufgefallen: Wer Probleme mit sIFR und mootools hat, sollte sicherstellen, dass der sIFR Code (sIFR.replace usw) nicht in einem onDomReady-Event eines Javascript-Frameworks wie z.B. mootools steht, da sonst Fehler im IE entstehen. sIFR nutzt eine eigene domReady-Methode.

Leider taucht in dieser Version ein andere Bug auf: [Fehlerhaftes Scollverhalten im Internet Explorer][6]. Wenn die Maus über einem Flash-Element steht, kann man die Seite im Internet Explorer nicht mehr scrollen.

 [1]: http://wiki.novemberborn.net/sifr3/JavaScript+Configuration "Seite von sIFR 3 öffnen"
 [2]: http://eighteightzero.net/blog/?p=24 "Bugfix sIFR/SWFObject für alte Version von sIFR "
 [3]: http://blog.deconcept.com/swfobject/ "Seite von SWFObject öffnen"
 [4]: http://wiki.novemberborn.net/sifr3/JavaScript+Configuration "Dokumentation zur Javascript Konfiguration von sIFR ansehen"
 [5]: http://discuss.joyent.com/viewforum.php?id=20 "sIFR Forum besuchen"
 [6]: http://mediavrog.net/blog/2008/04/28/javascript/sifr-probleme-beim-scrollen-im-internet-explorer-6-und-7/ "Artikel zu fehlerhaftem Scollverhalten in diesem Fenster öffnen"