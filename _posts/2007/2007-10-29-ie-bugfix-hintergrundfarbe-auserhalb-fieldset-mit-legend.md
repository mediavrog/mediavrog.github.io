---
layout: post
title: 'IE bugfix - Hintergrundfarbe außerhalb fieldset mit legend'
published: true
comments: true
date: 2007-10-29 11:10:39
tags:
    - bugfix
    - css
    - fieldset
    - legend
categories:
    - internetexplorer
permalink: /blog/2007/10/29/browser/internetexplorer/ie-bugfix-hintergrundfarbe-auserhalb-fieldset-mit-legend
image:
    thumb: ie.jpg
---
> Georg Sørtun hat einen sehr guten Weg gefunden, um das Problem des Herausfließens oder background-overflow 
> von fieldsets mit einem legend zu beheben.

Er nutzt dabei eine vererbte line-heigt, negatives margin und Standard IE Hacks. [Die Lösung][1] 
ist recht kurz und hat mir persönlich sehr geholfen, eine alte Barriere zu beheben und nun auch 
legend-Tags cross-Browser im gleichen Erscheinungsbild einzusetzen. Vielen Dank Georg!

```css
/* basic fieldset styling */ 
 fieldset {
 background: #cde; 
 width: 300px; 
 position: relative; 
 line-height: 1.5;}

 fieldset legend {
 line-height: 1.3 
 /* note this line-height value */;}
 
 /* IE6 fix */
 * html fieldset#fixed legend {
 float: left; position: 
 relative; margin-top: -.95em 
 /* equals actual line-height minus 0.35em */;}
 
 * html p.comp {
 margin-bottom: 18px;}

 /* IE7 fix */ 
 *:first-child+html fieldset#fixed legend {
 float: left; position: relative; 
 margin-top: -.95em 
 /* equals actual line-height minus 0.35em */;}
 
 *:first-child+html p.comp {
 margin-bottom: 18px;}
```

 [1]: http://www.gunlaug.no/tos/moa_18a.html "Erklärung zum Hack in neuer Seite ansehen"