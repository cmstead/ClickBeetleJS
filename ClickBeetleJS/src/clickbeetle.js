(function(document, $){

    var ClickBeetle = function(document, $){
        this.init();
    };

    ClickBeetle.prototype = {
        $menus: [],
        $newFocus: false,

        init: function(){
            var index = -1;
            this.$menus = $(document).find(".clickbeetle-menu");

            while(typeof this.$menus[++index] !== "undefined"){
                this.appendTabElement(this.$menus[index]);
                this.bindings(this.$menus[index]);
            }
        },

        bindings: function($menu){
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

        appendTabElement: function($menu){
            $($menu).append("<div tabindex=\"0\"></div>");
        },

        focusAction: function(event){
            var $target = event.target;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }

            if(!$($target).hasClass("show")){
                $($target).addClass("show");
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
        }
    }

    $(document).ready(function(document, $){
        clickbeetle = new ClickBeetle(document, $);
    });

})(document, $);