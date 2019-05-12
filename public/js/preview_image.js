function previewImage(file) {
    var galleryId = "gallery";

    var gallery = document.getElementById(galleryId);
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
        throw "File Type must be an image";
    }

    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div

    var img = document.createElement("img");
    img.file = file;
    img.width = 300;
    _img = new Image();
    var _URL = window.URL || window.webkitURL;
    _img.src = _URL.createObjectURL(file);
    _img.onload = function () {
        var n = this.height * (300 / this.width);
        $("#gallery").css("height" ,n);
    };

    $(gallery).empty();
    thumb.appendChild(img);
    gallery.appendChild(thumb);

    // Using FileReader to display the image content
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}

var uploadfiles = document.querySelector('#fileinput');
uploadfiles.addEventListener('change', function () {
    previewImage(this.files[0]);
}, false);