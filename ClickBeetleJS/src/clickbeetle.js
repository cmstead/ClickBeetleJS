(function(document, $){

    var ClickBeetle = function(document, $){
        this.init();
    };

    ClickBeetle.prototype = {
        $menus: [],

        init: function(){
            var index = -1;
            this.$menus = $(document).find(".clickbeetle-menu");

            while(typeof this.$menus[++index] !== "undefined"){
                this.bindings(this.$menus[index]);
            }
        },

        bindings: function($menu){
            var anchors = $($menu).find('a'),
                children = $($menu).children();

            $($menu).find('a').bind("focus", this.focusAction);
        },

        focusAction: function(event){
            var $target = event.target;

            while(!$($target).hasClass("clickbeetle-menu")){
                $target = $($target).parent();
            }

            if(!$($target).hasClass("show")){
                $($target).addClass("show");
            }
        },

        blurAction: function(){}
    }

    $(document).ready(function(document, $){
        clickbeetle = new ClickBeetle(document, $);
    });

})(document, $);