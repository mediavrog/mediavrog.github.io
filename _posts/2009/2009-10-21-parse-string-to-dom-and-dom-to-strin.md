---
layout: single
title: 'Parse string to dom and dom to string'
published: true
comments: true
date: 2009-10-21 08:10:50
tags:
    - javascript
    - widget
    - xml
categories:
    - javascript
permalink: /blog/2009/10/21/javascript/parse-string-to-dom-and-dom-to-strin
image:
    thumb: javascript.jpg
---
> Converting Text to DOM and the other way round is an important part of modern Web-Javascript-Development. 
> It's even more important in the context of widget development for different platforms, which often just provide
> a key/value store for storing data persistently. That's where 
> <code>DOMParser</code>and <code>XMLSerializer</code> come to your rescue:


```javascript
var xmlstring = 'Blink';

var dom = (new DOMParser()).parseFromString(xmlstring, "text/xml");

var stringAgain = (new XMLSerializer()).serializeToString(dom);
```