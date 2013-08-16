(function(document, $){

    var clickbeetle = new function(document, $){};

    clickbeetle.prototype = {
        init: function(){
            this.$menus = $(".clickbeetle-menu");
        }
    }

    ClickBeetle = new clickbeetle(document, $);

})(document, $);