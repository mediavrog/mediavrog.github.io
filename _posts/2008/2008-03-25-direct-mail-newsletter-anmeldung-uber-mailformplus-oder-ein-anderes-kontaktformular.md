---
layout: post
title: 'Direct Mail Newsletter Anmeldung über Mailformplus oder ein anderes Kontaktformular'
published: true
comments: true
date: 2008-03-25 03:03:00
tags:
    - direct-mail
    - mailformplus
    - newsletter
    - typo3
    - userFunc
categories:
    - typo3
permalink: /blog/2008/03/25/typo3/direct-mail-newsletter-anmeldung-uber-mailformplus-oder-ein-anderes-kontaktformular
image:
    thumb: typo33.jpg
---
> Die Anmeldung zum Erhalt eines Newsletters per DirectMail läuft bekannterweise über die Extension [Direct Mail Subscription][1].



Doch leider fehlt es ihr an Flexibilität, da die Funktionalität des Anmeldens (inkl. Versand einer Bestätigungsmail) nicht in einer Methode gekapselt ist, sondern über Typoscript realisiert wird (userFunc). Somit ist es nicht ohne Weiteres möglich, eine Newsletteranmeldung per Checkbox in einem beliebigen (Kontakt-)Formular zu integrieren. Im Folgenden wird eine Lösung gezeigt, welche die beschriebene Funktionalität ermöglicht.
  



  
Das TS-Setup findet sich in der ext\_typoscript\_setup.txt von [Direct Mail Subscription][1] (ein Auszug):

plugin.feadmin.dmailsubscription &gt;

plugin.feadmin.dmailsubscription = USER_INT

plugin.feadmin.dmailsubscription {

   userFunc = user_feAdmin-&gt;init

   includeLibs = media/scripts/fe_adminLib.inc

   templateFile = {$plugin.feadmin.dmailsubscription.file.templateFile}

[...]

Nach dem Einschreiben über das Frontendplugin von [Direct Mail Subscription][1] werden die Daten an die init-Methode der Klasse user_feAdminübergeben, welche sich um das Speichern der Daten in der richtigen Tabelle und den Versand einer Bestätigungsmail (Double Opt-In) kümmert.

Um diese Funktionalität in der eigenen Extension oder einer userFunktion (z.B. bei [Mailformplus die saveUserFunc][2]) nutzen zu können muss man wie im TS die richtigen Bibliotheken einbinden und noch ein paar Parameter setzen. Es folgt eine Schritt für Schritt-Anleitung. Es wird vorausgesetzt, dass bereits eine PHP-Datei exisitiert, welche nach dem Abschicken des Mailformulars ausgeführt wird (ähnlich der [saveUserFunc von Mailformplus][3] ) und die Extension [Direct Mail Subscription][4] passend konfiguriert ist.

## die benötigten Klassen und Bibliotheken einbinden

// fe_admin Bibliothek; speichert Daten in DB und verschickt die Bestätigungsmail
require_once("typo3/sysext/cms/tslib/media/scripts/fe_adminLib.inc");

// Extension Direct Mail Subscription; enthält Konfiguration; wird eventuell nicht gebraucht(?)
require_once(t3lib_extMgm::extPath('direct_mail_subscription').'pi/class.dmailsubscribe.php');

## Die Konfiguration von Direct Mail Subscription holen

$conf = $GLOBALS['TSFE']->tmpl->setup['plugin.']['feadmin.']['dmailsubscription.'];

In dieser Konfiguration ist unter Anderem der Pfad zum Template der Anmeldung kodiert, welche von feAdmin benötigt wird. Falls das Template nicht gefunden wird, so kann man den Pfad auch korrigieren:

$conf['templateFile'] = "../../../".$conf['templateFile'];

## Die richtigen Post-Variablen nutzen

Die init Methode der fe\_admin wird sich $\_POST[&#8218;FE&#8216;] Daten holen, um mit diesen zu arbeiten. Dabei ist in zweiter Ebene des Arrays die Tabelle codiert, in der die Daten gespeichert werden. Der Schlüssel dritter Ebene repräsentiert nunmehr das DB Feld. Folgende Post-Variablen sollten beim Abschicken des Formulars mitgeschickt werden, ansonsten können sie auch in PHP mit eigenen Werten belegt werden.

// Name des Newsletterempfängers
$_POST['FE']['tt_address']['name'];

// Emailadresse
$_POST['FE']['tt_address']['email'];

// Sollen HTML Mails empfangen werden?
$_POST['FE']['tt_address']['module_sys_dmail_html'];

## Objekt von user_feAdmin erzeugen und Konfiguration übergeben

$ua = new user_feAdmin();

$ua->cObj = t3lib_div::makeInstance('tslib_cObj');

$ua->init($content,$conf);

Die Variable $content kann laut [Class Reference von feAdmin][5] weggelassen werden (leerer String).

Mit dem Ausführen der init-Methode werden alle nötigen Prozesse angestoßen, welche zur Newsletteranmeldung benötigt werden.

### Beispiel

Hier nochmal ein Codeblock mit allen benötigten Schritten: [Beispiel][6]

### Kommentare?

**Falls jemand eine einfachere Implementation kennt oder sonstige Hinweise zu meinem Vorschlag hat, der poste doch bitte einen Kommentar :)** 

### Hinweise

_Noch zwei letzte Hinweise, falls keine Bestätigungsmail verschickt wird:_

Es kann u.A. daran liegen, dass das Template für [Direct Mail Subscription][4] nicht gefunden wird. Der Rückgabewert der init-Methode gibt meistens einen guten Aufschluss über den Status und eventuelle Fehler. Einfach mal in ner Variable ablegen und ausgeben (per echo, var_dump etc).

Per getcwd() kann man außerdem per PHP prüfen, in welchen Verzeichnis das aktuelle Script ausgeführt wird. Hilft beim Testen ob der Pfad zum Template File stimmt.

 [1]: http://typo3.org/extensions/repository/view/direct_mail_subscription/1.1.0/ "Seite der Extension auf Typo3.org besuchen (öffnet neues Fenster)"
 [2]: http://typo3.org/documentation/document-library/extension-manuals/th_mailformplus/4.0.5/view/1/5/#id3823153 "Dokumentation der saveUserFunc auf Typo3.org in neuem Fenster öffnen"
 [3]: http://typo3.org/documentation/document-library/extension-manuals/th_mailformplus/4.0.5/view/1/5/#id3823153
 [4]: http://typo3.org/extensions/repository/view/direct_mail_subscription/1.1.0/
 [5]: http://doc-typo3.ameos.com/4.1.0/classuser__feAdmin.html "Class Reference von feAdmin  öffnen"
 [6]: http://mediavrog.net/blog/wp-content/uploads/2008/03/example_newslettersub.txt "Beispiel"