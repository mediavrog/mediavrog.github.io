---
layout: post
title: 'Leerzeichen im Typo3 wrap ohne &amp;nbsp; per noTrimWrap'
published: true
comments: true
date: 2007-07-19 02:07:00
tags:
    - konfiguration
    - leerzeichen
    - notrimwrap
    - typo3
    - typoscript
    - wrap
categories:
    - typo3
    - ts-snippets
image:
    thumb: typo33.jpg
---
> Viele Fragen sich, wie man Leerzeichen ins Wrapping bei Typoscript bekommt.



In folgendem Auszug einer Mailformplus-Konfiguration, wird beim wrappen kein Leerzeichen nach _Seite_ erzeugt.

email_subject = TEXT

email_subject{

 data = leveltitle:-1

 wrap = Kontakt über Seite |

}

Das Problem lässt sich an sich leicht lösen, wenn man noTrimWrap kennt. Es entfernt keine Whitespaces und der Leerzeichen Existenz bleibt gesichert.
  
Folgendes Beispiel sorgt für das gewünschte Ergebnis (man beachte die Pipes (|) am Anfang und am Ende):

email_subject = TEXT

email_subject{

 data = leveltitle:-1

 noTrimWrap = |Kontakt über Seite ||

}