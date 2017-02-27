/* globals __dirname, process, console */
import http from 'http';
import path from 'path';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import webpack from 'webpack';
import api from './api';

let app = express();
let server = http.Server(app);

const webpackCompiler = webpack(webpackConfig);

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development')
{
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
        path: "/__webpack_hmr"
    }));
}
else { // production, serve static files
    app.use('/', express.static(path.join(__dirname, "../../static")));
}

//'mount' our api.
app.use('/api/v1', api);

// all other urls, just pretend it was a request to / and let the client deal with it (SPA)
app.use(function(req, res, next) {
    res.sendfile(path.join(__dirname, "../../static/index.html"));
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

//and, finally, start listening for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Express Server Listening on port: ${PORT}`);
});
