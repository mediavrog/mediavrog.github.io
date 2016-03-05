---
layout: post
title: 'Factory method - design patterns in Mootools 1'
published: true
author: steve
comments: true
date: 2010-03-08 01:03:03
tags:
    - design pattern
    - factory
    - mixin
categories:
    - mootools
image:
    thumb: mootools.jpg
---
> Wer den Objektorientierungsansatz von Mootools oft nutzt wird das **[factory method pattern][1]** früher oder später nutzen wollen. Eine einfache Implementierung als Mixin könnte wie folgt aussehen:

```javascript
var Factory = new Class({
   factor: function(classname, params) {
      return new window[classname](params);
   }
});
```

Jede Mootools-Klasse wird bei ihrer Definition einer Variablen zugewiesen, welche sich automatisch im global scope, dem window-object, befindet und über den Objektzugriff &#8222;[]&#8220; angesprochen werden kann.

Die Implementierung dieses Entwurfsmusters lässt sich nun in jeder weiteren Klasse einfach als Mixin nutzen.

```javascript
var myClass = new Class({
   Implements: [Factory]
});
```

 [1]: http://de.wikipedia.org/wiki/Fabrikmethode