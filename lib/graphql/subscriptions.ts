/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContactMessage = /* GraphQL */ `
  subscription OnCreateContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onCreateContactMessage(filter: $filter) {
      id
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContactMessage = /* GraphQL */ `
  subscription OnUpdateContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onUpdateContactMessage(filter: $filter) {
      id
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContactMessage = /* GraphQL */ `
  subscription OnDeleteContactMessage(
    $filter: ModelSubscriptionContactMessageFilterInput
  ) {
    onDeleteContactMessage(filter: $filter) {
      id
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
