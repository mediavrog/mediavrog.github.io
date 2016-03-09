---
layout: post
title: 'Typo3 nach Umzug auf neuen Server: "Anzeigen / Vorschauoption" springt auf alten Server'
published: true
comments: true
date: 2009-09-10 02:09:07
tags:
    - domain
    - konfiguration
    - typo3
categories:
    - typo3
permalink: /blog/2009/09/10/typo3/typo3-nach-umzug-auf-neuen-server-anzeigen-vorschauoption-springt-auf-alten-server
image:
    thumb: typo33.jpg
---
> Heute musste ich mich um ein Typo3 Problem kümmern, bei dem eine Seite im Vorschau-Modus in Typo3 nicht angezeigt wurde, nachdem das Projekt auf einen neuen Server umgezogen war (**The requested page does not exist!**).



Nach kurzer Recherche stellte sich heraus, dass Typo3 immer wieder versucht hat, den Inhalt vom alten Server zu holen. Da es sich um eine neu angelegte Seite handelte, fand er diese nicht auf dem alten Server und lieferte obigen Fehler zurück.



Ein Hilferuf von 2006 in der Typo3 Mailingliste beschreibt das Problem ebenfalls sehr gut:
  
> hab vor ein paar tagen eine fertiges typo3 system von meinen
> testserver exportiert und auf einen neuen server importiert.
> verlief soweit fast alles problemlos, probleme gibt es nur wenn ich
> versuche im rechten menu &#8222;anzeigen&#8220; oder bei der seitenerstellung die
> funktion &#8222;vorschau (lupe)&#8220; nutzen möchte das dann immer wieder meine
> alte serverurl aufgerufen wird. 
> <cite>Michael Hoffmann michael at steinefrenz.net - Fri Oct 13 13:18:08 CEST 2006</cite>
  
#### Lösung

In meinem Fall lag das Problem an der Domainkonfiguration im Typo3. Wie im Bild zu erkennen, stand die alte Domain an 
erster Stelle in der Konfiguration.

![Falsche Domainkonfiguration][1]

Nachdem sie mit den Schaltflächen (grün markiert) in der Liste nach unten verschoben wurde, 
funktionierte auch die Vorschau-Ansicht wieder problemlos und zeigt nun auf den aktuellen Server.

![Richtige Domainkonfiguration][2]
  
 [1]: /images/falschedomain.gif
 [2]: /images/korrektedomain.gif