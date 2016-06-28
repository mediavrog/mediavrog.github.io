---
layout: single
title: 'Firebug Issue with CSS Specifity calculation'
published: true
comments: true
date: 2009-08-31 01:08:56
tags:
    - firebug
categories:
    - css
permalink: /2009/08/31/css/firebug-issue-with-css-specifity-calculation
image:
    thumb: firefox.jpg
---
> Firebug has a minor bug in it's css module regarding the calculation of specificity.

**Update** The bug has been resolved `Fixed in 1.5a22, http://getfirebug.com/releases.`
 
## What steps will reproduce the problem?

1. add combined css rule (#bd a, #bd a.myclass)
2. add css rule with specifity higher than the first rule of the combined selector and below specifity of the second rule of the combined selector (like #bd .myclass)
3. add e.g. different color definitions to the rules

## What is the expected result?

strike through the definitions of the single rule with the lower specifity

## What do you see instead?

Firebug shows the css definitions of the single rule with higher specifity than the second selector of the combined 
rule &gt; strikes the definition with the de facto higher specifity)

![CSS Specifity Calculation][1]

**Which version of Firebug? (more specific than latest please):** 1.4.2

**Which version of Firefox?** 3.0.13

**On what operating system?** Windows XP Sp2

### Testcase:

<a href="/uploads/style.css">style.css</a>,
<a href="/uploads/testcase-css-specifity.html">testcase-css-specifity</a>

Bug [\#2274 in Firebug Bugtracker](http://code.google.com/p/fbug/issues/detail?id=2274)

 [1]: /images/css-specifity.gif