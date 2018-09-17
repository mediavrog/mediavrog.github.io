var CheckedListBox = new Class({
    Implements: [Options],

    options: {
        replaceOriginal: false
    },

    initialize: function(input, opt)
    {
        // we need select element with mutliple enabled
        if(input.get("tag") == "select" && $chk(input.get("multiple")) )
        {
            this.setOptions(opt);

            var aliasOptions = $A(input.options).map(function(el){

                var chb = new Element("input", {
                    type: "checkbox",
                    checked: el.selected
                });

                if(this.options.replaceOriginal)
                {
                    chb.setProperties({
                        value: el.value,
                        name: input.name
                    }).addEvent("change", function(){
                        this.checked ? this.getParent("label").addClass("cidsi-checked") : this.getParent("label").removeClass("cidsi-checked");
                    });
                }else{
                    chb.addEvent("change", function(){
                        el.selected = this.checked;
                        this.checked ? this.getParent("label").addClass("cidsi-checked") : this.getParent("label").removeClass("cidsi-checked");
                    });
                }

                return new Element("li").adopt( new Element("label", {
                    title: el.text,
                    text: el.text
                }).addClass(chb.getProperty("checked")?"cidsi-checked":"").grab(chb, "top") );
                
            }.bind(this));

            this.alias = new Element("ul", {
                "class": "cidsi",
                styles: $merge(input.getStyles("width", "height", "float", "margin", "padding"), {
                    "overflow": "auto",
                    "list-style": "none"
                })
            }).adopt(aliasOptions);

            if(this.options.replaceOriginal)
            {
                this.alias.set("id", input.id).replaces(input);
            }
            else
            {
                this.alias.set("id", input.id+"_cidsi").inject(input, "after");

                input.addEvent("change", function(){
                    this.getElements("option").each(function(el){
                        aliasOptions[el.index].getElement("input").checked = el.selected;
                    })
                })

                input.setStyles({
                    position: "absolute",
                    left: -99999,
                    opacity: 0.001
                }).set("tabindex", -1);
            }

            // fix ugly ie behaviour with checkboxes and change event
            // read http://www.quirksmode.org/dom/events/change.html
            if(Browser.Engine.trident){
                this.alias.getElements("label, input").addEvent("click", function(){this.blur()});
            }
        }
    },

    toElement: function(){
        return this.alias;
    }
});
