const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

let todosData = [];

const typeDefs = gql`
  type Todoo {
    id: String
    text: String
    name: String
    phone: String
    date: String
    priority: Boolean
    completed: Boolean
  }

  type Query {
    todos: [Todoo]!
  }

  type Mutation {
    createTodo(
      text: String!
      name: String!
      phone: String!
      date: String
      priority: Boolean
    ): String

    removeTodo(id: String!): String

    updateTodo(
      id: String!
      text: String!
      name: String!
      phone: String!
      date: String
      priority: Boolean
    ): String

    updateTodoStatus(id: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: () => todosData,
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {
      console.log("createTodo args", args);
      return todosData.push({
        id: Date.now().toString(),
        text: args.text,
        name: args.name,
        phone: args.phone,
        date: args.date,
        priority: args.priority,
        completed: false,
      });
    },
    removeTodo: (parent, args, context, info) => {
      console.log("removeTodo args", args);
      for (let i in todosData) {
        if (todosData[i].id === args.id) {
          todosData.splice(i, 1);
        }
      }
      return args.id;
    },
    updateTodo: (parent, args, context, info) => {
      console.log("updateTodo args", args);
      for (let i in todosData) {
        if (todosData[i].id === args.id) {
          todosData[i].name = args.name;
          todosData[i].phone = args.phone;
          todosData[i].text = args.text;
          todosData[i].date = args.date;
          // todosData[i].time = args.time;
          todosData[i].priority = args.priority;
        }
      }
      return args.id;
    },
    updateTodoStatus: (parent, args, context, info) => {
      console.log("updateTodoStatus args", args);
      for (let i in todosData) {
        if (todosData[i].id === args.id) {
          todosData[i].completed = !todosData[i].completed;
        }
      }
      return args.id;
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
