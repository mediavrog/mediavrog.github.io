---
layout: post
title: 'Backend / BE Extension - Konfiguration von Konstanten direkt nach Installation möglich machen'
published: true
comments: true
date: 2007-05-28 01:05:20
tags:
    - extension
    - konfiguration
    - typo3
categories:
    - extensions
image:
    thumb: typo31.jpg
---
> Jeder kennt es: nach der Installation einer Extension bietet diese noch im Extension Manager die Möglichkeit, verschiedene Konstanten zu definieren.
>
> Damit die eigene Extension ebenfalls so direkt konfiguriert werden kann (z.B. wenn es sich um eine reine Backend Extension handelt) muss man


## 1.) die Datei ext\_conf\_template.txt im Extensionverzeichnis anlegen

In dieser können nun die verschiedenen Einstellmöglichkeiten eingetragen werden. Dabei werden verschiedene Variablentypen wie boolean oder string unterstützt. Der prinzipielle Aufbau einer Konfigurationszeile sieht folgendermaßen aus:

# cat=CATEGORY/SUBCATEGORY/SORT; type=VAR_TYPE; label=HEADER:DESCRIPTION
var = DEFAULT

Die Doku der Teile folgt weiter unten. Alle die nicht lesen möchten, können sich eine [Beispielhafte Konfigurationsdatei herunterladen][1].

## 2.) die Werte in der Extension holen

```php
$this->extConf = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['der_extension_key']);
$var1 = $this->extConf['name_der_variable'];
```

Hiermit kann man sich die Konstanten in die eigene Extension holen.

## Es folgt eine Kurzdoku der einzelnen Teile der Konfigurationszeile

(analog [Typo3.org Introduction to Typoscript Templates][2] )

### CATEGORY &#8211; Kategorieangabe für die Konstante

  * basic &#8211; Konstanten, welche wichtig für die Extension sind; wird meist genutzt um bestimmte Funktionen ein- oder auszuschalten oder z.B. IDs von Seiten anzugeben

Die Anderen werden eher selten für diesen Zweck benutzt; wer will kann sie sich unter dem oben stehendem Link nachlesen. Die Angabe der Kategorie ist für reine Backend Extensions (und die Angabe in der ext\_conf\_template.txt) meines Erachtens nicht sehr interessant (würde bei basic bleiben), wogegen bei Extensions welche man als Typ in eine Seite einfügt (meist ja Frontent Ext.) die Angabe von Kategorien ganz nützlich sein kann, da man diese im Constant-Editor wiederfindet :).

##### SUBCATEGORIES &#8211; Unterkategorie (section) für die Konstante

  * enable,dims,file,typo,color,links,language

Diese Angaben sind für Backend Extensions auch eher irrelevant.

### SORT &#8211; Wichtung/Sortierung der Konstante in der Kategorie

  * a bis z &#8211; damit kann man die Reihenfolge der Konstanten beeinflussen

Diese Angaben sind für Backend Extensions auch eher irrelevant.

### VAR_TYPE &#8211; Typangabe der Konstante

  * int[uGrenze-oGrenze] &#8211; Integer in den optionalen Grenzen uGrenze bis oGrenze
  * int+ &#8211; Integer (positiv)
  * color &#8211; HTML Farbe (#FFFFFF)
  * options [item1,item2,&#8230;] &#8211; Auswahlbox mit label=wert der items; [label1=wert1,label2=wert2,&#8230;]
  * boolean [truevalue] &#8211; boolscher Wert; per truevalue (opt.) kann man den Wert setzen, welcher wahr entspricht (std: 1)
  * file [ext-list/IMAGE\_EXT] &#8211; Auswahl von Ressourcen; ext-list gibt die erlaubten Dateitypen an z.B. [txt,html,htm]; mit der Konstante IMAGE\_EXT werden Standard Bildtypen angegeben
  * string &#8211; String-Wert (Standard wenn nichts angegeben ist)

Durch Angabe eines dieser Werte erzeugt Typo3 automatisch das passende Eingabefeld dazu (Checkbox bei boolean&#8230;). Weitere Werte siehe Doku.

### HEADER:DESCRIPTION &#8211; Überschrift und Kurzbeschreibung der Konstante

Das label wird beim ersten Auftreten von &#8222;:&#8220; in die Teile Überschrift und Beschreibung aufgeteilt. Die Überschrift wird dabei fett in einer extra Zeile angezeigt.

### var = DEFAULT &#8211; Variablenname und Defaultwert

Per DEFAULT kann man einen Wert voreintragen lassen (Standardwert). Über den angegebenen Variablennamen wird, ganz klar, später in der Extension zugegriffen.

 [1]: http://mediavrog.net/blog/wp-content/uploads/2007/05/ext_conf_template.txt "Beispielhafte Konfigurationsdatei als .txt-Datei herunterladen"
 [2]: http://typo3.org/documentation/document-library/core-documentation/doc_core_tstemplates/0.0.1/view/2/5/#id2843880 "Dokumentation zu Typoscript Templates auf typo3.org ansehen"