/*  ## HTTP JSON API SERVER (Exercise 13 of 13)

  Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example: */

const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
  var requrl = url.parse(request.url);
  var date = new Date(requrl.query.toString().slice(4));
  var results;
  if(requrl.pathname ==='/api/parsetime') {
    results = parsetime(date)
  }
  if(requrl.pathname ==='/api/unixtime') {
    results = unixtime(date);
  }
  if(results){
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end(JSON.stringify(results));
  }
});

function parsetime(date){
  return {
    "hour": date.getHours(),
    "minute": date.getMinutes(),
    "second": date.getSeconds(),
  }
}

function unixtime(date){
  return {
    "unixtime": date.getTime(),
  }
}
server.listen(process.argv[2]);
