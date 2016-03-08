---
layout: post
title: 'kj_imagelightbox 2 - Seiten Bilderset'
published: true
comments: true
date: 2007-08-15 02:08:27
tags:
    - extension
    - lightbox
    - typo3
categories:
    - extensions
permalink: /blog/2007/08/15/typo3/extensions/kj_imagelightbox-2-seiten-bilderset
image:
    thumb: typo33.jpg
---
> Ich habe nach einer Möglichkeit gesucht, Bilder verschiedener uids (content elemente) zu einem Imageset hinzuzufügen. Die Bilder dieses Imagesets sollte dann rel=lightbox[seitenid] besitzen. Dieses Feature sollte einfach einstellbar sein. Hier mein Vorschlag (ist auch im Mantis des Projekts gemeldet). 



Nach folgenden Änderungen ist es möglich, neben Aktiviere Bilderset auch Aktiviere Seitenbilderset auszuwählen.

## ext_tables.sql

(add)tx_kjimagelightbox2_imagesetpage tinyint(3) DEFAULT '0' NOT NULL


## ext_tables.php

(add)
'tx_kjimagelightbox2_imagesetpage' =&gt; Array (
'exclude' =&gt; 1,
'label' =&gt; 'LLL:EXT:kj_imagelightbox2/locallang_db.php:tt_content.tx_kjimagelightbox2_imagesetpage',
'config' =&gt; Array (
'type' =&gt; 'check',
)
),

(update)$GLOBALS['TCA']['tt_content']['palettes']['7']['showitem'] = 'image_link, image_zoom, tx_kjimagelightbox2_imagelightbox2, tx_kjimagelightbox2_imageset,tx_kjimagelightbox2_imagesetpage, tx_kjimagelightbox2_presentationmode';


## locallang_db.xml

[...]
&lt;label index="tt_content.tx_kjimagelightbox2_imageset"&gt;Activate ImageSet&lt;/label&gt;
(add)&lt;label index="tt_content.tx_kjimagelightbox2_imagesetpage"&gt;add to Page ImageSet&lt;/label&gt;
&lt;label index="tt_content.tx_kjimagelightbox2_presentationmode"&gt;Presentation mode&lt;/label&gt;
[...]
&lt;label index="tt_content.tx_kjimagelightbox2_imageset"&gt;Aktiviere BilderSets&lt;/label&gt;
(add)&lt;label index="tt_content.tx_kjimagelightbox2_imagesetpage"&gt;zu Seiten-Bilderset hinzufügen&lt;/label&gt;
&lt;label index="tt_content.tx_kjimagelightbox2_presentationmode"&gt;Praesentations Modus&lt;/label&gt;
[..]


## class.ux\_tslib\_content.php

(change)$imgSetNumber = (intval($conf['imageLightbox2.']['imageset'])&gt;0)?intval($conf['imageLightbox2.']['imageset']):$this-&gt;data['tx_kjimagelightbox2_imagesetpage']?$this-&gt;data['pid']:$this-&gt;data['uid'];
