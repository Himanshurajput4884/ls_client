import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Quiz({ quiz }) {
  const quizname = quiz.quizname;
  const [ timeToQuiz, setTimeToQuiz ] = useState(false);
  const token = localStorage.getItem("usersdatatoken");
    const navigate = useNavigate();
  const dateString = "2023-05-31T18:30:00.000Z";

  const date = new Date(quiz.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;


    useEffect(()=>{
        function shouldStartQuiz(dateString, timeString) {
            const targetDate = new Date(dateString);
            const targetTime = new Date(`2000-01-01T${timeString}`);
            const currentTime = new Date();
          
            return (
              currentTime >= targetDate &&
              currentTime.getHours() === targetTime.getHours() &&
              currentTime.getMinutes() === targetTime.getMinutes()
            );
        }
        if(shouldStartQuiz(quiz.date, quiz.time)){
            setTimeToQuiz(true);
        }
    })

    const handleStartQuiz = (e)=>{
        e.preventDefault();
        navigate("/play/quiz");
    }


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
      {
        timeToQuiz === true 
         ?
         (<div>
            <button onClick={ handleStartQuiz }> Start Quiz </button>
         </div>)
         :
         (<div>
            <button> Quiz yet not started </button>
         </div>)
      }
    </div>
  );
}

export default Quiz;
