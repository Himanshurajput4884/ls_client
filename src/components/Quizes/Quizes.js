import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Quizes({ quiz }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const quizname = quiz.quizname;
  const navigate = useNavigate();
  const token = localStorage.getItem("usersdatatoken");

  const dateString = "2023-05-31T18:30:00.000Z";

  const date = new Date(quiz.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  useEffect(() => {
    const checkRegistration = async () => {
      const data = await fetch(`http://localhost:8008/check/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token,
          Accept: "application/json",
        },
        body: JSON.stringify({ quizname }),
      });

      const response = await data.json();

      if (response.message === "Have registered") {
        console.log("registeres");
        setIsRegistered(true);
      }
    };
    checkRegistration();
  }, []);


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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": token,
            Accept: "application/json",
          },
          body: JSON.stringify({ quizname }),
        });

        const res2 = await data2.json();
        if (res2.message === "Register for quiz") {
          toast.success("Registered", {
            position: "top-right",
          });
        }
        console.log(res2);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleLoginQuiz = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <Card style={{ margin: "4px 0px" }}>
      <Card.Header as="h5">{quiz.quizname}</Card.Header>
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Card.Text>Subject 1: {quiz.choice1}</Card.Text>
            <Card.Text>Subject 2: {quiz.choice2}</Card.Text>
            <Card.Text>Subject 3: {quiz.choice3}</Card.Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Card.Text>Prize: $ {quiz.prize}</Card.Text>
            <Card.Text>Date: {formattedDate}</Card.Text>
            <Card.Text>Time:{quiz.time}</Card.Text>
          </div>
            <div>
              {token !== null ? (
                isRegistered === true ? (
                  <h3 style={{color:"green"}}> Registered </h3>
                ) : (
                  <Button
                    onClick={handleRegisterQuiz}
                    variant="primary"
                    style={{ height: "50px" }}
                  >
                    Register
                  </Button>
                )
              ) : (
                <Button
                  onClick={handleLoginQuiz}
                  variant="primary"
                  style={{ height: "50px" }}
                >
                  Login First!
                </Button>
              )}
            </div>
          </div>
      </Card.Body>
    </Card>
  );
}

export default Quizes;
