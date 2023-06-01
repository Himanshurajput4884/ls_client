import React, {useState, useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import Quiz from "./Quiz";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';


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
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"10px 10px"}}>
          <h1> My Quizes </h1>
        </div>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Card style={{width: '80%', padding:"20px 60px"}}>
          <h5> Next Quizes </h5>
          {currQuiz.length ? (
            <div>
              {currQuiz.map((v) => {
                return <Quiz quiz={v} />;
              })}
            </div>
          ) : (
            <div>There are no quiz pending.</div>
          )}
        </Card>
        </div>
    </>
  );
}

export default MyQuizes;
