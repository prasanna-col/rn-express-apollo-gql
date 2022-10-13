import { gql } from '@apollo/client';

export const READ_TODOS = gql`
query todosData{
  todos {
    id
    text
    name
    phone
    completed
  }
}
`;

export const CREATE_TODO = gql`
mutation CreateTodo(
    $text: String!
    $name: String!
    $phone: String!
  ) {
  createTodo(
    text: $text
    name: $name
    phone: $phone
  )
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
  ) {
  updateTodo(
    id: $id
    text: $text
    name: $name
    phone: $phone
    )
}
`;

export const UPDATE_TODOSTATUS = gql`
mutation UpdateTodoStatus($id: String!) {
  updateTodoStatus(id: $id)
}
`;
