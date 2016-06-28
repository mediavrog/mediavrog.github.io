---
layout: single
title: 'kj_imagelightbox 2 - Seiten Bilderset'
published: true
comments: true
date: 2007-08-15 02:08:27
tags:
    - extensions
    - lightbox
categories:
    - typo3
    - archive!
permalink: /blog/2007/08/15/typo3/extensions/kj_imagelightbox-2-seiten-bilderset
image:
    thumb: typo33.jpg
---
> Ich habe nach einer Möglichkeit gesucht, Bilder verschiedener uids (content elemente) zu einem Imageset hinzuzufügen.
> Die Bilder dieses Imagesets sollte dann rel=lightbox[seitenid] besitzen. Dieses Feature sollte einfach einstellbar
> sein. Hier mein Vorschlag (ist auch im Mantis des Projekts gemeldet). 


Nach folgenden Änderungen ist es möglich, neben `Aktiviere Bilderset` auch `Aktiviere Seitenbilderset` auszuwählen.

## ext_tables.sql

```changelog
(add) tx_kjimagelightbox2_imagesetpage tinyint(3) DEFAULT '0' NOT NULL
```

## ext_tables.php

```changelog
(add)
'tx_kjimagelightbox2_imagesetpage' => Array (
    'exclude' => 1,
    'label' => 'LLL:EXT:kj_imagelightbox2/locallang_db.php:tt_content.tx_kjimagelightbox2_imagesetpage',
    'config' => Array (
    'type' => 'check',
)
),
(update) $GLOBALS['TCA']['tt_content']['palettes']['7']['showitem'] = 'image_link, image_zoom, tx_kjimagelightbox2_imagelightbox2, tx_kjimagelightbox2_imageset,tx_kjimagelightbox2_imagesetpage, tx_kjimagelightbox2_presentationmode';
```

## locallang_db.xml

```changelog
[...]
<label index="tt_content.tx_kjimagelightbox2_imageset"&gt;Activate ImageSet</label>
(add)<label index="tt_content.tx_kjimagelightbox2_imagesetpage">add to Page ImageSet</label>
<label index="tt_content.tx_kjimagelightbox2_presentationmode">Presentation mode</label>
[...]
<label index="tt_content.tx_kjimagelightbox2_imageset">Aktiviere BilderSets</label>
(add)<label index="tt_content.tx_kjimagelightbox2_imagesetpage">zu Seiten-Bilderset hinzufügen</label>
<label index="tt_content.tx_kjimagelightbox2_presentationmode">Praesentations Modus</label>
[...]
```

## class.ux\_tslib\_content.php

```changelog
(change) $imgSetNumber = (intval($conf['imageLightbox2.']['imageset'])>0)?intval($conf['imageLightbox2.']['imageset']):$this->data['tx_kjimagelightbox2_imagesetpage']?$this->data['pid']:$this->data['uid'];
```