module("ClickBeetle setup");

test("should be available for use", function(){
    notEqual(typeof clickbeetle, "undefined");
});

test("should have a menu array conatining one element", function(){
    equal(clickbeetle.$menus.length, 1);
});

test("should append a div to the bottom of menu", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastchild = children[children.length - 1];
    equal($(lastchild).html(), "");
});

test("should place a tabindex of 0 on appended div element", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastchild = children[children.length - 1];
    equal($(lastchild).attr("tabindex"), "0");
});

test("should find top-most element of menu", function(){
    var menuTop = $(".clickbeetle-menu")[0],
        lastAnchor = $($(menuTop).find('a')).last(),
        result = clickbeetle.findMenuTop(lastAnchor);
    equal(result[0], $(menuTop)[0]);
});

test("should remove all instances of specified class from target element", function(){
    var $target = $(".clickbeetle-menu");
    for(i = 0; i < 4; i++){
        $target.addClass("test");
    }
    clickbeetle.removeAllClassInstances($target, "test");
    equal($($target).hasClass("test"), false);
});

test("should add a class name exactly once", function(){
    var $target = $(".clickbeetle-menu");
    for(i = 0; i < 4; i++){
        clickbeetle.addClassOnce($target, "test");
    }
    equal($($target).hasClass("test"), true);
    $($target).removeClass("test");
    equal($($target).hasClass("test"), false);
});

/* Accessibility enhancements */

module("ClickBeetle accessibility enhancements", {
    setup: function(){},
    teardown: function(){
        //Remove focus from all menu elements
        $("#focusable").focus();
    }
});

test("should add class 'hide' so menus show for browsers without javascript support", function(){
    var hide = $($(".clickbeetle-menu")[0]).hasClass('hide');
    equal(hide, true);
});

test("should add role=\"navigation\" to menu", function(){
    var role = $($(".clickbeetle-menu")[0]).attr("role");
    equal(role, "navigation");
});

test("should add role=\"menuitem\" to each anchor", function(){
    var anchors = $(".clickbeetle-menu").find('a'),
        anchor,
        index = -1;
    while(typeof (anchor = anchors[++index]) !== "undefined"){
        equal($(anchor).attr("role"), "menuitem");
    }
});

/* Focus interactions */

module("ClickBeetle focus interactions", {
    setup: function(){},
    teardown: function(){
        //Remove all instances of className show
        while($(".clickbeetle-menu").hasClass("show")){
            $(".clickbeetle-menu").removeClass("show");
        }
        //Remove focus from all menu elements
        $("#focusable").focus();
    }
});

test("should set the menu class to show when the main link gets focus", function(){
    $($(".clickbeetle-menu").find('a')[0]).focus();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), true);
});

test("should remove menu class 'hide' when the main link gets focus", function(){
    $($(".clickbeetle-menu").find('a')[0]).focus();
    equal(!$($(".clickbeetle-menu")[0]).hasClass("hide"), true);
});

test("should set the menu class to show when a random link gets focus", function(){
    var anchors = $(".clickbeetle-menu").find('a'),
        index = Math.ceil(Math.random() * (anchors.length - 1));
    $(anchors[index]).focus();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), true);
});

test("should remove menu class 'hide' when a random link gets focus", function(){
    var anchors = $(".clickbeetle-menu").find('a'),
        index = Math.ceil(Math.random() * (anchors.length - 1));
    $(anchors[index]).focus();
    equal(!$($(".clickbeetle-menu")[0]).hasClass("hide"), true);
});

test("should set the menu class to show when the appended div element is focused", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastChild = children[children.length - 1];
    $(lastChild).focus();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), true);
});

test("should remove menu class 'hide' when the appended div element is focused", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastChild = children[children.length - 1];
    $(lastChild).focus();
    equal(!$($(".clickbeetle-menu")[0]).hasClass("hide"), true);
});

/* Blur interactions */

module("ClickBeetle blur interactions", {
    setup: function(){
        //ensure there is one instance of show set on the menu
        if(!$($(".clickbeetle-menu")[0]).hasClass("show")){
            $($(".clickbeetle-menu")[0]).addClass("show");
        }
    },
    teardown: function(){
        while($(".clickbeetle-menu").hasClass("show")){
            $(".clickbeetle-menu").removeClass("show");
        }
        //remove focus from all menu elements
        $("#focusable").focus();
    }
});

test("should remove class 'show' from menu when main link loses focus", function(){
    var mainLink = $($(".clickbeetle-menu")[0]).find('a')[0];
    $(mainLink).focus();
    $(mainLink).blur();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), false);
});

test("should add class 'hide' from menu when main link loses focus", function(){
    var mainLink = $($(".clickbeetle-menu")[0]).find('a')[0];
    $(mainLink).focus();
    $(mainLink).blur();
    equal($($(".clickbeetle-menu")[0]).hasClass("hide"), true);
});

test("should remove class 'show' from menu when last child loses focus", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastChild = children[children.length - 1];
    $(lastChild).focus();
    $(lastChild).blur();
    equal($($(".clickbeetle-menu")[0]).hasClass("show"), false);
});

test("should add class 'hide' from menu when last child loses focus", function(){
    var children = $($(".clickbeetle-menu")[0]).children(),
        lastChild = children[children.length - 1];
    $(lastChild).focus();
    $(lastChild).blur();
    equal($($(".clickbeetle-menu")[0]).hasClass("hide"), true);
});

