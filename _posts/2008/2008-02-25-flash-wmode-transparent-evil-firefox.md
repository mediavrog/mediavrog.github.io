---
layout: post
title: 'Flash: wmode = transparent = evil (Firefox)'
published: true
comments: true
date: 2008-02-25 03:02:45
tags:
    - bug
    - felder
    - firefox-plugin
    - flash
    - flv
    - opaque
    - sonderzeichen
    - stockt
    - streaming
    - swf
    - transparent
    - wmode
categories:
    - firefox
permalink: /blog/2008/02/25/browser/firefox/flash-wmode-transparent-evil-firefox
image:
    thumb: firefox.jpg
---
> Besonders im Firefox sorgt wmode=transparent des Öfteren für kleine oder große Bugs, welche sich hartnäckig halten und oftmals nicht gleich mit wmode transparent in Verbindung gebracht werden &#8211; das sorgt für viele (Achtung Ironie:) lustige Debugstunden, was sich beim Halten einer Deadline natürlich besonders gut macht. 



Dieser Post soll über bekannte Bugs aufklären und neue Sammeln.

## Erklärung des Parameters wmode

wmode kann beim Einfügen von Flash in (X)HTML genutzt werden, um den Hintergrund des Flashfilms (swf) transparent zu schalten und somit dem Browser die Möglichkeit zu geben, andere Elemente unter den Flashfilm zu rendern. Dies ist an sich eine feine Sache, denn eigentlich besitzt Flash, in eine Webseite eingebettet, exklusiven Zugriff auf den Pixelbereich (=> eigenes _hWnd_) und kann nicht mit HTML-Elementen auf der Seite interagieren. Somit sind keine gegenseitigen Überdeckungen und Transparenzen möglich. Zur Erklärung ein kurzer Ausschnitt aus der Flash-Hilfe, welche zum Standard-Wert **window** des wmode-Parameters folgendes schreibt:

> **window:** Die Anwendung wird in einem eigenen rechteckigen Fenster auf einer Webseite abgespielt. Diese Option legt fest, dass die Flash-Anwendung keinerlei Interaktion mit den HTML-Ebenen durchführt und immer das oberste Element ist.



Da dieses Verhalten nicht immer gewünscht ist, gibt es weiterhin die Werte **opaque** und **transparent**. Sie ermöglichen, dass der Flashfilm als Element der HTML-Seite verstanden werden kann. Es greifen dadurch auch Positionierung, z-Index und so kann der Flashfilm nun auch von anderen (X)HTML-Elementen überdeckt werden.

Eine sehr gute Erläuterung fand ich dazu im Artikel [Flash, DHTML Menus and Accessibility][1] von [Stephanie Sullivan][2].

## Was ist das Problem mit wmode?

Leider sorgt das Rendern per **wmode transparent** oder **opaque** manchmal zu unerwünschten Nebeneffekten. Dieser Post soll alle Eigenheiten des Flashplayers sammeln, welche von wmode provoziert werden. Meistens treten sie (leider) im Firefox auf, was in der Geschichte des Flash-Plugins seinen Ursprung hat (Stichwort NPAPI vs. DirectX).

Sollte ein Bug einen Browser außer Firefox betreffen, so wird er in eckigen Klammern hinter dem Titel vermerkt.

Die Anmerkung &#8222;Kein Workaround bekannt&#8220; meinst, dass außer wmode auf window zu setzen kein praktikabler Lösungsvorschlag gemacht werden könnte. **Mit wmode=window tauchen diese Bugs nicht auf.**

  *  **kein @ in Formularfeldern**
  
    Nicht nur das @, sondern alle möglichen nicht-Standard Zeichen werden in den Feldern nicht mehr angezeigt. [Dieser Post im 5 1/2 Blog][3] zeigt das Problem &#8211; inklusive Diskussion zum Thema in den Kommentaren.
  
    _Kein Workaround bekannt._
  * **kein blinkender Cursor in den Feldern
  
** Ebenfalls durch wmode transparent oder opaque hervorgerufen.
  
    _Kein Workaround bekannt._
  * **hitarea von Schaltflächen bleibt bei gescrolltem Inhalt an der alten Stelle
  
** _Kein Workaround bekannt._
  * **Performance-Probleme beim Abspielen von flv
  
** Gerade bei gekeyten Filmen (transparente flv&#8217;s) in Verbindung mit wmode=transparent kommt es zu herben Performanceeinbußen und die flv&#8217;s beginnen zu stocken oder werden nicht abgespielt, bis man mit der Maus über dem Flashfilm hin- und herfährt.
  
    Hier sollte man ernsthaft in Betracht ziehen, ob die Tranzparenz des swf unbedingt benötigt wird und diese ggf. abschalten (wmode auf window setzen).
  
    Der Einbruch der Leistungsfähigkeit ist auch Adobe bekannt und wird oftmals bei der Erklärung zu wmode als Hinweis genannt:
  
    **Note:** If windowless mode is used, performance can be affected to some degree. If fastest performance is a top priority, you may consider other design options.
  
    _Kein Workaround bekannt._

Sollten euch andere Bugs auffallen, könnt ihr sie gern hier diskutieren.

Zu einer Liste mit bereits bei [bugzilla][4] gemeldeten Bugs betreffend des Flash Plugins gelangt man mit dem Suchbegriff _flash_ in der [Bugzilla Suchmaske][5].

 [1]: http://www.communitymx.com/content/article.cfm?cid=e5141 "Artikel zum Parameter wmode öffnen (englisch)"
 [2]: http://www.communitymx.com/author.cfm?cid=1008 "Profil von Stephanie Sullivan öffnen."
 [3]: http://www.5etdemi.com/blog/archives/2005/06/firefox-wmodetransparent-is-completely-screwy-and-breaks-textfields "Beitrag zu wmode Problemen lesen"
 [4]: https://bugzilla.mozilla.org "Mozilla Bugtracker öffnen"
 [5]: https://bugzilla.mozilla.org/query.cgi "Bugzilla Suchmaske öffnen"