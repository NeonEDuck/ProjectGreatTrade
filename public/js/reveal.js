$(window).on("load",function(){
    $(".reveal").each(function(){
        if ($(this).parents().children("p").children("span.text").length > 0) {
            var text = $(this).parents().children("p").children("span.text");
            var preHeight = text.css("height");
            text.css("height","100%");
            var maxHeight = text.css("height");
            text.css("height",preHeight);
            
            if (parseInt(maxHeight) <= parseInt(preHeight)) {
                $(this).css("background","#666");
                $(this).css("cursor","default");
                $(this).children().remove();
            }
            else {
                $(this).addClass("active")
            }
        }
        else {
            $(this).addClass("active")
            maxHeight = parseInt($(this).parents(".section").css("height")) + parseInt($(this).css("height"));
            $(this).parents().children("a").children(".section").css("display","none");
            $(this).parents().children(".button").css("display","none");
            $(this).parents(".section").css("height","184")
        }
    })
})
$(".reveal").click(function(event){
    if ($(this).hasClass("active")){
        event.preventDefault();
        if ($(this).parents().children("p").children("span.text").length > 0) {
            if ($(this).hasClass("active")){
                var text = $(this).parents().children("p").children("span.text");
                var preHeight = text.css("height");
                text.css("height","100%");
                var maxHeight = parseInt(text.css("height"));
                text.css("height",preHeight);

                if (!text.hasClass("opened")) {
                    text.addClass("opened");
                    text.stop().animate({height: maxHeight}, {duration:400, easing:'easeOutExpo'});
                    $(this).children().removeClass("fa-arrow-down");
                    $(this).children().addClass("fa-arrow-up");
                }
                else {
                    text.removeClass("opened");
                    text.stop().animate({height: "60px"}, {duration:400, easing:'easeOutExpo'});
                    $(this).children().removeClass("fa-arrow-up");
                    $(this).children().addClass("fa-arrow-down");
                }
            }
        }
        else {
            target = $(this).parents(".section");
            var maxHeight = 184;
            target.children("a").children(".section").each(function(){
                maxHeight += parseInt($(this).css("height"));
                maxHeight += parseInt($(this).css("margin-top"))
                maxHeight += parseInt($(this).css("margin-bottom"))
            })
            target.children(".button").each(function(){
                maxHeight += parseInt($(this).css("height"))
                maxHeight += parseInt($(this).css("margin-top"))
                maxHeight += parseInt($(this).css("margin-bottom"))
            })

            if (!target.hasClass("opened")) {
                target.addClass("opened");
                target.children("a").children(".section").css("display","block");
                target.children(".button").css("display","block");
                target.stop().animate({height: maxHeight}, {duration:400, easing:'easeOutExpo'});
                $(this).children().removeClass("fa-arrow-down");
                $(this).children().addClass("fa-arrow-up");
            }
            else {
                target.removeClass("opened");
                target.children("a").children(".section").css("display","none");
                target.children(".button").css("display","none");
                target.stop().animate({height: 184}, {duration:400, easing:'easeOutExpo'});
                $(this).children().removeClass("fa-arrow-up");
                $(this).children().addClass("fa-arrow-down");
            }
        }
    }
});