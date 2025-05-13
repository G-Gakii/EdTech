import { useNavigate } from "react-router-dom";
import styles from "./Question.module.css";

import axiosInstance from "../../../services/apiInterceptor";
import React, { useState } from "react";
import { QuestionPOsted } from "../../../interface/question";

const Question = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<QuestionPOsted>({
    subject: "",
    question: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const AskQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = axiosInstance.post("/learning/question", question);
      console.log(res);

      navigate("/question/answer");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={`${styles.form}`} onSubmit={AskQuestion}>
      <h1>Ask a question</h1>
      <div className="mb-3">
        <label htmlFor="exampleQuestion" className="form-label fs-4">
          Question Title
        </label>
        <input
          type="text"
          className="form-control p-3"
          id="question"
          name="question"
          value={question.question}
          onChange={handleChange}
          aria-describedby="questionHelp"
          placeholder="e.g What is React?"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label fs-4">
          Subject
        </label>
        <input
          type="text"
          className="form-control p-3"
          id="subject"
          name="subject"
          value={question.subject}
          placeholder="e.g tech"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label fs-5"
        >
          Description (Optinal)
        </label>
        <textarea
          className="form-control"
          onChange={handleChange}
          value={question.description}
          id="exampleFormControlTextarea1"
          rows={5}
        ></textarea>
      </div>
      <div className={`${styles.form__buttonContainer}`}>
        <button
          type="submit"
          className={`btn  p-3 w-1/2 ${styles.form__buttonContainer__button__submit} fs-5`}
        >
          Submit Question
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className={`btn btn-light p-3 fs-5 ${styles.form__buttonContainer__button__cancel}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Question;
