import { Link } from "react-router-dom";
import styles from "../styles/formHeader.module.css";
import { ArrowLeft } from "lucide-react";

interface FormHeaderProps {
  title: string;
  description: string;
}

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className={styles["form-header-card"]}>
      <div className={styles["form-header-accent"]} />
      <h1 className={styles["form-header-title"]}>
        {title || "Untitled Form"}
      </h1>
      <p className={styles["form-header-desc"]}>
        {description || "No description"}
      </p>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft /> Back to Dashboard
      </Link>
    </div>
  );
};

export default FormHeader;
