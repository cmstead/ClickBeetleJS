(function(document, $){

    var ClickBeetle = function(document, $){
        this.init();
    };

    ClickBeetle.prototype = {
        $menus: [],
        $newFocus: false,
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

        coreBindings: function($menu){
            var children = $($menu).children(),
                lastChild = children[children.length - 1],
                anchors = $($menu).find('a'),
                firstAnchor = anchors[0];

            //Focus actions
            $($menu).find('a').bind("focus", this.focusAction);
            $(lastChild).bind("focus", this.focusAction);

            //Blur actions
            $(firstAnchor).bind("blur", this.blurAction);
            $(lastChild).bind("blur", this.blurAction);
        },

        hoverBindings: function($menu, $index){
            var $this = this;

            $($menu).bind("mouseenter", function(e){
                $this.focusAction(e);
            });

            $($menu).bind("mouseleave", function(e){
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

        focusAction: function(event){
            var $target = event.target;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }

            if(!$($target).hasClass("show")){
                $($target).addClass("show");
            }

            while($($target).hasClass("hide")){
                $($target).removeClass("hide");
            }

            this.$newFocus = true;
        },

        blurAction: function(event){
            var $target = event.target;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }

            while($($target).hasClass("show")){
                $($target).removeClass("show");
            }

            if(!$($target).hasClass("hide")){
                $($target).addClass("hide");
            }
        }

    }

    $(document).ready(function(document, $){
        clickbeetle = new ClickBeetle(document, $);
    });

})(document, $);