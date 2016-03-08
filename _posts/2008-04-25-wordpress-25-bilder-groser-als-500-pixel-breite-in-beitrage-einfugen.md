---
layout: post
title: 'Wordpress 2.5 - Bilder größer als 500 Pixel Breite in Beiträge einfügen'
published: true
comments: true
date: 2008-04-25 03:04:50
tags:
    - 500
    - beschrÃ¤nkung
    - bilder
    - breite
    - maximal
    - Wordpress (WP)
categories:
    - wordpress
permalink: /blog/2008/04/25/wordpress/wordpress-25-bilder-groser-als-500-pixel-breite-in-beitrage-einfugen
image:
    thumb: wordpress.jpg
---
> In WordPress 2.5 gibt es eine intern verankerte Option, welche die maximale Breite eines Bildes auf 500px setzt. Somit können größere Bilder nicht ohne Weiteres in Beiträge eingefügt werden.



Schon im tinyMCE wird das Bild verkleinert dargestellt. Dies dient dazu, dass die Bilder das Layout der Seite nicht sprengen und so nie größer als der Inhaltsbereich angezeigt werden.

## Die Ursache

In der Datei _wp-includes/media.php_ wird diese Grenze definiert (Zeilen 30-34)

if ( !empty($GLOBALS['content_width']) ) {
   	$max_width = $GLOBALS['content_width'];
}
else
	$max_width = 500;

Nun was sagt uns das? Angenommen die globale Variable

$GLOBALS['content_width']

wäre definiert, würde WordPress diese Breite, anstatt der 500 nehmen.

## Die Lösung

Gesagt, getan&#8230; Wir legen im Ordner unseres Themes (denn wir wollen ja die maximale Bildergröße an unser spezielles Layout anpassen) einfach die Datei 

_functions.php_ an, falls sie nicht sowieso existiert. In der Datei definieren wir einfach die passende **maximale Breite der Bilder** für unser Theme, in dem wir die Variable mit einem Wert belegen:

&lt;?php
	$GLOBALS['content_width'] = 1250;
?&gt;

Fertig &#8211; schon lassen sich auch größere Bilder bis 1250px Breite und mehr in die Posts einfügen.

### Update 13.07.2009 &#8211; content_width und WordPress 2.8.x

In neueren Versionen von WordPress wurde offensichtlich auf $GLOBALS verzichtet. Um den gewünschten Effekt zu erreichen, kann nun im _functions.php_ einfach folgendes definiert werden:

&lt;?php
	$content_width = 1250;
?&gt;

In der _media.php_ wird auf diese Variable per 

global $content_width;


zugegriffen.