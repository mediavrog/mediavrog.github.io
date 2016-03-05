---
layout: post
title: 'Javascript Framework mootools 1.1 released / draußen'
published: true
author: admin
comments: true
date: 2007-05-29 03:05:57
tags:
    - Ajax (AJ)
    - DOM
    - framework
    - javascript
    - mootools
    - version
categories:
    - mootools
image:
    thumb: mootools.jpg
---
> Nach mootools 1.0 ist nun die überarbeitete Version **_mootools 1.1_** draußen.



Wie üblich haben die Entwickler wieder mächtig an der Performance-Schraube gedreht und bieten nun (für unterstützende Browser) native **XPath-Unterstützung** beim Zugriff auf DOM-Elemente.

## Nützliche Links: 

[Roadmap zu mootools][1]

[Dokumentation zur aktuellen mootools Version][2]

[Was ist neu an mootools 1.1?][3]



## Für die Hartgesottenen, der Changelog:

`ADD: Added Number.js, with Number::times, ::limit, ::round and Number prototypes from String.js (jank, tomocchino, kamicane)
ADD: Added generics for native objects, Element and Elements (digitarald)
ADD: Added Element::cloneEvents to copy events from another element (digitarald)
ADD: Dom.js Filters made Public, as Elements Methods (Elements::filterByTag, filterByClass, filterById, filterByAttribute) (kamicane)
ADD: Added $defined to Core.js, returns true for objects that are not null/undefined (digitarald)
ADD: Added offset option to Fx.Scroll, also used in SmoothScroll (w00fz)
ADD: Added delay argument to Element::fireEvent
ADD: Added Hash::merge, merges objects into the Hash (kamicane, aaron)
ADD: Added Hash.Cookie, extends Hash to save/load a Hash via Json to/from a cookie, with autoSave or manual. (aaron, digitarald, kamicane)
ADD: Added window.webkit419 and window.webkit420 to differentiate between current safari and newer builds of webkit. (kamicane)
ADD: Added secure option for Json.evaluate, used in Hash.Cookie and in options for Json.Remote (aaron)
ADD: Added document.head to hold a shortcut to the  element (kamicane)
ADD: Fx.Transitions allows now configurable transitions parameters for effects (kamicane)
ADD: Added Element::injectTop to inject Elements as first child (digitarald)
ADD: Added String::contains, which checks occurence of string, second parameter is an optional seperator. (kamicane)
ADD: Added String::escapeRegExp, escapes expression characters in string (digitarald)
ADD: Added Cookie option: secure for secure connections (digitarald)
ADD: Added Element::empty, trashes all child elements and sets innerHTML to '' (aaron)
ADD: Drag.Base grid option, for snap-to-grid movement, also accepts an object with the usual x/y values. (kamicane)
ADD: Slider with offset option for exact knob position (kamicane)
ADD: Added Element::removeProperty (kamicane)
ADD: Element::getStyle: Full paddings/margins/borders support, correct width/height for ie. (kamicane)
ADD: Added simple Abstract, to automatically add .extend to objects. Converted singletons to Abstract (Inviz)
ADD: Added global MooTools object, with version property
ADD: Added Array::getLast and getRandom (digitarald, kamicane)
ADD: Accordion now allows you to add elements to it after its creation (addSection) (aaron)
ADD: Added Group class to collect events from several class instances (kamicane)
ADD: Garbage.trash automatically cleans up the internal $tmp property for elements and fires 'trash' before cleaning elements
ADD: Implemented custom events, with some defaults as mouseenter, mouseleave and converted domready to a custom event (kamicane)
ADD: Added Array::merge and Array::include (similar to extend/push but with duplicate check) (kamicane)
ADD: Ajax::evalScripts with global eval and automated eval for javascript response, can be forced with evalResponse , added Ajax::getHeader (digitarald)
ADD: XHR now has a 'cancel' method, the option 'autoCancel' and the running property for active requests (digitarald, kamicane)
ADD: UrlEncoding moved from Ajax to XHR to allow get/post encoding for Xhr/Json.Request (digitarald, kamicane)
ADD: Added Element::hasChild() (kamicane)
ADD: DEPRECATED: Ajax: postBody renamed in data. It now works also with method=get. Compatibility is kept until v1.2 (kamicane)
ADD: Added $time (Utility.js) to return the current timestamp [#90] (Inviz)
ADD: Dom.js now uses Xpath if supported (window.xpath property), including selector caching and duplicate check
ADD: setOptions accepts now any number of arguments, this.options holds the default values (Inviz, kamicane)
ADD: f1-f12 keys for Event.key [#70] (Inviz)
ADD: Added Element::set, Element constructor now takes this argument, an object for setting 'styles', 'properties' and 'events' (ibolmo)
ADD: Added $merge, merging objects recursively (aaron)
ADD: Added Element::getStyles() (aaron)
ADD: $each iterates objects and arrays (aaron)`

`CHG: Fx.Scroll now stops if there's a scroll on the entire document, instead of the relevant element as before. (kamicane)
CHG: Class::implement now takes multiple arguments. (kamicane)
CHG: Merged Moo.js and Utility.js, now the file is Called Core.js, and does not contain Class. Class.js has now its own file, renamed Common.js in Class.Extras.js. (kamicane)
CHG: Added Elements contstructor to avoid directly calling $extend. (kamicane)
CHG: Splitted Dom.js in Element.Selectors and Element.Filters. Removed Dom.js (kamicane)
CHG: Garbage.trash event is now added beforeunload event to ensure its the last unload event to be called. (kamicane)
CHG: Elements methods overridden from Array methods in $$ are now added back with "Elements" appended to the name (e.g. Elements::removeElement, Elements::getLastElements). (kamicane)
CHG: Optimized Fx.Base to take advantage of the new Transition system so the transitions calculation is made only once per cycle, no matter the properties (tomocchino)
CHG: Refactord over-checks for Drag::Move, fires over/drop now only for the last element on the stack, not for all hovered elements (digitarald)
CHG: API CHANGE window.khtml to window.webkit. window.khtml is still kept for compatibility until 1.2.
CHG: String::capitalize doesn't force the string to lowerCase anymore. (kamicane)
CHG: API CHANGE: Completely refractored Fx.Transitions and changed API. It's now better, cleaner, smaller, more modular and a bit faster. Also added the set property, to allow configurable transitions parameters for effects. Refer to the docs to see how it works. Old transition syntax is kept until v1.2 (blame kamicane)
CHG: Refractored Element::getStyle. Now smaller, safer, better, up to 40% faster. (kamicane)
CHG: API CHANGE Array::test is now Array::contains. Compatibility is kept till 1.2 (kamicane)
CHG: API CHANGE: Hash::empty now clears the Hash values (kamicane)
CHG: Drag.Base, return this to Drag::attach/detach (kamicane)
CHG: Behavior of fixed tooltips is different, is not anymore relative to the mouse position, but to the element position.
CHG: Element::inject allows 'top' (digitarald)
CHG: $type does now recognize 'regexp', 'collection', 'arguments', 'class' [#163] (kamicane, digitarald)
CHG: API CHANGE: Hash::each callback arguments are now (value, key) to be consistent with all each's (blame digitarald)
CHG: API CHANGE: Object.extend is now $extend, compatible till v1.2
CHG: API CHANGE: Object.native is now $native, compatible till 1.2
CHG: Renamed internal element properties with prepended $ ($events, $included) (digitarald)
CHG: Cookie.remove with paths and domains [#127] (kamicane)
CHG: Added $pick to bind argument in Function::create, to allow null binds (kamicane)
CHG: Added set and get Property cases for the attribute 'for' [#48] (kamicane)
CHG: Event.js mouse events now respond also to menu types and all click types (including dblclick) (kamicane)
CHG: Moved Event.js to Element.Event.js (kamicane)
CHG: Splitted Element.js in Element, Element.Dimensions and Element.Form, moved Files from Addons to Core/Native/Plugins (kamicane)
CHG: Fast Element.walk for getNext/Previous/Last/First (Inviz)
CHG: onProgress of Asset.Images is now binded to the current image and the index is passed. (kamicane)
CHG: In Event class keys are now only computed for 'keydown' (kamicane)
CHG: Element::setStyle does not require anymore "+ 'px'", automatically added to number values (kamicane)
CHG: API CHANGE window.onDomReady is no more. use window.addEvent('domready', fn). Compatible till 1.2
CHG: Window.Base.js renamed to Window.DomReady.js
CHG: Tips now use 'mouseenter' and 'mouseleave' instead of 'mouseover' and 'mouseout' (kamicane)
CHG: Moved 'get' fallback from Ajax to XHR (kamicane)
CHG: Garbage.trash now take as input an array of elements (kamicane)
CHG: Event onStateChange in XHR is gone (kamicane)
CHG: Garbage.unload is now Garbage.empty (kamicane)
CHG: Hash.remove now use delete operator, and Hash.each uses $each (digitarald)
CHG: Cookie has now Cookie.options, duration is false by default [for sessions] (digitarald)
CHG: Sortables are now independent from Drag.Base, also have their own ghosting behaviour (kamicane)
CHG: Element.setStyle also supports float now (kamicane)
CHG: Fx.Slide allows borders and margins. Positioning is now possible. (kamicane)
CHG: Ajax.request can take data as first argument to override options [#69] (Inviz)
CHG: Element.adopt allows multiple arguments including element collections [#71] (Inviz)
CHG: API CHANGE ? Removed new Element in adopt, inject and replaceWith, now only id's and element references are allowed (kamicane)
CHG: Fixed Element.getValue/Element.toQueryString with support for multiple-selects (digitarald)`

`FIX: WONTFIX: The Event::wheel is inverted for all opera version prior to 9.20, blame opera for their crazy idea
FIX: Fixed event conditions for out cases in Drag::Move, now 'emptydrop' is also called for draggables dropped outside of the container (digitarald)
FIX: Small fixes to Drag.Move, when position of element is absolute inside relative or absolutely relative. (kamicane)
FIX: IE-fix for Element::getProperty, so it does not return properties instead of attributes anymore (digitarald)
FIX: Fixed Element::clone to remove events from elements cloned with IE (digitarald)
FIX: Now XHR reinstantiates its transport when canceled, to avoid the delay in request. (kamicane)
FIX: Element::getStyle fixes for internet explorer, when it returned "medium" or "auto" on margins and paddings when not defined.  (kamicane)
FIX: Added nullification of elements in Garbage.trash (digitarald)
FIX: Fixed mozilla bug that throws exceptions with input / textarea elements and Event related Targets. (fix by atany)
FIX: Pixel properties are now rounded in Effects, for a (slightly) better display. (kamicane)
FIX: String-type check for Json.evaluate, returns false for non-string parameters now (digitarald)
FIX: Fixed SmoothScroll and Window.Size to support newer builds of webkit. (kamicane)
FIX: Array::remove now also works with null/undefined/0
FIX: Fixed several bugs with Assets.image and Assets.images, cleaner and better behaviour (digitarald)
FIX: Better behvaiour for Fx.Scroll::toElement [#169] (Yuffster)
FIX: Couple of fixes to the Color class, now it also carries hex values. (kamicane)
FIX: String::toInt fixed [#125]
FIX: SmoothScroll now sets hash, not href [#149] (digitarald)
FIX: Fixed the drag bug about the element getting stuck to the cursor when right-clicking or clicking outside of the window [#84] (kamicane)
FIX: little fix for $each, provided default binding (kamicane)
FIX: Fixed domready problem in secure sites [#139]
FIX: Element::setOpacity with opacity/clear-type workaround for ie, when you are too lazy to put a bg-color (digitarald)
FIX: Fixed Safari relatedTarget for Text Nodes issue (kamicane)
FIX: Event.keyCode can also be 0 (kamicane)
FIX: Element::toQueryString takes empty values into account [#105] (kamicane)
FIX: Fixed a bug in Asset.image, the property to the object and only once (kamicane)
FIX: Fixed a bug in Element::getElements to avoid potentially return of duplicates (kamicane)
FIX: Fixed a possible warning in Array::remove (kamicane)
FIX: Fixed flickering in Sortables (kamicane)
FIX: $$ does not returns duplicate entries anymore (kamicane)
FIX: Exposed HTMLElement in safari, everything is now a lot faster (kamicane)
FIX: Array iterations in Array.js optimized (digitarald)
FIX: Accordion now resets paddings and margins (kamicane)
FIX: Optional isSuccess in XHR with correct this (kamicane)
FIX: Element was not extended in SmoothScroll [#45] (chris)
FIX: Fixed a bug in Fx.Slide() causing an error in Safari when first calling show() or hide() (Chris)
FIX: Fixed object key names not encoded correctly if they contained the " or \ special characters, in Json.toString (Chris)
FIX: PERL-Syntax for regexp in Json.toString for better perfomance (Chris)
FIX: Fixed Array methods behaviour [#43] (Chris)
FIX: Several minor documentation errors fixed and more examples
FIX: Several missing dependancies fixed`

 [1]: http://dev.mootools.net/roadmap?show=all "Mootools Roadmap öffnen"
 [2]: http://docs.mootools.net/ "Dokumentation von mootools ansehen"
 [3]: http://dev.mootools.net/wiki/whatsNew "Infos zu mootools öffnen"