const DataUri = require('datauri');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');


module.exports = (originalname, buffer)=>{
  // console.log(buffer)
  var extension = path.extname(originalname);
  // console.log(extension)
  return parser.format(extension, buffer).content;
}