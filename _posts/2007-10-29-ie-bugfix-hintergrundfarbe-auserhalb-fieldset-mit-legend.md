---
layout: post
title: 'IE bugfix - Hintergrundfarbe außerhalb fieldset mit legend'
published: true
comments: true
date: 2007-10-29 11:10:39
tags:
    - bugfix
    - css,
    - fieldset
    - hintergrund
    - hintergrundfarbe
    - Internet Explorer (IE)
    - legend
categories:
    - internetexplorer
image:
    thumb: ie.jpg
---
> Georg Sørtun hat einen sehr guten Weg gefunden, um das Problem des Herausfließens oder background-overflow von fieldsets mit einem legend zu beheben.



Er nutzt dabei eine vererbte line-heigt, negatives margin und Standard IE Hacks. [Die Lösung][1] ist recht kurz und hat mir persönlich sehr geholfen, eine alte Barriere zu beheben und nun auch legend-Tags cross-Browser im gleichen Erscheinungsbild einzusetzen. Vielen Dank Georg!

 [1]: http://www.gunlaug.no/tos/moa_18a.html "Erklärung zum Hack in neuer Seite ansehen"