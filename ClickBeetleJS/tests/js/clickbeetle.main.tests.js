module("ClickBeetle", {
        setup: function(){},
        teardown: function(){
            while($(".clickbeetle-menu").hasClass("show")){
                $(".clickbeetle-menu").removeClass("show");
            }
        }
    });

test("should be available for use", function(){
    notEqual(typeof clickbeetle, "undefined");
});

test("should have a menu array conatining one element", function(){
    equal(clickbeetle.$menus.length, 1);
});

test("should set the menu class to show when the main link gets focus", function(){
    $($(".clickbeetle-menu").find('a')[0]).focus();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), true);
    $($(".clickbeetle-menu").find('a')[0]).focus();
});

test("should set the menu class to show when the last link gets focus", function(){
    var anchors = $(".clickbeetle-menu").find('a');
    $(anchors[anchors.length - 1]).focus();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), true);
});

