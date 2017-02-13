
fs = require('fs');
path = require('path');

module.exports = function(directory, extension, callback){
  fs.readdir(directory, function(err, data){
    if(err){
      return callback(err);
    }
    var filtered = data.filter((file) => path.extname(file) == '.' + extension);
     callback(null, filtered);
  });
}
