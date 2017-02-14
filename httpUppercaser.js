const http = require('http');
const map = require('through2-map');

const server = http.createServer((request, response) => {
    request.pipe(map((chunk) => chunk.toString().toUpperCase())).pipe(response);
});
server.listen(process.argv[2]);
