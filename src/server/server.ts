/* globals __dirname, process, console */
import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as html5HistoryFallback from 'connect-history-api-fallback';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';

import api from './api';

const webpackConfig = require('../../webpack.config');

let app = express();
let server = http.createServer(app);

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
