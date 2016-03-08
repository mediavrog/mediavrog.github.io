/*
customFormElements 1.0 - style checkboxes and radiobuttons on your own
by Maik Vlcek (http://www.mediavrog.net) - MIT-style license.
Copyright (c) 2007 Maik vlcek

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var customFormElements = new Class({
	
	initialize: function(props){
		
		this.props = Object.extend({
			scope: false,
			check: true,
			radio: true
		}, props || {});
		
		if(this.props.check == true){
			//console.log("call customCheckboxes");
			$ES("input[type=checkbox]",this.props.scope || document.body).each(function(el,i){
			
				var pos = el.getPosition();
				
				var jschb = new Element("div",{
							"styles":{
								position: "absolute",
								top: pos.y-3,
								left: pos.x
							},
							"class": "jsCheckbox"}).injectInside(document.body);
				
				jschb.addEvents({"mouseover":this.cbHover.bind(jschb),"mouseout":this.cbMouseOut.bind(jschb),"click":this.cbClicked.pass(el,jschb)});
	
				if(el.checked){jschb.addClass("jsCheckboxChecked");}
				el.setStyle("visibility","hidden");
				
			}.bind(this));
		}
		
		if(this.props.radio == true){
			//console.log("call customRadiobuttons");
			$ES("input[type=radio]",this.props.scope || document.body).each(function(el,i){
			
				var pos = el.getPosition();
				
				var jschb = new Element("div",{
							"styles":{
								position: "absolute",
								top: pos.y-3,
								left: pos.x
							},
							"class": "jsRadiobutton"}).injectInside(document.body);
				
				jschb.addEvents({"mouseover":this.rbHover.bind(jschb),"mouseout":this.rbMouseOut.bind(jschb),"click":this.rbClicked.pass(el,jschb)});
	
				//console.log(el.checked);
				if(el.checked){jschb.addClass("jsRadiobuttonChecked");}
				el.setStyle("visibility","hidden");
				
			}.bind(this));
		}
	},
	
	cbHover: function(){this.addClass("jsCheckboxHover");},
	cbMouseOut: function(){	this.removeClass("jsCheckboxHover");},
	cbClicked: function(el){
		if(el){
			if(el.checked){
				el.removeProperty("checked");
				this.removeClass("jsCheckboxChecked");
			}
			else{
				el.checked = "true";
				this.addClass("jsCheckboxChecked");
			}
		}
	},
	
	rbHover: function(){this.addClass("jsRadiobuttonHover");},
	rbMouseOut: function(){	this.removeClass("jsRadiobuttonHover");},
	rbClicked: function(el){
		if(el){
			if(el.checked){
				el.removeProperty("checked");
				this.removeClass("jsRadiobuttonChecked");
			}
			else{
				el.checked = "true";
				this.addClass("jsRadiobuttonChecked");
			}
		}
	}
});