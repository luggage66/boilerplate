import http from 'http';

const PORT = 8081;

const server = http.createServer((req, res) => {
    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
    console.log(`Server Listening on port: ${PORT}`);
});
