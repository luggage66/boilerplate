/* globals __dirname, process, console */
import http from 'http';
import path from 'path';
import express from 'express';
import html5HistoryFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import webpack from 'webpack';
import api from './api';

let app = express();
let server = http.Server(app);

const webpackCompiler = webpack(webpackConfig);

const NODE_ENV = process.env.NODE_ENV || 'development';

//'mount' our api first.
app.use('/api/v1', api);

// This re-writes most urls to the root for SPA functionality to work
app.use(html5HistoryFallback({
  index: '/index.html'
}));

if (NODE_ENV === 'development')
{
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        historyApiFallback: true
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
        path: "/__webpack_hmr"
    }));
}
else { // production, serve static files
    app.use('/', express.static(path.join(__dirname, "../../static")));
}

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

//and, finally, start listening for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Express Server Listening on port: ${PORT}`);
});
