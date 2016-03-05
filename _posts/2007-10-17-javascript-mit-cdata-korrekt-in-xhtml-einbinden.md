---
layout: post
title: 'Javascript mit CDATA korrekt in XHTML einbinden'
published: true
comments: true
date: 2007-10-17 02:10:46
tags:
    - javascript
    - xhtml
categories:
    - javascript
    - xhtml
image:
    thumb: javascript.jpg
---
> In dem Artikel [Javascript and XHTML][1] beschreibt [Stephen Chapman][2] moderne Möglichkeiten, inline-Javascript korrekt einzubinden. Hier eine kurze Zusammenfassung seines Artikels.



Er fängt beim modernsten und eben auch korrekten Weg an, **Javascript in XHTML Dokumenten als CDATA** einzubinden:

&lt;script type="text/javascript"&gt;
&lt;![CDATA[
  //content of your Javascript goes here
]]&gt;
&lt;/script&gt;

Dem Validator wird mitgeteilt, dass es sich im CDATA-Tag um Text (Character Data) handelt welcher nicht als XHTML anzusehen ist. Laut DTD wird ohne diese Angabe nämlich standardmäßig PCData angewandt, was für Parsed Character Data steht. Der Nachteil von PCDATA besteht nun darin, dass XHTML-Tags im Kontext validiert werden und man dadurch genötigt ist jedes Tag zu entwerten (z.B. per Umschreibung als < für < oder per Escapen der Zeichen mit einem Backslash (\). Diese Entwertung entfällt bei der Angabe als CDATA und validiert einwandfrei.

## Da nun aber einige ältere Browser dieses Tag nicht verstehen (und Javascript-Fehler werfen) wird es für sie einfach auskommentiert:

&lt;script type="text/javascript"&gt;
/* &lt;![CDATA[ */
  // content of your Javascript goes here
/* ]]&gt; */
&lt;/script&gt;

Das Dokument validiert wie gehabt, da die Kommentarzeichen für den Validator keine Bedeutung haben, und auch ältere Browser die XHTML nicht verstehen und alles als HTML parsen, interpretieren das Javascript korrekt.

## Zur Veranschaulichung der besprochenen Thematik noch ein kleines Beispiel:

Wir wollen einem Element mit der id &#8222;myText&#8220; html-Code zuweisen.

&lt;script type="text/javascript"&gt;
  $("myText").setHTML("&lt;p&gt;Hallo&lt;/p&gt;");
&lt;/script&gt;

Mit dem oben genannten Codebeispiel ohne die explizite Angabe des script-Inhalts als CDATA wird ein XHTML-Dokument **nicht validieren** (siehe Bild):

[![XHTML Elemente in einem Script-Tag sind nicht valide][3]][4]

Nach dem Deklarieren als CDATA validiert das Dokument.

&lt;script type="text/javascript"&gt;
/* &lt;![CDATA[ */
  $("myText").setHTML("&lt;p&gt;Hallo&lt;/p&gt;");
/* ]]&gt; */
&lt;/script&gt;

Zuletzt führt [Stephen Chapman][2] noch einen **oft begangenen Fehler** beim Einbinden von Javascript an:

&lt;script type="text/javascript"&gt;
&lt;!-- // hide from really old browsers that noone uses anymore
  // also hide from browsers that use the XHTML DTD
  // content of your Javascript goes here
// --&gt;
&lt;/script&gt;

Für moderne Browser und den Validator (und eben auch uralt-Browser) wird dadurch das Javascript komplett auskommentiert. Somit wird es wahrscheinlich bei einer neuen Generatoin Browser, welche sich strikt an XHTML Richtlinien hält, nicht mehr ausgeführt und sollte daher vermieden werden.

 [1]: http://javascript.about.com/library/blxhtml.htm "Artikel in neuem Fenster öffnen"
 [2]: http://javascripts.about.com/mbiopage.htm
 [3]: http://mediavrog.net/blog/wp-content/uploads/2007/10/jspcdata.thumbnail.gif
 [4]: http://mediavrog.net/blog/wp-content/uploads/2007/10/jspcdata.gif "XHTML Elemente in einem Script-Tag sind nicht valide"