const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { gql } = require("graphql-tag");
const { ApolloServer, gql } = require('apollo-server-express');

const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const { createWriteStream } = require('fs');
const { GraphQLUpload } = require('graphql-upload');

const app = express();
app.use(cors());

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const path = require("path")
const fs = require('fs');

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

  type FileBase {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  scalar Upload

  type File{
    url: String!
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

    uploadImage(
      file: Upload!
    ): File!
    
    uploadFile(file: String!): FileBase!

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

    uploadImage: async (_, { file }) => {
      // Extract the image data from the Upload scalar
      console.log("file", file)
      const { createReadStream, filename } = await file;

      console.log("createReadStream", createReadStream)
      console.log("filename", filename)

      // Generate a unique filename for the uploaded image
      const timestamp = Date.now().toString();
      const extension = filename.split('.').pop();
      const uniqueFilename = `${timestamp}.${extension}`;

      // Write the image data to disk
      const stream = createReadStream();
      const path = `./images/${uniqueFilename}`;
      await new Promise((resolve, reject) => {
        stream
          .pipe(createWriteStream(path))
          .on('finish', () => resolve())
          .on('error', (error) => reject(error));
      });

      // Return the URL of the uploaded image
      const url = `http://localhost:4000/images/${uniqueFilename}`;
      return { url };
    },

    uploadFile: async (_, { file }) => {

      // console.log("file", file)
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const filename = `file-${Date.now()}.jpg`;
      const filePath = path.join(__dirname, `uploads/${filename}`);
      console.log("filePath", filePath)
      await new Promise((resolve, reject) => {
        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            console.log("reject err", err)
            reject(err);
          }
          resolve();
        });
      });

      const url = `http://localhost:4000/uploads/${filename}`;
      return { id: '123', filename, mimetype: 'image/jpeg', encoding: 'base64', url };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });


// server.applyMiddleware({ app });
// app.listen({ port: 4000 }, () =>
//   console.log("Now browse to http://localhost:4000" + server.graphqlPath)
// );

server.start().then(async () => {
  await server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});






