import React, {useState, useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import Quiz from "./Quiz";
import { useNavigate } from "react-router-dom";

function MyQuizes({ quiz }) {
  const [currQuiz, setCurrQuiz] = useState([]);
  const token = localStorage.getItem("usersdatatoken");
  useEffect(() => {
    const getAllQuiz = async () => {
      const data = await fetch(`http://localhost:8008/user/quizes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization":token,
        },
      });

      const res = await data.json();
      if (res.message === "success") {
        console.log(res.quiz);
        setCurrQuiz(res.quiz);
      } else {
        console.log("Quiz not fetched");
      }
    };
    getAllQuiz();
  }, []);


  return (
    <>
      <div>
          <h1> My Quizes </h1>
          <h5> Pending Quizes </h5>
        </div>
        <div>
          {currQuiz.length ? (
            <div>
              {currQuiz.map((v) => {
                return <Quiz quiz={v} />;
              })}
            </div>
          ) : (
            <div>There are no quiz pending.</div>
          )}
        </div>
    </>
  );
}

export default MyQuizes;
