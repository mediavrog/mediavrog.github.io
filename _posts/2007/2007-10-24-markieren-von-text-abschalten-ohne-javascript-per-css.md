---
layout: single
title: 'Markieren von Text abschalten ohne Javascript per CSS'
published: true
comments: true
date: 2007-10-24 12:10:49
tags:
    - css
    - text-selection
categories:
    - browser
permalink: /blog/2007/10/24/browser/markieren-von-text-abschalten-ohne-javascript-per-css
image:
    thumb: css.jpg
---
> Ganz ohne Javascript und das überall verbreitete onselectstart bzw. onselect lässt sich das Selektieren von Text per CSS (bzw. über das Setzen eines Attributes für den Internet Explorer und Opera) verhindern. 



Dazu sei als Allererstes erwähnt, dass ich diese Möglichkeit **NIE** auf normalen Text einer Webseite anwenden würde, da so die Usability **EXTREM** eingeschränkt wird und der Besucher verwirrt die Seite verlässt. Außerdem kann sich der findige Besucher auch über den Quelltext der Seite entsprechende Textpassagen kopieren &#8211; als Kopierschutz sollte diese Methode also nicht erwägt werden!

## Wozu das ganze also überhaupt?

Ich bin vor kurzem bei der Weiterentwicklung der [Custom Form Elements][1] auf ein Problem gestossen, als ich ein Text-Label einer Schaltfläche (dynamisch generiert) vor versehentlichem Markieren schützen wollte. Schaltflächen lassen wie gewohnt ein Markieren ihres Label eh nicht zu und dieses Verhalten musste ich imitieren. Die Lösung habe ich nach einiger Recherche zusammengetragen und sie funktioniert bei mir für IE 6/7, Opera 9, Netscape, Firefox 2, Safari:

## Mootools code (Eigenschaften per JS setzen):

```javascript
if(window.ie || window.opera){this.lab.setProperty("unselectable","on");}
if(window.gecko){this.lab.setStyle("MozUserSelect","none");}
if(window.webkit){this.lab.setStyle("KhtmlUserSelect","none");}
```

## CSS / Attribut 

```css
.myUnselectableText{
/* Gecko-based, Mozilla */
-moz-user-select:none;
/* Safari */
-khtml-user-select: none;
}
```

Für Opera und IE 6/7 wird die Eigenschaft unselectable gesetzt.

**Anmerkung**: ein XHTML Dokument validiert nicht mehr, wird diese Eigenschaft in den Quelltext geschrieben, also sollte man dieses Attribut lieber per JS setzen :)

```html
<p class="myUnselectableText" unselectable="on">Absatz</p>;
```

 [1]: http://customformelements.net/ "Custom form elements - Seite in neuem Fenster öffnen"