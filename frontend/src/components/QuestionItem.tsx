import { Minus, Trash2 } from "lucide-react";
import styles from "../styles/QuestionItem.module.css";

interface Option {
  id: string;
  text: string;
}

interface QuestionProps {
  id: string;
  title: string;
  type: string;
  options?: Option[];
  onUpdate: (updatedQuestion: any) => void;
  onDelete: (id: string) => void;
}

const QuestionItem = ({
  id,
  title,
  type,
  options = [],
  onUpdate,
  onDelete,
}: QuestionProps) => {
  const handleChange = (updates: any) => {
    onUpdate({
      id,
      title,
      type,
      options,
      ...updates,
    });
  };

  const handleAddOption = () => {
    const newOption: Option = {
      id: `opt-${Date.now()}`,
      text: `Option ${options.length + 1}`,
    };
    handleChange({ options: [...options, newOption] });
  };

  const handleOptionChange = (index: number, newText: string) => {
    const newOptions = options.map((opt, i) => {
      if (i === index) {
        return { ...opt, text: newText };
      }
      console.log("New text:", newText);
      return opt;
    });

    handleChange({ options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    handleChange({ options: newOptions });
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.row}>
        <input
          className={styles.questionInput}
          value={title}
          placeholder="Text..."
          onChange={(e) => handleChange({ title: e.target.value })}
        />

        <select
          className={styles.typeSelect}
          value={type}
          onChange={(e) => handleChange({ type: e.target.value })}
        >
          <option value="TEXT">Short answer</option>
          <option value="CHECKBOX">Checkboxes</option>
          <option value="DATE">Date</option>
        </select>

        <button
          type="button"
          className={styles.deleteQuestionBtn}
          onClick={() => {
            if (window.confirm("Delete this question?")) {
              onDelete(id);
            }
          }}
          title="Delete question"
        >
          <Trash2 size={20} strokeWidth={1.5} />
        </button>
      </div>

      {type === "TEXT" ? (
        <div className={styles.textAnswerLine}>Short answer text</div>
      ) : (
        <div className={styles.optionsList}>
          {options.map((opt, index) => (
            <div key={opt.id} className={styles.optionRow}>
              <input
                type="checkbox"
                disabled
                className={styles.checkboxDummy}
              />

              <input
                className={styles.optionInput}
                value={opt.text}
                placeholder={`Variant ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />

              <button
                type="button"
                className={styles.removeOptionBtn}
                onClick={() => handleRemoveOption(index)}
                title="Delete variant"
              >
                <Minus size={18} strokeWidth={2} />
              </button>
            </div>
          ))}

          <button
            type="button"
            className={styles.addOptionBtn}
            onClick={handleAddOption}
          >
            + Add option
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
