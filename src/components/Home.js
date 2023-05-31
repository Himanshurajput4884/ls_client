import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quizes from "./Quizes/Quizes";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
        <section>
          <div classname="form_data">
            <div classname="form_heading">
              <h1>Save your details</h1>
            </div>
            <form>
              <div classname="form_input">
                <label htmlfor="name">
                  <h6>Full Name</h6>
                </label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setVal(e)}
                  required="true"
                  name="fullname" 
                  placeholder="Enter fullname"
                />
              </div>
              <label htmlfor="email">
                <h6>Email</h6>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setVal(e)}
                required="true"
                name="email" 
                placeholder="Enter email" 
              />
            </form>
          </div>
          <div classname="form_input">
            <label htmlfor="Subject 1">Subject 1</label>
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
          <div classname="form_input">
            <label htmlfor="Subject 2"> Subject 2 </label>
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
          <div classname="form_input">
            <label htmlfor="Subject 3"> Subject 3 </label>
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
          <div classname="form_input">
            <label htmlfor="Subject 3"> Subject 4 </label>
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
          <div classname="form_input">
            <label htmlfor="Subject 5"> Subject 5 </label>
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
          <button classname="btn" onClick={handleSaveUserDetails}>
            Create
          </button>
          <ToastContainer/>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}> Submit </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
  const [currQuiz, setCurrQuiz] = useState([]);
  const navigate = useNavigate();
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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <header>
        <button onClick={handleLogin}> Login </button>
      </header>
      <section>
        <div>
          <h1>All Quizes</h1>
          <h5> Pending Quizes </h5>
        </div>
        <div>
          {currQuiz.length ? (
            <div>
              {currQuiz.map((v) => {
                return <Quizes quiz={v} />;
              })}
            </div>
          ) : (
            <div>There are no quiz pending.</div>
          )}
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
