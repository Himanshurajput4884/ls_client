import React from "react";
import { ToastContainer, toast } from "react-toastify";

function Quizes({ quiz }) {
  const quizname = quiz.quizname;

  const token = localStorage.getItem("usersdatatoken");

  const dateString = "2023-05-31T18:30:00.000Z";

  const date = new Date(quiz.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;



  const handleRegisterQuiz = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const data = await fetch(`http://localhost:8008/eligible`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token,
          Accept: "application/json",
        },
        body: JSON.stringify({ quizname }),
      });

      const res = await data.json();

      if (res.message === "Not eligible.") {
        toast.error("Your interest doesn't matches with Subjects.", {
          position: "top-center",
        });
      } else if (res.message === "Eligible") {
        const data2 = await fetch(`http://localhost:8008/register/quiz`, {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "authorization": token,
          Accept: "application/json",
          },
          body:JSON.stringify({quizname})
        });

        const res2 = await data2.json();
        console.log(res2);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div
      className="main"
      style={{
        border: "2px solid black",
        padding: "10px 10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>
        <p>Quiz Name: {quiz.quizname}</p>
        <p>Subject1: {quiz.choice1}</p>
        <p>Subject2: {quiz.choice2}</p>
        <p>Subject3: {quiz.choice3}</p>
        <p>Prize: {quiz.prize}</p>
        <p>Date: {formattedDate}</p>
        <p>Time:{quiz.time}</p>
      </div>
      <div>
        <button onClick={handleRegisterQuiz}> Register </button>
      </div>
    </div>
  );
}

export default Quizes;
