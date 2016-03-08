---
layout: post
title: 'CSS Sprites - Webseiten Performance 1'
published: true
comments: true
date: 2010-02-16 12:02:06
tags:
    - animation
    - clipping
    - performance
    - sprites
    - yslow
categories:
    - css
permalink: /2010/02/16/css/css-sprites-webseiten-performance-1
image:
    thumb: thumb.png
---
> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  *][11] &#8211; Analyse der Seitenperformance
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  *][11] &#8211; Analyse der Seitenperformance
  *][12] / Web Developer Tools /Opera DragonFly / &#8230; (je nach Browser) &#8211; Analyse der Ladezeiten aller Webseitenelemente
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  *][11] &#8211; Analyse der Seitenperformance
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  * [> CSS Sprites sind ein sehr gutes Mittel zur Verringerung der Ladezeiten von Webseiten. Dennoch scheuen viele Entwickler noch den Einsatz von CSS Sprites, da fehlende Erfahrung beim Erstellen viel Zeit kosten und den Performancegewinn zunichte machen kann. In diesem Artikel möchte ich gängige Verfahren und Ansätze darstellen, um übliche Fehler zu vermeiden. Ich möchte dem Leser damit die Fähigkeit vermitteln, die richtigen Entscheidungen zum Einsatz von CSS Sprites treffen zu können.



## Was sind CSS Sprites?

Eine knappe Einführung noch vorweg, für alle die mit dem Begriff per se (noch) nichts anfangen können:
  
Sprites sind (Bild-)Dateien, in denen viele Bilder nebeneinander angeordnet sind. Bei der Darstellung eines Sprite wird aber immer nur ein Ausschnitt gezeigt, während die anderen Bilder verborgen bleiben (_maskiert_). Beim Verschieben der Grafik im Hintergrund wird ein weiterer Teil sichtbar. Animiert man die Position des Hintergrundbildes, kann so der Eindruck von Bewegung entstehen. Diese Technik entstammt der Computerspielindustrie, wo sie bereits seit Jahrzehnten eingesetzt wird. [Genaueres zu Sprites im Allgemeinen findet sich in der Wikipedia.][1]


  
  
  
    Kirby Idle Animation by hextupleyoodot - Thanks
  



  
  
  
    Die Einzelbilder der Kirby Idle Animation by hextupleyoodot
  


(thanks to [hextupleyoodot][2])

**CSS Sprites** nutzen ebenfalls eine Bilddatei, in der mehrere Einzelbilder enthalten sind, aber meist nicht zum Zwecke der Animation. Vielmehr werden sie als Hintergrundbild vieler Elemente referenziert, wobei durch Angabe der Position das gewünschte Bild dargestellt wird.


  
    CSS Sprites kommen vor allem für kleinere Grafiken und Hintergrundgrafiken zum Einsatz, welche auf einer Webseite zur Gestaltung eingesetzt werden. Diese Technik eignet sich für Designelemente und nicht für inhaltsbezogene Bilder wie Fotos.
  


### Wie funktionieren CSS Sprites genau?

Das folgende **Beispielbild** enthält mehrere Zustände einer Auswahlbox. Anstatt per :hover, :focus etc. die Bilder auszutauschen, habe ich sie in ein Bild gepackt (>> CSS Sprite). Sie sollen nun als Hintergrundbilder eines HTML-Elements zum Einsatz kommen. Mittels CSS wird dabe das Sprite als background-image zugewiesen. Der Trick besteht nun darin, für jeden Status des Elements die passende background-position zu definieren. Damit wird das Sprite unter dem Element so positioniert, dass die gewünschte Teilgrafik sichtbar wird.

#### Beispiel für die Verwendung von CSS Sprites


  


#### Das passende CSS

.checkbox{
  background: url(checkboxes.png) no-repeat 0 0;
  height: 25px;
  width: 25px;
}

.checkbox.checked{
  background-position: 0 -40px;
}

.checkbox:focus{
  background-position: 0 -80px;
}

[...]

[Demo (customformelements.net)][3]{.button}

* * *

**Auf der nächste Seite werden Vor- und Nachteile für den Einsatz von CSS Sprites dargestellt.**
  
 

## Warum CSS Sprites?

Die Vorteile, mehrere Grafikressourcen in einer zusammenzustellen, lassen sich wie folgt zusammenfassen:

weniger HttpRequests
:   Beim Herunterladen und Parsen einer Seite suchen Clients (Browser) u.A. alle extern referenzierten Ressourcen zusammen und laden sie. Dazu werden die benötigten HttpRequests oftmals parallelisiert (meist 2 bis 4 Requests gleichzeitig), um den Seitenaufbau zu beschleunigen. Jeder Verbindungsaufbau bringt aber eine gewisse Latenz und Overhead mit sich (Header-Daten/..). Zudem können sie bei voller Auslastung der Queue den Seitenaufbau blockieren. Durch das Zusammenführen vieler Bilder in eine Datei verbessert sich das Verhältnis zwischen Nutzdaten und Metadaten, und Latenzen durch viele HttpRequests werden vermieden (da nur noch ein Request für eine Menge von Bildern benötigt wird).

bessere Kompressionsrate
:   Weiterhin kann die Gesamtdateigröße eines Sprites im Vergleich zu den einzelnen Bildern sinken, da Metadaten (Grafk Headerinformationen) nur noch einmal vorhanden sind und Kompressionsalgorithmen alle Bilder mitverarbeiten. Dies gilt vor allem für Sprites, bei denen die Einzelbilder in einem möglichst kleinen Abstand zum Nächsten angeordnet sind. CSS Sprites sind aber auch durch Leerräume gekenzeichnet, welche die Dateigröße erhöhen können.

## Nachteile / Kontraindikationen

primär anwendbar für Hintergrundgrafken
:   CSS Sprites sind vor Allem für die Verwendung als Hintergrundgrafk geeignet, da sich die Positionierung mittels CSS einfach realisieren lässt. Theoretisch wäre auch eine Lösung per img-Tag in Verbindung mit der CSS Eigenschaft clip denkbar; diese Variante ist aber bei vielen Bildern nicht praktikabel.

Bedingt geeignet für sich wiederholende Hintergrundbilder
:   Da in CSS Sprites (je nach Aufbau) viele Einzelbilder nebeneinander und/oder übereinander befinden und das Sprite eine gewisse Breite besitzt, lassen sich wiederholende Hintergrundbilder (repeat-y / repeat-x und Einzelbilder nicht praktikabel in **einem einzelnen** Sprite kombinieren.

evtl. hoher Arbeitsspeicherbedarf
:   Obwohl das Bild komprimiert gespeichert wird, kann der Client natürlich nicht komprimiert darstellen. Er lädt das Bild Pixel für Pixel in den Arbeitsspeicher, was bei großen, schlecht optimierten Sprites schnell viele MB belegen kann. Größenordnungen von 50 MB sind dabei keine Seltenheit &#8211; So nimmt ein 1000 x 10.000 Pixel großes Bild mit Alphakanal bereits um die 40 MB Arbeitsspeicher ein.

* * *

**Auf der nächste Seite wird erklärt, wie CSS Sprites erstellt und eingesetzt werden und wie den erwähnten Nachteilen entgegnet werden kann.**
  
 

## Erstellen von Sprites

Sprites können halbautomatisiert oder manuell erstellt werden.


  
    Als Faustregel für die ersten Projekte mit dem Einsatz von CSS Sprites gilt: Setze das Design ersteinmal OHNE Sprites in (X)HTML/CSS um. Danach lassen sich die benötigten Elemente für ein Sprite leichter identifizieren und in einer Grafik setzen. Dieser Ansatz spart Entwicklungszeit, da sich vorerst nicht um die Positionierung des Sprites gesorgt werden muss und gleichfalls im Prozess anfallende grafische Änderungen schneller umgesetzt werden können. Auch für Fortgeschrittene kann dieser Weg aufgrund der angesprochenen Zeitersparnis und erhöhter Flexibilität geeignet sein.
  


### halbautomatisierte Erstellung

Für die halbautomatisierte Erstellung von CSS Sprites existieren verschiedene Tools. Ein Vertreter ist das Bookmarklet von [SpriteMe,][4] welches vor allem für Einsteiger hilfreich sein oder schnelle Optimierungen ermöglichen soll. Es hilft beim Identifizieren von verwendeten Hintergrundbildern einer Seite und der Erstellung von Sprite und CSS. Dabei werden wie oben erwähnt, sich wiederholende Hintergrundbilder ausgeschlossen. (Details zu SpriteMe sind auf  nachzulesen).

Soweit ganz praktisch,.. Doch leider zeigt sich schnell, dass ohne manuelles Eingreifen kein gutes Ergebnis erzielt werden kann. Ich habe mit SpriteMe zum Beispiel ein CSS Sprite meines Blogs erstellt (vorher ohne Sprite). Das Ergebnis war erschreckend: Extrem viel ungenutzter Platz sorgte für einen Anstieg der Bildgröße um 60 KB:


  
  
  
    Ergebnis-Sprite für mediavrog.net/blog
  


Dieses Resultat ist meines Erachtens nicht zufriedenstellend, da extrem viel Platz vergeudet wird. Es zeigt damit sehr gut die Grenzen der Automation bei CSS Sprites. Auch die automatische Erstellung des zugehörigen CSS wiegt in diesem Fall den Nachteil eines viel zu großen Bildes nicht auf. Weiterhin erkennt SpriteMe auch nicht automatisch, welche img-Tags eventuell noch zur Verwendung mit einem CSS Sprite umgearbeitet werden könnten (Grafik als Hintergrundbild,&#8230;).

### manuelle Erstellung

Für feinsinnige Optimierungen empfehle ich daher die manuelle Erstellung von CSS Sprites. Auch wenn dies initial mit etwas mehr Aufwand verbunden ist, kann man mit vorausschauendem Vorgehen die Vorteile von CSS Sprites hervorkehren und die Nachteile weitestgehend unterdrücken.

Die wichtigsten Punkte beim manuellen Setzen der Sprites sind:

  * [Wahl der Bilder für das Sprite][5]
  * [Festlegen von passenden Bilddimensionen][6]
  * [Wahl eines geeigneten Rasters][7]
  * [Positionierung der Bilder][8]

#### Wahl der Bilder für das Sprite {#selection}

Ein einfacher aber wichtiger Schritt besteht in der Auswahl der Bilder, welche mit Sprites eingebunden werden sollen. Erfüllt ein Bild den Großteil der folgenden **Kriterien**, so ist es sehr wahrscheinlich für den Einsatz in einem Sprite geeignet:

  * Ist das Bild ein Icon oder Logo?
  * Dient das Bild hauptsächlich der Gestaltung von Elementen?
  * Ist das Bild bereits als Hintergrund für ein Element definiert?
  * Wiederholt sich das Bild an verschiedenen Stellen der Webseite?
  * Ist das Bild kein Foto?

Die so herausgefilterten Bilder werden nun in **3 Gruppen** geteilt:

  1. **Einzelbilder**
  2. Hintergrundbilder, welche sich auf der **x-Achse** wiederholen und deren umgebendes Element eine **feste Höhe** hat
  3. Hintergrundbilder, welche sich auf der **y-Achse** wiederholen und deren umgebendes Element eine **feste Breite** hat

Bilder, welche in keine der genannten Gruppen passen, werden nun aussortiert und können nicht für in Sprites verwendet werden. Für jede Gruppe, welche mindestens 2 Bilder enthält, kann ein Sprite erstellt werden.
  
Im Falle der sich **wiederholenden Hintergrundbilder** wird nun ein Sprite mit einer Breite (repeat auf der x-Achse) bzw. Höhe (repeat auf der y-Achse) von **1 Px** erstellt. Die Bilder werden untereinander bzw. nebeneinander angeordnet. In den meisten Fällen ist dies ausreichend und es muss nur noch ein [geeignetes (vertikales) Raster][7] gefunden werden. Für **Einzelbildsprites ist der folgende Punkt zusätzlich** wichtig.

#### Festlegen von passenden Bilddimensionen für Einzelbildersprites {#dimensions}

Die richtige Wahl der Bilddimensionen ist entscheidend für die Erweiterbarkeit Effektivität des CSS Sprites. Das grundlegende **Format ist meist vertikal angelegt** (= Höhe variabel, Breite fix), was wohl in der einfacheren Bearbeitung des Bildes fußt (horizontal zu Scrollen und dabei ein Bild zu bearbeiten ist eben ungewohnt :) ).

Nun gilt es noch die **passende Breite** zu bestimmen. Sie sollte dabei je nach Anforderungen / Aufbau der Webseite mindestens so breit sein wie:

  * **die Breite der Webseite** bei fixed width Layouts, falls Hintergrundbilder über die gesamte Breite einmal benötigt werden sollten
  * die Breite des breitesten Bildes

Eventuell wird später nach rechts noch etwas Freiraum angehangen, je nachdem welches [Raster][7] im nächsten Schritt gewählt wird.

#### Wahl eines geeigneten Rasters {#grid}

Nun kommt der wichtigste Teil: für alle Bilder des Sprites muss ein passendes Raster gefunden werden.


  
    Das Raster ist ein Hilfsmittel zur leichteren Positionierung von Elementen mittels CSS. Theoretisch können die Bilder auch ohne Raster dicht an dicht gepackt werden, was die Pflege und Erweiterbarkeit des Sprites aber einschränkt.
  


Aus Erfahrung empfehle ich:

  * zuerst das kleinste Bild heraussuchen
  * a) ist es als Hintergrundbild eines Elementes eingebettet, so nimm die Abmessungen dieses Elements und runde sie auf die nächsthöhere durch 10 teilbare Zahl
  * b) runde ansonsten die Abmessungen des Bildes wie beschrieben auf

Beispiel: Es soll ein 16x16px großes Icon (das kleinste aller Bilder) in einem Sprite eingebettet werden. Es ist Hintergrundbild eines 18&#215;18 großen div&#8217;s. Das Grundraster für das Sprite wäre denmach 20 x 20 Pixel.

#### Positionierung der Bilder {#positioning}

Die Bilder werden nun so im Sprite verteilt, dass ein Bild immer an einem Vielfachen des Grundrasters ausgerichtet wird. Bilder, deren umgebendes HTML Element eine variable Breite oder Höhe hat, müssen dabei mit ausreichend Platz positioniert werden. Ist z.B. die Breite nicht fix, so muss das Bild eventuell in eine eigene Zeile gesetzt werden.

Diese Herangehensweise ermöglicht auch die kleinsten Bilder ohne viel Platzverschwendung in einem Sprite unterzubekommen. Weiterhin lässt sich beim Positionieren mittels CSS sehr einfach und schnell mit durch 10 teilbaren Zahlen rechnen. Ich habe das zuvor von SpriteMe erstellte Sprite nach den genannten Regeln manuell bearbeitet:


  
  
  
    CSS Sprite für mediavrog.net/blog - manuell gesetzt
  



  
    Das breite grüne Hintergrundbild habe ich bewusst entfernt, da es die Datei unnötig aufgebläht hat. Beide Grafiken zusammen sind nun bereits 20 kB kleiner als das von SpriteMe erzeugt CSS Sprite.
  
  
  
    Das Setzen der Grafiken erfordert etwas Erfahrung, bis die Verteilung gut gelöst werden kann. Kleine Tipps dazu:
  
  
  
    
      ähnliche Bilder in unmittelbarer Nähe positionieren und noch etwas Freiraum lassen, falls weitere Bilder dieses Typs hinzukommen (z.B. Icons)
    
    
      Platz nach rechts bzw. links bei Hintergrundbildern für Elemente mit flexibler Breite lassen
    
    
      Bilder möglichst dicht, dennoch mit etwas Abstand zueinander setzen
    
    
      Bilder, die viel/unbestimmten Platz nach rechts brauchen, am rechten Rand positionieren; entsprechend für Platz nach links
    
  
  
  
    Vergleich der beiden Ansätze
  
  
  
    Vor- und Nachteile von automatisiertem und manuellem Erstellen von Sprites 
      
      
      
      
        SpriteMe (halbautomatisch)
      
      
      
        Grafik setzen (manuell)
      
    
    
    
      
        Vorteile
      
      
      
        
          
            schnelle Erstellung von Sprites UND CSS
          
          
            keine Grafikbearbeitung nötig
          
        
      
      
      
        
          
            bessereVerteilung der Bilder
          
          
            kleinere Dateigrößen
          
          
            Positionierung mit Hinblick auf Erweiterungen
          
        
      
    
    
    
      
        Nachteile
      
      
      
        
          
            keine Möglichkeit zur Optimierung
          
          
            keine Verarbeitung von repeat-y / repeat-x Bildern möglich
          
          
            schlechte Wartbarkeit durch flexible Höhe
          
        
      
      
      
        
          
            zeitaufwendig
          
          
            Bildbearbeitungsprogramm wird benötigt
          
        
      
    
  
  
  
    
      
        Hintergrundbilder, welche sich auf der x-Achse wiederholen
      
    
  
  
  
  
  Zusammenfassung und Tools gibts auf der letzten Seite. 


## Zusammenfassung

CSS Sprites können helfen, den Seitenaufbau zu beschleunigen. Durch die verminderte Anzahl von Requests werden sowohl Client als auch Server etwas entlastet. Der schnellere Seitenaufbau und die geringeren Übertragungsvolumen steigern die User Experience. Dies wird auch und vor Allem bei mouseover- und focus-Effekten deutlich: da alle Stati bereits im Sprite enthalten sind, kommt es nicht zu den typischen Nachladeverzögerungen.

Die Erstellung der Sprites kostet dafür etwas mehr Zeit und es können meist nicht alle Grafiken in Sprites verarbeitet werden. Auch die etwas umständliche Positionierung mittels CSS erfordert initial etwas mehr Zeit aber die Nutzer werden ein schnelleres Interface und (gefühlt) verkürzte Ladezeiten schätzen :)

Zu guter Letzt setzen auch viele große Firmen auf CSS Sprites. [Beispiele dafür gibts beim SmashingMagazine][9].

### Relevante Tools

  *][10] &#8211; halbautomatisierte Spriteerstellung
  *][11] &#8211; Analyse der Seitenperformance
  *][12] / Web Developer Tools /Opera DragonFly / &#8230; (je nach Browser) &#8211; Analyse der Ladezeiten aller Webseitenelemente
  *][13] &#8211; für noch mehr Performance komprimiert der YUICompressor eure CSS und Javascript-Dateien.

**Welche Erfahrungen habt ihr im Umgang mit CSS Sprites? Setzt ihr sie in euren Projekten ein? Zeigt eure Sprites und diskutiert mit mir.**

 [1]: http://de.wikipedia.org/wiki/Sprite_%28Computergrafik%29
 [2]: http://hextupleyoodot.deviantart.com/
 [3]: http://customformelements.net/demopage.php#c1
 [4]: http://spriteme.org/
 [5]: #selection
 [6]: #dimensions
 [7]: #grid
 [8]: #positioning
 [9]: http://www.smashingmagazine.com/2009/04/27/the-mystery-of-css-sprites-techniques-tools-and-tutorials/
 [10]: http://spriteme.org
 [11]: http://developer.yahoo.com/yslow/
 [12]: https://addons.mozilla.org/de/firefox/addon/1843
 [13]: http://developer.yahoo.com/yui/compressor/