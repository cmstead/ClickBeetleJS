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
            this.$timers.length = 0;
            this.$timers.length = this.$menus.length;

            while(typeof this.$menus[++index] !== "undefined"){
                this.appendTabElement(this.$menus[index]);
                this.coreBindings(this.$menus[index]);
                this.setAttributes(this.$menus[index]);

                if($(this.$menus[index]).hasClass("hover")){
                    this.hoverBindings(this.$menus[index], index);
                } else if($(this.$menus[index]).hasClass("click")){
                    this.clickBindings(this.$menus[index]);
                }
            }
        },


        /* Prepare menu for added behaviors */

        appendTabElement: function($menu){
            $($menu).append("<div></div>");
        },

        setAttributes: function($menu){
            $($menu).attr("role", "navigation");
            $($menu).find('a').attr("role", "menuitem");
            if(!$($menu).hasClass("hide")){
                $($menu).addClass("hide");
            }
            $($menu).children().last().attr("tabindex", 0);
        },


        /* Prepare all bindings */

        coreBindings: function($menu){
            var lastChild = $($($menu).children()).last();
                firstAnchor = $($menu).find('a')[0],
                $this = this;

            $($menu).find('a')
                .unbind("focus")
                .bind("focus", function(e){
                    $this.focusAction(e);
                });

            $(firstAnchor)
                .unbind("blur")
                .bind("blur", function(e){
                    $this.blurAction(e);
                });

            $(lastChild)
                .unbind("focus")
                .bind("focus", function(e){
                    $this.focusAction(e)
                })
                .unbind("blur")
                .bind("blur", function(e){
                    $this.blurAction(e);
                });
        },

        hoverBindings: function($menu, $index){
            var $this = this;

            $($menu)
                .unbind("mouseenter")
                .bind("mouseenter", function(e){
                    $this.focusAction(e);
                })
                .unbind("mouseleave")
                .bind("mouseleave", function(e){
                    clearTimer($index);
                    $this.$timers[$index] = setTimeout(function(){
                        $this.blurAction(e);
                    }, 200);
                });

            $($menu).children()
                .unbind("mouseenter")
                .bind("mouseenter", function(e){
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

        clickBindings: function($menu){
            var $this = this,
                anchors = $($menu).find('a'),
                index = 0;

            $($menu).find('a').first()
                .unbind("click")
                .bind("click", function(e){
                    if($($menu).hasClass("hide")){
                        $this.focusAction(e);
                    } else {
                        $this.blurAction(e);
                    }
                    e.stopPropagation();
                    return false;
                });

            while(typeof (anchor = anchors[++index]) !== 'undefined'){
                $(anchor)
                    .unbind("click")
                    .bind('click', function(e){
                        $this.blurAction(e);
                        e.stopPropagation();
                        return false;
                    });
            }
        },


        /* Behavior actions */

        focusAction: function(event){
            var $target = this.findMenuTop(event.target);

            this.classRemoveAll($target, "hide");
            this.classAddOnce($target, "show");
        },

        blurAction: function(event){
            var $target = this.findMenuTop(event.target);

            this.classRemoveAll($target, "show");
            this.classAddOnce($target, "hide");
        },


        /* Utility methods to make behaviors more reliable */

        findMenuTop: function(element){
            var $target = element;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }
            return $target;
        },

        classRemoveAll: function($target, $className){
            while($($target).hasClass($className)){
                $($target).removeClass($className);
            }
        },

        classAddOnce: function($target, $className){
            if(!$($target).hasClass($className)){
                $($target).addClass($className);
            }
        }

    }

    $(document).ready(function(document, $){
        clickbeetle = new ClickBeetle(document, $);
    });

})(document, $);