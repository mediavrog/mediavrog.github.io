/*
SmartTabs 0.8 - semantic Tabbing with mootools
by Maik Vlcek (http://www.mediavrog.net) - MIT-style license.
Copyright (c) 2007 Maik vlcek

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var tabs = new Class({
						
	initialize: function(props){
		
		this.props = Object.extend({
			scope: "body",
			baseulSelector: ".tabbed",
			contentSelector: ".tabContent",
			togglerSelector: ".tabToggler",
			activeTabClass: "activeTabToggler",
			firstTabClass: "firstTab",
			insertAsListItem: false,
			insertInto: false,
			addJsFlag: false,
			onActive: false,
			onBackground: false,
			showTabAtStart: 0
		}, props || {});

		this.baseul = this.props.scope?$E(this.props.scope+" "+this.props.baseulSelector):$E(this.props.baseulSelector);
		this.tabcontents =  this.props.scope?$ES(this.props.scope+" "+this.props.contentSelector):$ES(this.props.contentSelector);
		this.tabtogglers =  this.props.scope?$ES(this.props.scope+" "+this.props.togglerSelector):$ES(this.props.togglerSelector);

		if(this.tabtogglers != "" && !this.isReady){
			// Set js flag if set for advanced css styling and unobstrusiveness ;) */
			this.props.addJsFlag?$E("body").addClass("json"):"";
			
			// hide original tabcontents
			this.tabcontents.each(function(el,i){el.setStyle("display","none").addClass("tab"+i);});
			
			// create container for active content
			this.tabcontainer = new Element(this.props.insertAsListItem || 'div').setProperties({'class':'tabContainer'});
					
			// sets classes for first element
			this.lastactive = this.tabtogglers[this.props.showTabAtStart].addClass(this.props.activeTabClass).addClass(this.props.firstTabClass);
			
			// display first tabs content
			this.tabcontainer.setHTML(this.tabcontents[this.props.showTabAtStart].innerHTML);
			
			// insert container into target
			var target = this.props.insertInto?$E(this.props.insertInto):$E(this.props.scope);
			this.tabcontainer.injectInside(this.props.insertAsListItem?this.baseul:target);
			
			// add behaviours to togglers
			this.initBehaviours.bind(this)();
			
			// initialize tab-toggling Links
			this.setLinkToggler();
			
			// call onActive function if set
			this.props.onActive?this.props.onActive.attempt(this.tabcontainer):"";
			
			this.isReady = true;
		}
		
		return false;
		
	},
	
	initBehaviours: function(){
		this.tabtogglers.each(function(el,i){el.setStyle("cursor","pointer").onclick = this.switchTabs.pass([this.tabtogglers[i],i],this)}.bind(this));
		this.activeTogglerID = 0;
	},
	
	setLinkToggler: function(){
		
		// tab-toggling links
		$ES('a.nextTab', this.tabcontainer).each(function(el,i){
			var tab = el.href.split("#tab");
			el.onclick = this.switchTabs.pass(this.tabtogglers[tab[1]] || this.tabtogglers[this.activeTogglerID+1],this);
		}.bind(this));
	},
	
	switchTabs: function(toggler,togglerid){
		
		if(this.lastactive){
			this.lastactive.removeClass(this.props.activeTabClass);
			this.props.onBackground?this.props.onBackground.attempt(this.tabcontainer):"";
		}
		
		this.activeTogglerID = togglerid;
		toggler.addClass(this.props.activeTabClass);
		this.lastactive = toggler;
		
		this.tabcontainer.setHTML($E(this.props.contentSelector,toggler).innerHTML);
		
		// initialize tab-toggling links
		this.setLinkToggler();
		
		this.props.onActive?this.props.onActive.attempt(this.tabcontainer):"";
				
		return false;
	}					
});