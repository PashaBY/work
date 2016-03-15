(function () {
    var video = document.querySelector('.camera__video'),
    canvas = document.querySelector('.camera__canvas'),
    filt = document.querySelector('.controls__filter'),
    filterName = filt.value;

    filt.onchange = function() {
        filterName = filt.value;
    }

    var getVideoStream = function (callback) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.onloadedmetadata = function (e) {
                        video.play();

                        callback();
                    };
                },
                function (err) {
                    console.log("The following error occured: " + err.name);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    };

    var applyFilterToPixel = function (pixel, i) {
        var filters = {
            invert: function (pixel) {
                pixel[i] = 255 - pixel[i];
                pixel[i+ 1] = 255 - pixel[i + 1];
                pixel[i +2] = 255 - pixel[i + 2];

                return pixel;
            },
            grayscale: function (pixel) {
                var r = pixel[i];
                var g = pixel[i + 1];
                var b = pixel[i + 2];
                var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

                pixel[i] = pixel[i + 1] = pixel[i + 2] = v;

                return pixel;
            },
            threshold: function (pixel) {
                var r = pixel[i];
                var g = pixel[i + 1];
                var b = pixel[i + 2];
                var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 128) ? 255 : 0;
                pixel[i] = pixel[i + 1] = pixel[i + 2] = v;

                return pixel;
            }
        };

        return filters[filterName](pixel);
    };

    var applyFilter = function () {

        var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;

        for (var i = 0; i < imageData.data.length; i += 4) {
            pixels = applyFilterToPixel(pixels, i)
        }

        canvas.getContext('2d').putImageData(imageData, 0, 0);
    };

    var captureFrame = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext('2d').drawImage(video, 0, 0);
        applyFilter();
    };

    getVideoStream(function () {
        captureFrame();

        setInterval(captureFrame, 16);
    });
})();
