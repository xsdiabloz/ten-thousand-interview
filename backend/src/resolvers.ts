import { forms, responses, Form, QuestionType, Response } from "./db";

interface CreateFormArgs {
  title: string;
  description?: string;
  questions: {
    type: QuestionType;
    title: string;
    options?: { text: string }[];
  }[];
}

interface UpdateFormArgs {
  id: string;
  questions: {
    id?: string;
    title: string;
    type: QuestionType;
    options?: { id?: string; text: string }[];
  }[];
}

export const resolvers = {
  Query: {
    forms: (): Form[] => forms,
    form: (_: unknown, { id }: { id: string }): Form | undefined => {
      const found = forms.find(
        (f) => String(f.id).trim() === String(id).trim(),
      );
      console.log(`Searching for ID: "${id}", Found:`, found ? "YES" : "NO");
      return found;
    },

    responses: (_: unknown, { formId }: { formId: string }) => {
      return responses.filter((r) => String(r.formId) === String(formId));
    },
  },

  Mutation: {
    createForm: (
      _: unknown,
      { title, description, questions }: CreateFormArgs,
    ): Form => {
      const newForm: Form = {
        id: String(Date.now()),
        title,
        description,
        questions: questions.map((q, idx) => ({
          id: `q-${Date.now()}-${idx}`,
          type: q.type,
          title: q.title,
          options:
            q.options?.map((opt, optIdx) => ({
              id: `opt-${optIdx}-${Date.now()}`,
              text: typeof opt === "string" ? opt : opt.text, 
            })) || [],
        })),
      };
      forms.push(newForm);
      return newForm;
    },

    updateForm: (_: unknown, { id, questions }: UpdateFormArgs): Form => {
      const formIndex = forms.findIndex((f) => String(f.id) === String(id));

      if (formIndex === -1) {
        console.error(`Form with ID ${id} not found!`);
        throw new Error("Form not found");
      }

      const updatedForm = {
        ...forms[formIndex],
        questions: questions.map((q, idx) => ({
          id: q.id || `q-${Date.now()}-${idx}`,
          title: q.title,
          type: q.type,
          options:
            q.options?.map((opt, optIdx) => ({
              id: opt.id || `opt-${Date.now()}-${optIdx}`,
              text: opt.text || "",
            })) || [],
        })),
      };

      forms[formIndex] = updatedForm;
      console.log(
        `Form ${id} updated. Questions count: ${updatedForm.questions.length}`,
      );
      return updatedForm;
    },

    submitResponse: (
      _: unknown,
      { formId, answers }: { formId: string; answers: string },
    ) => {
      const newResponse = {
        id: `res-${Date.now()}`,
        formId,
        answers,
        createdAt: new Date().toISOString(),
      };
      responses.push(newResponse);
      return newResponse;
    },
  },
};
