const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

let todosData = [];
let studentData = [];
let data_arr = [];

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

  

  type Student {
    id: String!
    name: String!
    contact: String!
    qualification: String!
    books:[BookTypeDef!]!
  }
  type BookTypeDef {
    id: String!
    text: String!
    author: String!
  }
  input BookInput {
    id: String!
    text: String!
    author: String!
  }

  type StudentUpdate {
    stud_id: String
    qualification: String
    books: [BookTypeDef]
  }



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
    studentQuery: [Student]!
    todos: [Todoo]!
    storedData: [Data]!
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

    registerstudent(
      name: String!
      contact: String!
      qualification: String!
      books:[BookInput!]!
    ): Student!

    updatestud(
      stud_id: String
      qualification: String
      books:[BookInput]
    ): StudentUpdate

    deleteStud(
      id:String!
    ):String

    addData(
      stringData: String!, 
      intData: Int!, 
      objectData: InputObject!, 
      arrayData: [InputObject!]!
    ): Data!
  }
`;

const resolvers = {

  Query: {
    todos: () => todosData,
    studentQuery: () => studentData,
    storedData: () => data_arr,
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

    registerstudent: (parent, args, context, info) => {
      console.log("register student", args)
      const newStudent = {
        id: "STUD_" + Date.now().toString(),
        name: args?.name,
        contact: args?.contact,
        qualification: args?.qualification,
        books: args?.books
      }
      studentData.push(newStudent)
      console.log("studentData", studentData)
      return newStudent;
    },

    updatestud: (parent, args, context, info) => {
      console.log("updatestud args", args)
      studentData.some((obj, i) => {
        if (obj.id == args?.stud_id) {
          // once the ID is match,
          studentData[i].qualification = args?.qualification;
          studentData[i].books = args?.books;
          console.log("updtaed", studentData[i])
          return studentData[i] + "";
        }
      });
      return studentData
    },

    deleteStud: (parent, args, context, info) => {
      console.log("deleteStud args", args)
      studentData.some((obj, i) => {
        if (obj.id == args?.id) {
          // once the ID is match,
          console.log("deleted", studentData[i])
          studentData.splice(i, 1);
          return studentData;
        }
      });
    },

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
