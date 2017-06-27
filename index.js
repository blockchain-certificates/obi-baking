var commander = require('commander');
var fs = require('fs');
var pngitxt = require('png-itxt');


function bake(imageToBake, blockcertFileName, bakedImage) {

  var bufs = [];

  fs.createReadStream(blockcertFileName)
    .on('end', function () {
      var buf = Buffer.concat(bufs);
      fs.createReadStream(imageToBake)
        .on('end', function () {
          console.log('Output file is ' + bakedImage);
        })
        .pipe(pngitxt.set('openbadges', buf.toString()))
        .pipe(fs.createWriteStream(bakedImage));

    })
    .on('data', function (d) {
      bufs.push(d);
    })
    .pipe(fs.createWriteStream(bakedImage));
}

function extract(bakedImage) {
  fs.createReadStream(bakedImage)
    .pipe(pngitxt.get('openbadges', function (data, err) {
      if (!err && data) {
        console.log(data);
      }
    }));
}


var program = require('commander');

program
  .version('0.0.1')
  .option('-x, --extract', 'extract assertion from baked file')
  .option('-b, --bake', 'bake assertion into file')
  .option('-i, --image <path>', 'Image to bake')
  .option('-o, --bakedImage <path>', 'Baked image output file')
  .option('-B, --blockcert <path>', 'Blockcert assertion to bake')
  .parse(process.argv);


if (program.bake) {
  if (!program.image || !program.bakedImage || !program.blockcert) {
    program.outputHelp();
    return;
  }
  var imageToBake = program.image;
  var bakedImage = program.bakedImage;
  var blockcertFileName = program.blockcert;
  bake(imageToBake, blockcertFileName, bakedImage);

} else if (program.extract) {
  if (!program.bakedImage) {
    program.outputHelp();
    return;
  }
  var bakedImage = program.bakedImage;
  extract(bakedImage);

} else {
  program.outputHelp();
}

