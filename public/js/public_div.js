$.get( "/ejs/header.ejs", function( data ) {
    $(".header").replaceWith(data);
});

$.get( "/ejs/navbar.ejs", function( data ) {
    $(".navbar").replaceWith(data);
});

$.get( "/ejs/footer.ejs", function( data ) {
    $(".footer").replaceWith(data);
});