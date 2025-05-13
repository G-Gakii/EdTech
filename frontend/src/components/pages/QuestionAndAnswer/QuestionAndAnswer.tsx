import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import styles from "./QuestionAndAnswer.module.css";
import { axiosInstanceNoInterceptor } from "../../../services/apiInterceptor";
import { Question } from "../../../interface/question";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const QuestionAndAnswer = () => {
  const [Allquestions, setAllQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setselectedSubject] = useState("");
  const [searchQuestion, setsearchQuestion] = useState("");
  const navigate = useNavigate();

  // get all the questions
  const fetchQuestions = async () => {
    const res = await axiosInstanceNoInterceptor.get("/learning/question");
    console.log(res.data.results);

    setAllQuestions(res.data.results);
    setQuestions(res.data.results);
  };

  // get all available subjects
  const fetchSubjects = () => {
    const subjects: string[] = [];
    for (let question of Allquestions) {
      if (!subjects.includes(question.subject)) {
        subjects.push(question.subject);
      }
    }
    setSubjects(subjects);
  };

  // Filter Question by subject
  const handleChange = (subject: string) => {
    setselectedSubject(subject);
    if (subject == "") {
      setQuestions(Allquestions);
    } else {
      let filteredQuestions = Allquestions.filter(
        (question) => question.subject === subject
      );
      setQuestions(filteredQuestions);
    }
  };

  // filter by title
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setsearchQuestion(searchText);
    const questions = Allquestions.filter((question) =>
      question.question.toLowerCase().includes(e.target.value)
    );
    setQuestions(questions);
  };
  useEffect(() => {
    fetchSubjects();
  }, [Allquestions]);
  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <>
      <div className={`container p-3 ${styles.mainContainer}`}>
        <NavBar />
        <h1>Q&A Forum</h1>
        <input
          className={`bg-light p-4 my-5 ${styles.search}`}
          type="text"
          placeholder="Search question..."
          onChange={handleSearch}
        />
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <section className="">
              <h2>Filter by Subject</h2>
              <h3>Subjects</h3>
              <div className="form-check fs-4">
                <input
                  className="form-check-input "
                  type="radio"
                  name="radioDefault"
                  id="radioDefault2"
                  checked={selectedSubject === ""}
                  onChange={() => handleChange("")}
                />
                <label className="form-check-label" htmlFor="radioDefault2">
                  All
                </label>
              </div>
              {subjects.map((subject, index) => {
                return (
                  <div className="form-check fs-4" key={index}>
                    <input
                      className="form-check-input "
                      type="radio"
                      name="radioDefault"
                      id="radioDefault2"
                      checked={selectedSubject === subject}
                      onChange={() => handleChange(subject)}
                    />
                    <label
                      className="form-check-label text-capitalize "
                      htmlFor="radioDefault2"
                    >
                      {subject}
                    </label>
                  </div>
                );
              })}
            </section>

            <button
              onClick={() => {
                navigate("/question");
              }}
              className={`btn btn-light ${styles.card__button}`}
            >
              Ask a New Question
            </button>
          </div>
          <div className={`d-flex flex-column  ${styles.container}`}>
            {questions.map((question) => {
              return (
                <div className={`card my-3 `}>
                  <div className="card-body">
                    <h5 className="card-title my-3 text-capitalize">
                      {question.question}
                    </h5>
                    <div className="d-flex align-items-center mb-3">
                      <button className=" btn me-5">{question.subject}</button>
                      <span>
                        Asked by{" "}
                        <span className="text-capitalize">
                          {question.student}
                        </span>{" "}
                        on {new Date(question.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>{question.answer.length} Answers </span>
                      <button className={`btn `}>View Question</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionAndAnswer;
