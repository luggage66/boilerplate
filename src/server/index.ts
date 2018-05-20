import * as express from 'express';
import * as http from 'http';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const server = http.createServer(app);


const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

server.listen(8123, () => {
    console.log('Running a GraphQL API server at localhost:8123/graphql');
})
