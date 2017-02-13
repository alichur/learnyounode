/* Count the number of new lines in a file provided in args */
var fs = require('fs');
  fs.readFile(process.argv[2], 'utf8', function(err, data ){
  	if(!err){
  	   lines = data.split('\n');
  	    console.log(lines.length-1);
  	}
  	else{
  	   console.log('there was an error');
  	}
});

/* Return file names of that match the extension provided in args */
var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function(err, data){
  if(err){
    console.log("error occured");
  }
  var requiredTypes = data.filter(file => path.extname(file) === '.' + process.argv[3]);
  requiredTypes.forEach(file => console.log(file));
})

/* Return files of a given extension only, with helper pulled out into module 'fileFilter.js' */
var fileFilter = require('./fileFilter');
  fileFilter(process.argv[2], process.argv[3], function(err, data){
    if(err){
      return console.log('an error occured');
    }
    data.forEach(line => console.log(line));
  });

/* Print to console the ressponse from the url provided in args*/
http = require('http');

var url = process.argv[2];

http.get(url, (res) => {
  res.setEncoding('utf8');
  res.on('data', console.log);
  res.on('error', console.log);
})

/* Given a url in args, print the total chars received, and the string of what was received */
http = require('http');
var url = process.argv[2];
http.get(url, (res) => {
  var info = "";
  var append = function(data){
    info = info + data;
  };
  var print = function(){
    console.log(info.length);
    console.log(info)
  };
  res.on('data', append);
  res.on('end', print);
});

/* hit the 3 urls provided in args and print them in the order they were given */
//TODO: refactor out repetition. Remove Promises if not really using promise all.
http = require('http');

var results = [];

var p1 = new Promise(function(resolve, reject){
  getFullResponse(process.argv[2], function(result){
    results[0] = result;
    resolve(results[0]);
  });
});

var p2 = new Promise(function(resolve, reject){
  getFullResponse(process.argv[3], function(result){
    results[1] = result;
    resolve(results[1]);
  });
});

var p3 = new Promise(function(resolve, reject){
  getFullResponse(process.argv[4], function(result){
    results[2] = result;
    resolve(results[2]);
  });
});

Promise.all([p1, p2, p3]).then(() => {
  console.log(results[0]);
  console.log(results[1]);
  console.log(results[2]);
 });

  function getFullResponse(url, callback){
    var info = "";
    http.get(url, (res) => {
      var append = function(data){
        info = info + data;
      };
      var done = function(){
        callback(info);
      }
      res.on('data', append);
      res.on('end', done);
    });
  };
