
var GoPro = require('goproh4');
var cam = new GoPro.Camera();

var intervalSecond = 15;
var timeout = 2;

setInterval(function() {

  cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single).then(function () {

    return cam.start()

  }).then(function () {

    var now = Date.now()

    setTimeout(function() {

      cam.listMedia().then(function (result) {

        var lastDirectory = result.media[result.media.length - 1];
        var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

        // get last media
        cam.getMedia(lastDirectory.d, lastFile.n, 'images/' + lastFile.n).then(function (filename) {
          console.log('[' + now + ']', filename + ' saved');
        });

      });

    }, timeout * 1000)

  });

}, intervalSecond * 1000)

