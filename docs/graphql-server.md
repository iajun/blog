---
title: GraphQL Server
date: 2019-12-25 21:41:43
categories: graphql
tags: graphql
---

## Basic Example:

```javascript
const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

/********
 * ! means not null, false is fine
 *
 * type user
 *
 * email is required
 * friends should be an array, not null or others
 *
 * type Query
 *
 * me should be a User, not null or others
 ********/

const typeDefs = gql`
    type User {
        email: String!
        avatar: String
        friends: [User]!
    }

    type Query {
        me: User!
    }
`;

const resolvers = {
    Query: {
        me() {
            return {
                email: 'iveoname@163.com',
                avatar: 'sharp.jpg',
                friends: []
            };
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(3020).then(() => {
    console.log('server is running now');
});
```

Then we get a running server and we can fetch data from it:

## Types:

```javascript
const typeDefs = gql`
    type User {
        email: String!
        avatar: String
        friends: [User]!
    }

    type Query {
        me: User!
    }
`;
```

This is a Type Definition of GraphQL

Query is also a Schema:

```javascript
type Query {
    me: User!
}
```
