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
