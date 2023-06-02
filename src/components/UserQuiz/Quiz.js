import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
              (currentTime.getMinutes() >= targetTime.getMinutes() && currentTime.getMinutes() < targetTime.getMinutes()+5)
            );
        }
        if(shouldStartQuiz(quiz.date, quiz.time)){
            setTimeToQuiz(true);
        }
    })

    const handleStartQuiz = (e)=>{
        e.preventDefault();
        navigate(`/play/${quizname}`);
    }


  return (
    
      <Card style={{margin:"4px 0px"}}>
        <Card.Header as="h5"> {quiz.quizname} </Card.Header>
        <Card.Body>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}> 
            <div style={{display:"flex", flexDirection:"column"}}>
            <Card.Text>
            Subject 1: {quiz.choice1}
            </Card.Text>
            <Card.Text>
            Subject 2: {quiz.choice2}
            </Card.Text>
            <Card.Text>
            Subject 3: {quiz.choice3}
            </Card.Text>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <Card.Text>
            Prize: $ {quiz.prize}
            </Card.Text>
            <Card.Text>
            Date: {formattedDate}
            </Card.Text>
            <Card.Text>
            Time:{quiz.time}
            </Card.Text>
            </div>
            {
               timeToQuiz === true 
              ? 
              <Button onClick={handleStartQuiz} variant="primary" style={{height:"50px"}}> Start Quiz </Button>
              :
              <Button variant="primary" style={{height:"50px"}}> Quiz Yet not started </Button>
            } 
            {/* <Button onClick={handleStartQuiz} variant="primary" style={{height:"50px"}}> Start Quiz </Button> */}
          </div>
        </Card.Body>
      </Card>
      
  );
}

export default Quiz;
