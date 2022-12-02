/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateContactMessageInput = {
  id?: string | null,
  email: string,
  subject: string,
  message: string,
};

export type ModelContactMessageConditionInput = {
  email?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelContactMessageConditionInput | null > | null,
  or?: Array< ModelContactMessageConditionInput | null > | null,
  not?: ModelContactMessageConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ContactMessage = {
  __typename: "ContactMessage",
  id: string,
  email: string,
  subject: string,
  message: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateContactMessageInput = {
  id: string,
  email?: string | null,
  subject?: string | null,
  message?: string | null,
};

export type DeleteContactMessageInput = {
  id: string,
};

export type ModelContactMessageFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelContactMessageFilterInput | null > | null,
  or?: Array< ModelContactMessageFilterInput | null > | null,
  not?: ModelContactMessageFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelContactMessageConnection = {
  __typename: "ModelContactMessageConnection",
  items:  Array<ContactMessage | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionContactMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContactMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionContactMessageFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateContactMessageMutationVariables = {
  input: CreateContactMessageInput,
  condition?: ModelContactMessageConditionInput | null,
};

export type CreateContactMessageMutation = {
  createContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContactMessageMutationVariables = {
  input: UpdateContactMessageInput,
  condition?: ModelContactMessageConditionInput | null,
};

export type UpdateContactMessageMutation = {
  updateContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContactMessageMutationVariables = {
  input: DeleteContactMessageInput,
  condition?: ModelContactMessageConditionInput | null,
};

export type DeleteContactMessageMutation = {
  deleteContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetContactMessageQueryVariables = {
  id: string,
};

export type GetContactMessageQuery = {
  getContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContactMessagesQueryVariables = {
  filter?: ModelContactMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactMessagesQuery = {
  listContactMessages?:  {
    __typename: "ModelContactMessageConnection",
    items:  Array< {
      __typename: "ContactMessage",
      id: string,
      email: string,
      subject: string,
      message: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateContactMessageSubscriptionVariables = {
  filter?: ModelSubscriptionContactMessageFilterInput | null,
};

export type OnCreateContactMessageSubscription = {
  onCreateContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContactMessageSubscriptionVariables = {
  filter?: ModelSubscriptionContactMessageFilterInput | null,
};

export type OnUpdateContactMessageSubscription = {
  onUpdateContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContactMessageSubscriptionVariables = {
  filter?: ModelSubscriptionContactMessageFilterInput | null,
};

export type OnDeleteContactMessageSubscription = {
  onDeleteContactMessage?:  {
    __typename: "ContactMessage",
    id: string,
    email: string,
    subject: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
