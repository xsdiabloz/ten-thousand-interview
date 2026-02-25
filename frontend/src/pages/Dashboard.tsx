import FormCard from "../components/FormCard";
import { useGetFormsQuery, type Form } from "../store/api";
import { Link } from "react-router-dom";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const { data: forms, isLoading } = useGetFormsQuery();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className="spinner">
          <div className="spin"></div>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <h1>My forms</h1>
            <Link to="/create">
              <button className={styles.createBtn}>Create form</button>
            </Link>
          </div>

          <div className={styles.grid}>
            {forms?.map((form: Form) => (
              <FormCard
                key={form.id}
                id={form.id}
                title={form.title}
                description={form.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
