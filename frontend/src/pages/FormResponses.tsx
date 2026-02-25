import { useParams } from "react-router-dom";
import { useGetFormByIdQuery, useGetResponsesQuery } from "../store/api";
import styles from "../styles/responses.module.css";

const FormResponses = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form } = useGetFormByIdQuery(id!);

  const { data: responses, isLoading, error } = useGetResponsesQuery(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <div className={styles.container}>
      <h1>Responses to the form: {form?.title}</h1>

      {responses && responses.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Dispatch date</th>
              {form?.questions.map((q) => (
                <th key={q.id}>{q.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((resp) => (
              <tr key={resp.id}>
                <td>{new Date(resp.createdAt).toLocaleString()}</td>
                {form?.questions.map((q) => (
                  <td key={q.id}>
                    {Array.isArray(resp.answers[q.id])
                      ? resp.answers[q.id].join(", ")
                      : resp.answers[q.id] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No one has responded to this form yet.</p>
      )}
    </div>
  );
};

export default FormResponses;
