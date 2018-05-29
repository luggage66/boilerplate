import 'reflect-metadata';
import * as express from 'express';
import * as http from 'http';
import * as graphqlHTTP from 'express-graphql';
import * as path from 'path';
import { buildSchema } from 'graphql';
import { createConnection } from 'typeorm';
import { User } from '../database/entity/user';
import * as html5HistoryFallback from 'connect-history-api-fallback';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';

// imported this way so that Typescript doesn't re-root the project
// tslint:disable-next-line:no-var-requires
const webpackConfig = require('../../webpack.config');
const webpackCompiler = webpack(webpackConfig);

const app = express();
const server = http.createServer(app);

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
};

const NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

// This re-writes most urls to the root for SPA functionality to work
app.use(html5HistoryFallback({
    index: '/index.html'
}));

if (NODE_ENV === 'development') {
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
    //   historyApiFallback: true
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
        path: '/__webpack_hmr'
    }));
}
else { // production, serve static files
    app.use('/', express.static(path.join(__dirname, '../../static')));
}

createConnection().then((connection) => {
    server.listen(8123, async () => {
        console.log('Running a GraphQL API server at localhost:8123/graphql');

        // console.log("Inserting a new user into the database...");
        // const user = new User();
        // user.firstName = "Timber";
        // user.lastName = "Saw";
        // user.age = 25;
        // await connection.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);

        // console.log("Loading users from the database...");
        // const users = await connection.manager.find(User);
        // console.log("Loaded users: ", users);

        console.log('Here you can setup and run express/koa/any other framework.');
    });
});
