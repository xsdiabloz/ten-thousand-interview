import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFormFiller } from "../hooks/useFormFiller";
import { useGetFormByIdQuery, useSubmitResponseMutation } from "../store/api";
import { QuestionType } from "../../../backend/src/db";
import styles from "../styles/formFiller.module.css";

const FormFiller: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading, error } = useGetFormByIdQuery(id!);
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const { answers, handleAnswerChange, isFormValid } = useFormFiller(
    form?.questions || [],
  );

  if (isLoading)
    return <div className={styles.loading}>The form is loading...</div>;
  if (error || !form)
    return <div className={styles.error}>Error: The Form not found</div>;

  const handleSubmit = async () => {
    try {
      await submitResponse({ formId: id!, answers }).unwrap();
      alert("The form was sent succesfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending");
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>{form.title}</h1>
        {form.description && <p>{form.description}</p>}
      </header>

      <div className={styles.questionsList}>
        {form.questions.map((q) => (
          <div key={q.id} className={styles.questionCard}>
            <p className={styles.questionTitle}>{q.title}</p>

            {(q.type as string) === QuestionType.TEXT && (
              <input
                type="text"
                className={styles.textInput}
                placeholder="Your answer"
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            )}

            {(q.type as string) === QuestionType.DATE && (
              <input
                type="date"
                className={styles.dateInput}
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            )}

            {(q.type as string) === QuestionType.MULTIPLE_CHOICE && (
              <div className={styles.optionsList}>
                {q.options?.map((opt) => (
                  <label key={opt.id} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      checked={answers[q.id] === opt.text}
                      onChange={() => handleAnswerChange(q.id, opt.text)}
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            )}

            {(q.type as string) === QuestionType.CHECKBOX && (
              <div className={styles.optionsList}>
                {q.options?.map((opt) => (
                  <label key={opt.id} className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      checked={((answers[q.id] as string[]) || []).includes(
                        opt.text,
                      )}
                      onChange={(e) => {
                        const currentAnswers =
                          (answers[q.id] as string[]) || [];
                        const newAnswers = e.target.checked
                          ? [...currentAnswers, opt.text]
                          : currentAnswers.filter((val) => val !== opt.text);
                        handleAnswerChange(q.id, newAnswers);
                      }}
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        <Link to="/" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </footer>
    </main>
  );
};

export default FormFiller;
