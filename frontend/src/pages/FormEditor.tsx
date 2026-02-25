import React from "react";
import { useParams } from "react-router-dom";
import { useGetFormsQuery, useUpdateFormMutation } from "../store/api";
import FormHeader from "../components/FormHeader";
import QuestionItem from "../components/QuestionItem";
import styles from "../styles/formEditor.module.css";

const FormEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: forms, isLoading } = useGetFormsQuery();
  const [updateForm] = useUpdateFormMutation();

  const currentForm = forms?.find((f: any) => String(f.id) === String(id));

  const handleUpdateQuestion = async (updatedQ: any) => {
    if (!currentForm) return;

    const newQuestions = currentForm.questions.map((q: any) => {
      const item = q.id === updatedQ.id ? updatedQ : q;
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        options:
          item.options?.map((opt: any) => ({
            id: opt.id || `opt-${Date.now()}-${Math.random()}`,
            text: opt.text || "",
          })) || [],
      };
    });

    try {
      await updateForm({
        id: currentForm.id,
        questions: newQuestions,
      }).unwrap();
    } catch (err) {
      console.error("Error, can't update a form", err);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!currentForm) return;
    const filteredQuestions = currentForm.questions.filter(
      (q: any) => q.id !== questionId,
    );
    try {
      await updateForm({
        id: currentForm.id,
        questions: filteredQuestions,
      }).unwrap();
    } catch (err) {
      console.error("Error, can't delete a question", err);
    }
  };

  const handleAddQuestion = async () => {
    if (!currentForm) return;

    const newQ = {
      id: `q-${Date.now()}`,
      title: "New question",
      type: "TEXT",
      options: [],
    };

    const updatedQuestions = [...(currentForm.questions || []), newQ].map(
      (q) => ({
        id: String(q.id),
        title: q.title || "",
        type: q.type || "TEXT",
        options: q.options || [],
      }),
    );

    try {
      await updateForm({
        id: currentForm.id,
        questions: updatedQuestions,
      }).unwrap();
    } catch (err) {
      console.error("Error while adding a question", err);
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (!currentForm) {
    return (
      <div className={styles.error}>
        <h2>Form not found</h2>
        <p>ID from URL: {id}</p>
        <p>Available ID: {forms?.map((f: any) => f.id).join(", ")}</p>
      </div>
    );
  }

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.content}>
        <FormHeader
          title={currentForm.title}
          description={currentForm.description}
        />

        <div className={styles.questionsList}>
          {currentForm.questions?.map((q: any) => (
            <QuestionItem
              key={q.id}
              id={q.id}
              title={q.title}
              type={q.type}
              options={q.options}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>

        {(!currentForm.questions || currentForm.questions.length === 0) && (
          <div className={styles.emptyState}>There are no questions</div>
        )}

        <button onClick={handleAddQuestion} className={styles.addBtn}>
          + Add question
        </button>
      </div>
    </div>
  );
};

export default FormEditor;
