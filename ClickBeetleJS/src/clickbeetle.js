(function(document, $){

    var ClickBeetle = function(document, $){
        this.init();
    };

    ClickBeetle.prototype = {
        $menus: [],
        $timers: [],

        init: function(){
            var index = -1;
            this.$menus = $(document).find(".clickbeetle-menu");
            this.$timers.length = this.$menus.length;

            while(typeof this.$menus[++index] !== "undefined"){
                this.appendTabElement(this.$menus[index]);
                this.coreBindings(this.$menus[index]);
                this.setAttributes(this.$menus[index]);

                if($(this.$menus[index]).hasClass("hover")){
                    this.hoverBindings(this.$menus[index], index);
                } else if($(this.$menus[index]).hasClass("click")){
                    //add click binding code here.
                }
            }
        },


        /* Prepare menu for added behaviors */

        appendTabElement: function($menu){
            $($menu).append("<div tabindex=\"0\"></div>");
        },

        setAttributes: function($menu){
            $($menu).attr("role", "navigation");
            $($menu).find('a').attr("role", "menuitem");
            if(!$($menu).hasClass("hide")){
                $($menu).addClass("hide");
            }
        },


        /* Prepare all bindings */

        coreBindings: function($menu){
            var lastChild = $($($menu).children()).last();
                firstAnchor = $($menu).find('a')[0],
                $this = this;

            $($menu).find('a').bind("focus", function(e){
                $this.focusAction(e);
            });
            $(firstAnchor).bind("blur", function(e){
                $this.blurAction(e);
            });
            $(lastChild)
                .bind("focus", function(e){
                    $this.focusAction(e)
                })
                .bind("blur", function(e){
                    $this.blurAction(e);
                });
        },

        hoverBindings: function($menu, $index){
            var $this = this;

            $($menu)
                .bind("mouseenter", function(e){
                    $this.focusAction(e);
                })
                .bind("mouseleave", function(e){
                    clearTimer($index);
                    $this.$timers[$index] = setTimeout(function(){
                        $this.blurAction(e);
                    }, 200);
                });

            $($menu).children().bind("mouseenter", function(e){
                clearTimer($index);
                $this.focusAction(e);
            });

            function clearTimer($i){
                if($this.$timers[$i] !== null){
                    clearTimeout($this.$timers[$i]);
                    $this.$timers[$i] = null;
                }
            }
        },


        /* Behavior actions */

        focusAction: function(event){
            var $target = this.findMenuTop(event.target);

            this.removeAllClassInstances($target, "hide");
            this.addClassOnce($target, "show");
        },

        blurAction: function(event){
            var $target = this.findMenuTop(event.target);

            this.removeAllClassInstances($target, "show");
            this.addClassOnce($target, "hide");
        },


        /* Utility methods to make behaviors more reliable */

        findMenuTop: function(element){
            var $target = element;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }
            return $target;
        },

        removeAllClassInstances: function($target, $className){
            while($($target).hasClass($className)){
                $($target).removeClass($className);
            }
        },

        addClassOnce: function($target, $className){
            if(!$($target).hasClass($className)){
                $($target).addClass($className);
            }
        }

    }

    $(document).ready(function(document, $){
        clickbeetle = new ClickBeetle(document, $);
    });

})(document, $);