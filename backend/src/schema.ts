export const typeDefs = `#graphql
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Option {
    id: ID!
    text: String!
  }

  type Question {
    id: ID!
    type: QuestionType!
    title: String!
    options: [Option]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: String! # Заменили JSON на String
    createdAt: String
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(
      title: String!
      description: String
      questions: [QuestionInput!]!
    ): Form
    
    updateForm(id: ID!, questions: [QuestionInput!]!): Form
    submitResponse(formId: ID!, answers: String!): Response # Заменили JSON на String
  }

  input OptionInput {
    id: ID
    text: String!
  }

  input QuestionInput {
    id: ID
    type: QuestionType!
    title: String!
    options: [OptionInput]
  }
`;
