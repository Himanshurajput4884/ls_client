import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quizes from "./Quizes/Quizes";
import { ToastContainer, toast } from "react-toastify";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./mix.css";

function MyVerticallyCenteredModal(props) {
    const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    choice5: "",
  });
  const setVal = async (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const navigate = useNavigate();    
  console.log(formData);
  const handleSaveUserDetails = async (e) => {
    e.preventDefault();

    const {fullname,email,choice1,choice2,choice3,choice4,choice5} = formData;
    const token = localStorage.getItem("usersdatatoken");
    if(!fullname || !email || !choice1 || !choice2 || !choice3 || !choice4 || !choice5){
        toast.error("All fields are required.", {
            position: "top-center",
        });
        return;
    }

    try{
        const data = await fetch(`http://localhost:8009/profile`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":token,
                Accept:"application/json",
            },
            body:JSON.stringify({fullname,email,choice1,choice2,choice3,choice4,choice5}),
        })

        const response = await data.json();

        if(response.message === "User details saved"){
            console.log("User details saved");
            props.onHide();
            navigate("/");
        }

    }
    catch(err){
        console.log("Error: ", err);
    }

  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          
            <div style={{padding:"10px 0px"}}>
              <h1>Save your details</h1>
            </div>
              <div style={{width:"60%", display:"flex", flexDirection:"row", justifyContent:"center", padding:"4px 0px"}}>
                <label htmlfor="name">
                  <h4 style={{padding:"0px 10px"}}>Full Name   </h4>
                </label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setVal(e)}
                  required="true"
                  name="fullname" 
                  placeholder="Enter fullname"
                  style={{border:"1px solid black", borderRadius:"4px", padding:"2px 2px"}}
                />
              </div>
              <div style={{width:"60%", display:"flex", flexDirection:"row", justifyContent:"center", padding:"4px 0px"}}>
              <label htmlfor="email">
                <h4 style={{padding:"0px 25px "}}>Email</h4>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setVal(e)}
                required="true"
                name="email" 
                placeholder="Enter email" 
                style={{border:"1px solid black", borderRadius:"4px", padding:"2px 2px"}}
              />
              </div>
          <div style={{padding:"4px 0px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <label htmlfor="Subject 1" style={{padding:"0px 10px"}}>  Subject 1</label>
            <select
              id="subject1"
              name="choice1"
              value={formData.choice1}
              onChange={setVal}
              required="true"
            >
              <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div style={{padding:"4px 0px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <label htmlfor="Subject 2" style={{padding:"0px 10px"}}> Subject 2 </label>
            <select
              id="subject2"
              name="choice2"
              value={formData.choice2}
              onChange={setVal}
              required="true"
            >
                <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div style={{padding:"4px 0px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <label htmlfor="Subject 3" style={{padding:"0px 10px"}}> Subject 3 </label>
            <select
              id="subject3"
              name="choice3"
              value={formData.choice3}
              onChange={setVal}
              required="true"
            >
                <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div style={{padding:"4px 0px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <label htmlfor="Subject 4" style={{padding:"0px 10px"}}> Subject 4 </label>
            <select
              id="subject3"
              name="choice4"
              value={formData.choice4}
              onChange={setVal}
              required="true"
            >
                <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div style={{padding:"4px 0px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <label htmlfor="Subject 5" style={{padding:"0px 10px"}}> Subject 5 </label>
            <select
              id="subject3"
              name="choice5"
              value={formData.choice5}
              onChange={setVal}
              required="true"
            >
                <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          
          </div>
          <Button classname="btn" style={{padding:"8px 8px", margin:"10px 0px"}} onClick={handleSaveUserDetails}>
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Home() {
  const [currQuiz, setCurrQuiz] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    const getAllQuiz = async () => {
      const data = await fetch(`http://localhost:8008/allquizes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await data.json();
      if (res.message === "Success") {
        console.log(res.quizes);
        setCurrQuiz(res.quizes);
      } else {
        console.log("Quiz not fetched");
      }
    };
    getAllQuiz();
  }, []);

  const token = localStorage.getItem("usersdatatoken");
  console.log("Token: ", token);
  useEffect(() => {
    const getUserDetails = async () => {
      const data = await fetch(`http://localhost:8009/check`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            "authorization":token,
            Accept:"application/json",
        }
      });
      const res = await data.json();
      if (res.message === "User Not found") {
        setModalShow(true);
      }
    };
    if (token !== undefined) {
      getUserDetails();
    }
  });

  return (
    <>
      <section>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"20px 20px"}}>
          <h1> All Quizes </h1>
          
        </div>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Card style={{width: '80%', padding:"20px 60px"}}>
        <h5> Upcoming Quizes </h5>
          {currQuiz.length ? (
            <div>
              {currQuiz.map((v) => {
                return <Quizes quiz={v} />;
              })}
            </div>
          ) : (
            <div>There are no quiz pending.</div>
          )}
        </Card>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <ToastContainer/>
      </section>
    </>
  );
}

export default Home;
