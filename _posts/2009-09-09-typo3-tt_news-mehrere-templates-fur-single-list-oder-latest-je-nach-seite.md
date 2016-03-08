---
layout: post
title: 'Typo3 tt_news - Mehrere Templates für SINGLE, LIST oder LATEST je nach Seite'
published: true
comments: true
date: 2009-09-09 04:09:40
tags:
    - templates
    - typo3
categories:
    - typo3
    - ts-snippets
permalink: /blog/2009/09/09/typo3/typo3-tt_news-mehrere-templates-fur-single-list-oder-latest-je-nach-seite
image:
    thumb: typo33.jpg
---
> Ein kleiner Tipp, um (beliebige) verschiedene Templates in tt_news in Abhängigkeit der Seiten-ID oder irgendeiner anderen Condition zu verwenden.



In der [tt_news Dokumentation][1] wird dies nur beiläufig erwähnt. In meinem konkreten Fall wollte ich mehrere Templates für die SINGLE-View verwenden, um in einem den kompletten Artikel darzustellen, und in einer Multibox auf einer anderen Seite dann nur die NEWS_IMAGEs anzuzeigen.

# Change single template for "Galerie" to fetch another template than standard single
[PIDinRootline = {$galleryPageId}]
plugin.tt_news {
  altMainMarkers.TEMPLATE_SINGLE = TEMPLATE_SINGLE_GALLERY
  altMainMarkers.TEMPLATE_SINGLE.wrap = ###|###
}
[global]





  
Im news-HTML-Template muss dazu ein neues Subpart namens TEMPLATE\_SINGLE\_GALLERY angelegt und befüllt werden. In meinem konkreten Beispiel schaut das dann so aus:







  ###NEWS_TITLE###





  
    
      ###NEWS_IMAGE_BOX###
                  ###NEWS_IMAGE###
              
    
        
  
  




  







Auf der entsprechenden Seite mit der uid {$galleryPageId} muss in diesem Beispiel natürlich ebenfalls ein tt_news Plugin hinzugefügt werden und mit dem code &#8222;SINGLE&#8220; konfiguriert werden.

 [1]: http://typo3.org/documentation/document-library/extension-manuals/tt_news/2.4.0/view/1/4/ "TT_NEWS Dokumantation auf typo3.org besuchen"