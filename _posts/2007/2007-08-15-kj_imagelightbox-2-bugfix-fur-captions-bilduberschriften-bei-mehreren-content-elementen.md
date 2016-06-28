---
layout: single
title: 'kj_imagelightbox 2 - Bugfix für Captions / Bildüberschriften bei mehreren Content Elementen'
published: true
comments: true
date: 2007-08-15 02:08:42
tags:
    - bugfix
    - caption
    - imagelightbox
    - lightbox
    - extensions
categories:
    - typo3
permalink: /blog/2007/08/15/typo3/extensions/kj_imagelightbox-2-bugfix-fur-captions-bilduberschriften-bei-mehreren-content-elementen
image:
    thumb: typo33.jpg
---
> **Update 31.08.07**: Habe eine E-Mail von einem Entwickler der Extension bekommen, dass der Bugfix integriert ist.
> Er wird dann bestimmt mit dem nächsten Update der Extension im TER kommen.
>
> In der **KJ: Image Lightbox v2** (Version 1.4.2) gibt es einen Bug der dafür sorgt, dass beim Verwenden der Lightbox
> in mehreren Content-Elementen einer Seite die Bildunterschriften / Captions ab dem zweiten Content Element
> nicht mehr angezeigt werden.


Ich habe den Bugfix dafür bereits im Mantis des Projekts gemeldet, bis er umgesetzt ist hier meine Änderungen:

## Sie betreffen durchgehend die Datei _class.ux\_tslib\_content.php_

```
//Zeile 35:(insert)
// global var for counting items on page
var $itemCount = 0;

//Zeile 65:(insert)
// check if last uid matches current uid;
//if test fails -> set singleCaption to 0 (for this->data[imageCaption] Array)
if($this->uid != $this->data['uid'] && $this->uid){$this->singleCaption = 0;}

// set this->id to current uid
$this->uid = $this->data['uid'];

//Zeile 187:(update)
id="'.$this->singleCaption.'
//ersetzen durch
id="imageLightbox'.$this->itemCount.'

//Zeile 190: (add)
$this->itemCount++;
//(Danke an T0m für den Hinweis :) )
```

Viel Spaß damit

## Datei inklusive Bugfix (aber ohne Garantie) 

[class.ux\_tslib\_content.php inklusive Bugfix][1]

(nach dem Download einfach umbenennen in class.ux\_tslib\_content.php und in das Verzeichnis der Extension legen)

#### Auszug aus einem Kommentar bezüglich Mootools und **KJ: Image Lightbox v2**:

Ich habe schonmal die kj_imagelightbox2 so umgeschrieben, dass anstatt der Lightbox/Prototype-Combo die Mootools/Slimbox verwendet wird. Außerdem habe ich den Parameter ’Deactivate inclusion of JSFramework’ hinzugefügt, was die Einbindung des JS-Frameworks verhindert. Somit kann z.B. per t3mootools das Mootools Framework eingebunden werden und von der kj imagelightbox nur das Slimbox Script.

Wenn Interesse besteht, kann ich die Datei zuschicken. [In meinem Artikel dazu gibts die Extension als t3x.][2]

 [1]: /uploads/classux_tslib_contentphp.txt "class.ux_tslib_content.php inklusive Bugfix"
 [2]: /blog/2008/05/23/typo3/extensions/kj_imagelightbox-2-fur-mootools-slimbox/ "Erweiterte Extension kj_imagelightbox in diesem Blog herunterladen"