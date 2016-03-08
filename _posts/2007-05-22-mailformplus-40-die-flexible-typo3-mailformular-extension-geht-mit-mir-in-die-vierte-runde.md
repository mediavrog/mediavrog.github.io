---
layout: post
title: 'Mailformplus 4.0 - Die flexible Typo3 Mailformular Extension geht mit mir in die vierte Runde'
published: true
comments: true
date: 2007-05-22 11:05:28
tags:
    - extension
    - formular
    - mailformplus
    - userValidation
    - validierung
categories:
    - typo3
    - extensions
permalink: /blog/2007/05/22/typo3/mailformplus-40-die-flexible-typo3-mailformular-extension-geht-mit-mir-in-die-vierte-runde
image:
    thumb: mailformplus.jpg
---
> Seit kurzem ist die Version 4.0 der feinen Formularextension Mailformplus nun mit userValidation im Repository zu finden.

Sie hat Einiges zu bieten: neben der Darstellung mit eigenem HTML-Template, welches ein eigenes CSS nachladen kann, 
ist es per Typoscript möglich, die Felder validieren zu lassen (dazu gibts dann natürlich auch die passende Fehlerausgabe).
 Das Formular kann sich außerdem auf mehrere Seiten erstrecken (multipage) und bietet zudem noch Captcha Support.

An der neuen Version haben anscheinden ne Menge Leute daran gearbeitet und dem Autor der Extension hilfreich zur
Seite gestanden. Neben Mehrsprachigkeit, Spamschutz und einigen Bugfixes gibt es nun auch die Möglichkeit, die Felder /
Eingabedaten mit einer eigenen Funktion zu überprüfen (siehe [Hook for custom validation auf der Dokuseite][1] ),
welche ich dieser sehr guten und flexiblen Extension gerne beisteuerte.

Diese Funktionalität hatte mir persönlich noch gefehlt, da in der vorherigen Version nur auf ein paar vordefinierte Validierungsfunktionen zurückgegriffen werden konnte. Zudem bietet das Validieren mit dieser Methode die Möglichkeit, detailliertere und besser beschreibende Fehlermeldungen auszugeben. Weiterhin kann man damit auch Checkboxen und Radiobuttons prüfen.

In 3 Schritten zur eigenen Überprüfung der Daten / Validierung:

## 1) eigene Validierungsfunktion konfigurieren

Um den Hook zu nutzen, muss in der TS-Konfiguration von Mailformplus die

```
plugin.tx_thmailformplus_pi1.errorUserFunc = EXT:myext/class.user_myvalidation.php:user_myvalidation->user_validate
```

gesetzt sein. Im obigen Beispiel wird eine Instanz der Klasse `user\_myvalidation` (File: `class.user\_myvalidation.php`
aus dem Extensionverzeichnis myext) erstellt und deren Methode user_validate aufgerufen.

## 2) die Eingabefelder für die eigene Validierung konfigurieren

```typoscript
plugin.tx_thmailformplus_pi1.fieldConf.[name of inputfield].errorCheck = userValidation
plugin.tx_thmailformplus_pi1.fieldConf.[name of inputfield].errorCheck{
 checkFor = telephone
 param2 = ger
}
```

Der Parameter **checkFor** ist hier nur beispielhaft angegeben; man kann ihn in der eigenen Validierungsmethode per
 **$params[&#8218;checkFor&#8216;]** aufrufen, um z.B. über eine switch-case Anweisung auf die verschiedenen 
 Validierungen einzugehen (in diesem Beispiel nimmt die Variable den Wert &#8222;telephone&#8220; an).
  
Es können beliebige weitere Parameter angegeben werden, welche ebenfalls über $params[NAME\_DES\_PARAMETERS] ansprechbar sind.
  
Der zu überprüfende Wert des Inputfeldes ist über die Variable **$params[&#8218;value&#8216;]** erreichbar.

## 3) Die Validierungsfunktion schreiben

class.user_myvalidation.php

```php
class user_myvalidation {
function user_validate(&$params, &$ref){
  $input = $params['value'];
  switch($params['checkFor']){
    case "telephone":
        /* option 1 */
        $error = preg_match("/[+]?([0-9]+[s]?)+/",$input);

       /* extended version with custom error messages */
       if(strlen($input) &lt; 1){
          $error = array("errorFound"=>1,"errorText"=>'Please fill out this field');
       }
       else{
          $errorFound = preg_match("/[+]?([0-9]+[s]?)+/",$input);
          $error = array("errorFound"=>$errorFound,"errorText"=>'Please enter a valid telephone number');
       }
       break;
  case "email": ...    

  }
return $error;
}
}
```

Wie man in dem Beispiel gezeigt, kann die Übergabe eines gefundenen Fehlers auf zwei Wegen geschehen:

a) als boolean &#8211; ein Fehler wurde (nicht) gefunden
  
b) als array (&#8222;errorFound&#8220;=>boolean, &#8222;errorText&#8220;=>eigene Fehlernachricht, welche TS Einstellungen überschreibt&#8220;);

Mit der zweiten Variante hat man die Möglichkeit die Usability deutlich zu verbessern, da treffende Fehlermeldungen
 definiert werden können.

 [1]: http://typo3.org/documentation/document-library/extension-manuals/th_mailformplus/4.0.0/view/1/5/ "Beispielseite der Doku von Mailformplus 4.0 öffnen"