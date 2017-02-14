/* Given a port in args, write the current time of your first connection */
const net = require('net');
const strftime = require('strftime')
const server = net.createServer((socket) => {
  var now = strftime('%Y-%m-%d %l:%M');
  socket.end(now + '\n');
});

server.listen(process.argv[2], () => {
  console.log('listening on port ' + process.argv[2]);
})
