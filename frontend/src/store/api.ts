import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Question {
  id: string;
  title: string;
  type: "TEXT" | "CHECKBOX";
  options?: { id: string; text: string }[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const formsApi = createApi({
  reducerPath: "formsApi",
  tagTypes: ["Forms", "Responses"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),

  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
            query GetForms {
              forms {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options {
                    id
                    text
                  }
                }
              }
            }
          `,
        },
      }),
      transformResponse: (response: { data: { forms: Form[] } }) =>
        response.data.forms,
      providesTags: ["Forms"],
    }),

    createForm: builder.mutation<Form, { title: string; description: string }>({
      query: ({ title, description }) => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
            mutation CreateForm($title: String!, $description: String) {
              createForm(title: $title, description: $description, questions: []) {
                id
                title
              }
            }
          `,
          variables: { title, description },
        },
      }),
      invalidatesTags: ["Forms"],
    }),

    getFormById: builder.query<Form, string>({
      query: (id) => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
            query GetForm($id: ID!) {
              form(id: $id) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options {
                    id
                    text
                  }
                }
              }
            }
          `,
          variables: { id },
        },
      }),
      transformResponse: (response: { data: { form: Form } }) =>
        response.data.form,
      providesTags: (result, error, id) => [{ type: "Forms", id }],
    }),

    submitResponse: builder.mutation<any, { formId: string; answers: any }>({
      query: ({ formId, answers }) => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
        mutation SubmitResponse($formId: ID!, $answers: String!) {
          submitResponse(formId: $formId, answers: $answers) {
            id
          }
        }
      `,

          variables: { formId, answers: JSON.stringify(answers) },
        },
      }),
      invalidatesTags: ["Responses"],
    }),

    getResponses: builder.query<any[], string>({
      query: (formId) => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
        query GetResponses($formId: ID!) {
          responses(formId: $formId) {
            id
            answers
            createdAt
          }
        }
      `,
          variables: { formId },
        },
      }),
      transformResponse: (response: any) => {
        const raw = response?.data?.responses || [];
        return raw.map((r: any) => ({
          ...r,

          answers:
            typeof r.answers === "string" ? JSON.parse(r.answers) : r.answers,
        }));
      },
      providesTags: ["Responses"],
    }),

    updateForm: builder.mutation<Form, { id: string; questions: any[] }>({
      query: ({ id, questions }) => ({
        url: "graphql",
        method: "POST",
        body: {
          query: `
        mutation UpdateForm($id: ID!, $questions: [QuestionInput!]!) {
          updateForm(id: $id, questions: $questions) {
            id
            questions {
              id
              title
              type
              options { id text }
            }
          }
        }
      `,
          variables: { id, questions },
        },
      }),
      invalidatesTags: ["Forms"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useCreateFormMutation,
  useGetFormByIdQuery,
  useSubmitResponseMutation,
  useGetResponsesQuery,
  useUpdateFormMutation,
} = formsApi;
