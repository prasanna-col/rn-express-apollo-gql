import { gql } from "@apollo/client";

export const READ_TODOS = gql`
  query todosData {
    todos {
      id
      text
      name
      phone
      date
      priority
      completed
    }
  }
`;

export const READ_STUDENT = gql`
  query studentData {
    studentQuery {
      id
      name
      contact
      qualification
      books {
        id
        text
        author
      }
    }
  }
`;


export const READ_DATA = gql`
query data_arr {
  storedData {
    id
    stringField
    intField
    objectField {
      field1
      field2
    }
    arrayField {
      field1
      field2
    }
  }
}
`;


export const CREATE_TODO = gql`
  mutation CreateTodo(
    $text: String!
    $name: String!
    $phone: String!
    $date: String!
    $priority: Boolean!
  ) {
    createTodo(
      text: $text
      name: $name
      phone: $phone
      date: $date
      priority: $priority
    )
  }
`;

export const CREATE_STUDENT = gql`

  mutation CreateStudent(
      $name: String!
      $contact: String!
      $qualification: String!
      $books: [BookInput!]!
  ) {
    registerstudent(
      name: $name
      contact: $contact
      qualification: $qualification
      books: $books
    ){
      id
      name
      contact
      qualification
      books {
        id
        text
        author
      }
    }
  }
`;

export const ADD_DATA_MUTATION = gql`
mutation AddData(
  $stringData: String!, 
  $intData: Int!, 
  $objectData: InputObject!, 
  $arrayData: [InputObject!]!
  ) {
  addData(
    stringData: $stringData, 
    intData: $intData, 
    objectData: $objectData, 
    arrayData: $arrayData
    ) {
    id
    stringField
    intField
    objectField {
      field1
      field2
    }
    arrayField {
      field1
      field2
    }
  }
}
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: String!
    $text: String!
    $name: String!
    $phone: String!
    $date: String!
    $priority: Boolean!
  ) {
    updateTodo(
      id: $id
      text: $text
      name: $name
      phone: $phone
      date: $date
      priority: $priority
    )
  }
`;

export const UPDATE_TODOSTATUS = gql`
  mutation UpdateTodoStatus($id: String!) {
    updateTodoStatus(id: $id)
  }
`;


export const UPDATE_STUD = gql`
  mutation UpdateStud(
    $stud_id: String
    $qualification: String
    $books: [BookInput]
  )
  {
    updatestud(
      stud_id: $stud_id
      qualification: $qualification
      books: $books
    ){
      stud_id
      qualification
      books {
        id
        text
        author
      }
    }
  }
`;

export const REMOVE_STUD = gql`
  mutation RemoveStud(
    $id: String!
  ){
    deleteStud(
      id:$id
    )
  }
  `;