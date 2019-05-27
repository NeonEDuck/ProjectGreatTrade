var memno = document.currentScript.getAttribute("memno");

$.get( "/ejs/header.ejs", function( data ) {
    $(".header").replaceWith(data);
    if (memno == '') {
        $("li.logout").remove();
    }
    else{
        $("li.login").remove();
    }
});

$.get( "/ejs/navbar.ejs", function( data ) {
    $(".navbar").replaceWith(data);
});

$.get( "/ejs/footer.ejs", function( data ) {
    $(".footer").replaceWith(data);
});