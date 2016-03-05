---
layout: post
title: 'Wordpress 2.5 > tinyMCE 3.0.6 > Template Plugin zum Laufen bekommen'
published: true
comments: true
date: 2008-04-01 06:04:52
tags:
    - 2.5
    - bug
    - firebug
    - template_external_list_url
    - template_templates
    - template-plugin
    - tinymce
    - u-has-no-properties
    - Wordpress (WP)
categories:
    - wordpress
image:
    thumb: wordpress.jpg
---
> WordPress 2.5 kommt nach dem großen Versionsprung nun auch endlich mit der Version 3 des tinyMCE Editors daher. Bei der Konfiguration des neuen tinyMCE ist mir aufgefallen, dass das Template-Plugin bei einer bestimmten Einstellung nicht mehr funktioniert. Die Lösung liegt in der Verwendung eines anderen Initialisierungsparameters.



## Doch vorerst zur Installation.

tinyMCE im WordPress Bundle wird nämlich nur mit einer spärlichen Anzahl an Plugins ausgeliefert. Dazu gehören autosave, directionality, fullscreen (Vollbildmodus beim Editieren), inlinepopups, media, paste, safari, spellchecker und wordpress. Doch [tinyMCE hat mehr zu bieten][1] und nach Anforderung sollten auch die Templates wieder mit von der Partie sein. Nach [Download der aktuellsten Version][2] auf der Seite von moxiecode (welcher dann auch alle Plugins beinhaltet) musste ich erstmal feststellen, dass mit WordPress offenbar eine noch nirgens (auch nicht im SVN) erschienene Version von tinyMCE ausgeliefert wird (vgl. aktuelle Version 3.0.5  WordPress tinyMCE 3.0.6). Ich nehme an dass in der WordPress Version einige Kompatibilitäten integriert worden sind.

Aber zurück zum Template-Plugin. Nach Kopieren in den tinyMCE Plugin-Ordner und Anpassen der tiny\_mce\_config.php (wp-includes\js\tinymce) an folgenden Stellen erschien schonmal der Template Button wieder:

$plugins = array( 'safari', 'inlinepopups', [...], 'template' );
$mce_buttons = apply_filters('mce_buttons', array('bold', [...], 'template' ));

[Hinweis: Die manuelle Anpassung der tiny\_mce\_config.php empfelhe ich nicht. Diese und folgende Einstellungen können in ein WP Plugin ausgelagert werden was bedingungslos zu empfehlen ist, da sie bei einem Upgrade von WordPress ansonsten verloren gehen können; [WordPress bietet zur Konfiguration von tinyMCE (insbesondere Hinzufügen eigener Buttons) Filter][3] an!]

Die weitere (gewohnte) Definition der eigenen Templates im $initArray schlug dann aber fehl:

'template_templates' => array(
	array("TemplateName","TemplateURL","TemplateBeschreibung"),
	array("TemplateName2","TemplateURL2","TemplateBeschreibung2")
);

## Die Ursache

Nach langer Recherche und Debuggen (danke [Firebug][4]!) habe ich die Ursache gefunden:

In der _tinymce\_plugin\_verzeichnis/template/js/template.js_ wird in der init-Funktion versucht den festgelegten Parameter _template_templates_ per

tsrc = ed.getParam("template_templates", false);

auszulesen. Leider [liefert die Funktion ed.getParam aber nur Strings zurück][5], was bei einem Array in Javascript den String &#8222;Array&#8220; zurückgibt. Klar dass die weitere Abarbeitung (insbesondere der Versuch diesen String zu durchlaufen und URLs daraus zu ermitteln) fehl schlägt und mit folgendem Fehler abbricht (Stack aus Firebug):

u has no properties

_init(undefined, Object base_uri=Object)tiny_mce_config.p... (line 39)

_init(undefined, undefined)tiny_mce_config.p... (line 39)

init()template.js (line 24)

(no name)(Object scope=Object)tiny_mce_popup.js (line 204)

_init([Object scope=Object], function(), [Object

scope=Object])tiny_mce_config.p... (line 39)

_onDOMLoaded()tiny_mce_popup.js (line 203)

(no name)()

## Die Lösung dazu

Zumindest bis der Bug gefixt wurde, ist recht einfach. TinyMCE lässt die Definition der Templates auch in einem externen Javascript-File zu.

Dazu wird einfach im initArray der [Parameter _template\_external\_list_url_][6] genutzt. Gefüllt mit dem Pfad zu einem Javascript-Datei ([vgl. beispielhafter Aufbau][7]), welche dann das Array von Templates enthält funktioniert auch der Template-Button wieder wie gewünscht.

## Ein letztes Problem

Mein letztes Problem ist nur noch, dass aus unerfindlichen Gründen die Platzhalter für die Lokalisierung nicht ersetzt werden (vgl. Screenshot)

[![Keine Lokalisierung im Template Plugin][8]][9]

Wenn dazu noch jmd eine Lösung kennt und sie hier postet wäre ich sehr dankbar :)

 [1]: http://tinymce.moxiecode.com/example_full.php?example=true "Full example von tinyMCE öffnen"
 [2]: http://tinymce.moxiecode.com/download.php "tinyMCE Downloadseite öffnen"
 [3]: http://codex.wordpress.org/TinyMCE_Custom_Buttons
 [4]: https://addons.mozilla.org/de/firefox/addon/1843 "Pluginseite von Firebug auf mozilla.org öffnen"
 [5]: http://wiki.moxiecode.com/index.php/TinyMCE:API/tinymce.Editor/getParam "Dokumentation zu getParam öffnen"
 [6]: http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/template#Plugin_options
 [7]: http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/template#Example_of_an_external_list
 [8]: http://mediavrog.net/blog/wp-content/uploads/2008/04/template_bug.thumbnail.gif
 [9]: http://mediavrog.net/blog/wp-content/uploads/2008/04/template_bug.gif "Keine Lokalisierung im Template Plugin"