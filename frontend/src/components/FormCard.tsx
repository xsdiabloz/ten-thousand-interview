import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/FormCard.module.css";
import { ArrowRight, FileImage, BarChart2, Edit3 } from "lucide-react";

interface FormCardProps {
  id: string;
  title: string;
  description: string;
}

const FormCard = ({ id, title, description }: FormCardProps) => {
  const navigate = useNavigate();

  const goToEditor = () => navigate(`/forms/${id}`);

  return (
    <div className={styles.card}>
      <div
        className={styles.preview}
        onClick={goToEditor}
        style={{ cursor: "pointer" }}
      >
        <FileImage size={40} strokeWidth={1.5} />
        <div className={styles.editOverlay}></div>
      </div>

      <div className={styles.content}>
        <h3
          className={styles.title}
          onClick={goToEditor}
          style={{ cursor: "pointer" }}
        >
          {title || "Untitled Form"}
        </h3>

        <p className={styles.description}>
          {description || "No description provided"}
        </p>

        <div className={styles.footer}>
          <Link to={`/forms/${id}/fill`} className={styles.link}>
            Send <ArrowRight size={16} />
          </Link>

          <Link to={`/forms/${id}/responses`} className={styles.responsesLink}>
            <BarChart2 size={16} />
            <span>Responses</span>
          </Link>

          <button
            className={styles.editBtn}
            onClick={goToEditor}
            title="Edit form"
          >
            <Edit3 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
