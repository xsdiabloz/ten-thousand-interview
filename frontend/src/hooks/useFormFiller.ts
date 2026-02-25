import { useState } from "react";

type AnswerValue = string | string[];

interface Question {
  id: string;
  type: string;
  title: string;
}

type AnswersState = Record<string, AnswerValue>;

export const useFormFiller = (questions: Question[]) => {
  const [answers, setAnswers] = useState<AnswersState>({});

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isFormValid = (): boolean => {
    return questions.every((q) => {
      const answer = answers[q.id];
      if (Array.isArray(answer)) return answer.length > 0;
      return answer !== undefined && answer.trim() !== "";
    });
  };

  return { answers, handleAnswerChange, isFormValid };
};
