/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContactMessage = /* GraphQL */ `
  mutation CreateContactMessage(
    $input: CreateContactMessageInput!
    $condition: ModelContactMessageConditionInput
  ) {
    createContactMessage(input: $input, condition: $condition) {
      id
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
