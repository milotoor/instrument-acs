/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContactMessage = /* GraphQL */ `
  query GetContactMessage($id: ID!) {
    getContactMessage(id: $id) {
      id
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
export const listContactMessages = /* GraphQL */ `
  query ListContactMessages(
    $filter: ModelContactMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        subject
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
