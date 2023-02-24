const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const data_arr = [];

const typeDefs = gql`
  type Data {
    id: ID!
    stringField: String!
    intField: Int!
    objectField: ObjectData!
    arrayField: [ObjectData!]!
  }

  type ObjectData {
    field1: String!
    field2: String!
  }

  input InputObject {
    field1: String!
    field2: String!
  }

  type Query {
    storedData: [Data]!
  }

  type Mutation {
    addData(stringData: String!, intData: Int!, objectData: InputObject!, arrayData: [InputObject!]!): Data!
  }
`;

const resolvers = {
  Query: {
    storedData: () => data_arr,
  },
  Mutation: {
    addData: (parent, args, context, info) => {
      console.log("args", args)
      const newData = {
        id: uuidv4(),
        stringField: args?.stringData,
        intField: args?.intData,
        objectField: args?.objectData,
        arrayField: args?.arrayData,
      };
      data_arr.push(newData);
      console.log("data_arr", data_arr)
      return newData;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
