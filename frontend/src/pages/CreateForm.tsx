import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../store/api";
import { MoveDown } from "lucide-react";
import styles from "../styles/createForm.module.css";

const CreateForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createForm, { isLoading }] = useCreateFormMutation();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim()) return alert("Title is required!");

    try {
      await createForm({ title, description }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Can't create the form...", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          New form <MoveDown />
        </h1>

        <div className={styles.inputGroup}>
          <input
            className={styles.textField}
            placeholder="Form title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            className={styles.textField}
            placeholder="Form description"
            style={{ resize: "none" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.createBtn} onClick={handleSave}>
            Create form
          </button>
          <button className={styles.cancelBtn} onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
