var express = require('express');
var router = express.Router();
var glob = require("glob");
var _ = require("lodash");
var path = require("path");
var fs = require("fs-extra");


router.get('/index', function(req, res, next) {

  glob("assets/*.*", { nodir:true, cwd: './public/'}, function (er, files) {

    console.log(files);

    res.render('index', {
      title: 'Welcome',
      files: files
    });

  })
});


router.get('/', function(req, res) {
  res.json({
    "name": "NodeJS Server",
    "version": "1.0",
    "platform": 0,
    "type": 0
  });
});

router.get('/photos', function(req, res, next) {

  glob("assets/*.*", { nodir:true, cwd: './public/'}, function (er, files) {
    var result = [];

    _(files).forEach(function(f) {

      result.push({
        "containingFolder": "/assets/",
        "fileName": path.basename(f),
        "fullPath": f,
        "fileSize": getFilesizeInBytes(f)
      });

    });


    res.json(result);
  });
});

router.get('/get', function(req, res, next) {
  var imagePath = path.join(".", "public", req.query.Photo);
  res.sendfile(imagePath);
});


module.exports = router;

function getFilesizeInBytes(file) {
  var stats = fs.statSync(path.join(".", "public", file));
  return stats["size"];
}