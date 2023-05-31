import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [Logintoggle, setLogintoggle] = useState("login");

  const [lpassShow, setLPassShow] = useState(false);
  const [rpassShow, setRPassShow] = useState(false);
  const [LoginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [RegisterForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const LoginSetVal = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value });
  };
  const RegisterSetVal = (e) => {
    setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value });
  };

  const history = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    const formdata = {
      username: LoginForm.username,
      password: LoginForm.password,
    };

    try {
      const data = await fetch(`http://localhost:8009/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const res = await data.json();
      console.log(res);

      if (res.message === "New token added to set" || res.message === "New row and token is added.") {
        localStorage.setItem("usersdatatoken", res.token);
        setLoginForm({
          username: "",
          password: "",
        });
        toast.success("Logged In", {
          position: "top-center",
        });
        setTimeout(() => {
          history("/");
        }, 3000);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    const formdata = {
      username: RegisterForm.username,
      name: RegisterForm.name,
      password: RegisterForm.password,
    };

    try {
      const data = await fetch(`http://localhost:8009/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const res = await data.json();

      console.log(res);
      if (res.message === "New token added to set" || res.message === "New row and token is added.") {

        localStorage.setItem("usersdatatoken", res.token);
        setLoginForm({
          username: "",
          password: "",
          name: "",
        });
        toast.success("Logged In", {
          position: "top-center",
        });
        setTimeout(() => {
          history("/");
        }, 3000);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const toggleLogin = () => {
    Logintoggle === "login"
      ? setLogintoggle("register")
      : setLogintoggle("login");
  };

  return (
    <section>
      {Logintoggle === "login" ? (
        <>
          <div className="form_data">
            <div className="form_heading">
              <h1>Welcome Back, Log In</h1>
              <p>Hi, we are you glad you are back. Please login.</p>
            </div>

            <form>
              <div className="form_input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={LoginForm.username}
                  onChange={(e) => LoginSetVal(e)}
                  name="username"
                  id="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <input
                    type={!lpassShow ? "password" : "text"}
                    onChange={(e) => LoginSetVal(e)}
                    value={LoginForm.password}
                    name="password"
                    id="password"
                    placeholder="Enter Your password"
                  />
                  <div
                    className="showpass"
                    onClick={() => setLPassShow(!lpassShow)}
                  >
                    {!lpassShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>

              <button className="btn" onClick={(e) => loginuser(e)}>
                Login
              </button>
              <p>
                Don't have an Account?{" "}
                <NavLink onClick={() => toggleLogin()}>Sign Up</NavLink>
              </p>
            </form>
            <ToastContainer />
          </div>
        </>
      ) : (
        <>
          <div className="form_data">
            <div className="form_heading">
              <h1>Register Here</h1>
            </div>

            <form>
              <div className="form_input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={RegisterForm.name}
                  onChange={(e) => RegisterSetVal(e)}
                  name="name"
                  id="name"
                  placeholder="Enter name"
                />
              </div>
              <div className="form_input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={RegisterForm.username}
                  onChange={(e) => RegisterSetVal(e)}
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <input
                    type={!rpassShow ? "password" : "text"}
                    onChange={(e) => RegisterSetVal(e)}
                    value={RegisterForm.password}
                    name="password"
                    id="password"
                    placeholder="Enter Your password"
                  />
                  <div
                    className="showpass"
                    onClick={() => setRPassShow(!rpassShow)}
                  >
                    {!rpassShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>

              <button className="btn" onClick={(e) => RegisterUser(e)}>
                Register
              </button>
              <p>
                Have an Account?{" "}
                <NavLink onClick={() => toggleLogin()}>Sign Up</NavLink>
              </p>
            </form>
            <ToastContainer />
          </div>
        </>
      )}
    </section>
  );
};

export default Login;
