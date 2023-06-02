import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const socket = io("http://localhost:8007");

const RunQuiz = () => {
  const [question, setQuestion] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer2, setTimer] = useState(60);
  let timer;
  console.log(selectedOption);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Connect to the server
    socket.on('connect', () => {
      console.log("Connected to client");
      toast.success('Connected to server');

      // Start the quiz after a 5-minute delay
      setTimeout(() => {
        socket.emit('startQuiz');
      }, 20);
    });

    // Receive a new question from the server
    socket.on('question', (data) => {
      setQuestion(data);
      setSelectedOption(null); // Reset selected option for each question
      startTimer();
      setTimer(60);
    });

    // Receive the score from the server
    socket.on('score', (data) => {
      const receivedScore = data.score;
      setScore((prevScore) => prevScore + receivedScore);
    });

    // Handle disconnection from the server
    socket.on('disconnect', () => {
      toast.error('Disconnected from server');
      navigate("/");
      clearTimeout(timer);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      submitAnswer(null); // Submit no response when the timer runs out
    }, 60 * 1000);
  };

  const cardStyle = (option) => ({
    padding: "10px 10px",
    margin: "0px 4px",
    cursor: "pointer",
    backgroundColor: selectedCardIndex === option ? "#f1f1f1" : hoveredIndex === option ? "#f1f1f1" : "transparent",
  });

  const hoverStyle = {
    backgroundColor: "#f1f1f1",
  };

  const submitAnswer = (answer) => {
    clearTimeout(timer);
    setSelectedOption(answer);
    socket.emit("answer", { answer:answer, responseTime: timer2 });
    setQuestion(null); // Clear the current question to show "Loading..." for the next question
  };

  const handleCardClick = (option) => {
    setSelectedCardIndex(option);
    setSelectedOption(option);
  };

  if (!question) {
    return <div style={{margin:"100px 100px", padding:"80px 80px"}}><h1>Loading...</h1></div>;
  }

  return (
    <>
      <div style={{display:"flex", justifyContent:"center", alignContent:"center", padding:"10px 20px"}}>
        <h1> Quiz </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "80%", padding: "20px 20px" }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px 0px",
                width: "100%",
                flexDirection:"column",

              }}
            >
              <h3>{question.question}</h3>
            </div>
            <div style={{display:"flex", justifyContent:"end", padding:"0px 10px "}}>
            <p> { timer2 } secs </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: "30px 0px",
              }}
            >
              {question.options.map((option, index) => (
                <Card
                  key={index}
                  style={{
                    ...cardStyle(option),
                    ...(hoveredIndex === option ? hoverStyle : null),
                  }}
                  onMouseEnter={() => setHoveredIndex(option)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(option)}
                >
                  <div style={{ cursor: "pointer" }}>{option}</div>
                </Card>
              ))}
            </div>
          </Card>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0px",
            }}
          >
            <Button onClick={() => submitAnswer(selectedOption)}>Submit</Button>
          </div>
          <Card style={{ margin: "20px 0px", padding: "20px 20px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <h4> Total Score: {score} </h4>
            </div>
          </Card>
        </Card>
        <ToastContainer/>
      </div>
    </>
  );
};

export default RunQuiz;
