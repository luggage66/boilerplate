import 'reflect-metadata';
import * as express from 'express';
import * as http from 'http';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { createConnection } from 'typeorm';
import { User } from '../database/entity/user';
new User();

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

createConnection().then((connection) => {
    server.listen(8123, async () => {
        console.log('Running a GraphQL API server at localhost:8123/graphql');

        console.log("Inserting a new user into the database...");
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
        
        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);
        
        console.log("Here you can setup and run express/koa/any other framework.");
    })
});
