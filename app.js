var q = require('q');
var gm = require('gm');
var resize = function (path, width, height) {
  var deferred = q.defer();
  var ext = path.substr(path.lastIndexOf('.'), path.length);
  var writePath = path.substr(0, path.lastIndexOf('.')) + '_' + width + '_' + height + ext;

  gm(path)
      .resize(width, height)
      .write(writePath, function (err) {
        if (err) deferred.reject();
        else deferred.resolve();
      });
  return deferred.promise;
};


gm('imgs/bunnies.jpg')
    .thumb(100, 100, 'imgs/bunnies_thumb.jpg', function (err) {
      if (err) console.error(err);
      else console.log('done - thumb');
    });

gm('imgs/bunnies.jpg')
    .noProfile()
    .write('imgs/bunnies_noprofile.jpg', function (err) {
      if (err) console.error(err);
      else console.log('done - noprofile');
    });

gm('imgs/bunnies.jpg')
    .blur(19, 10)
    .write('imgs/bunnies_blur.jpg', function (err) {
      if (err) console.error(err);
      else console.info('done - blur')
    });

q.all([
  resize('imgs/bunnies.jpg', 100, 100),
  resize('imgs/bunnies.jpg', 150, 150),
  resize('imgs/bunnies.jpg', 200, 200)
]).then(function () {
  console.log('done - resize');
}, function (err) {
  console.error(err);
});