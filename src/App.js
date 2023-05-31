import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import MyQuizes from "./components/UserQuiz/MyQuizes";
import 'react-toastify/dist/ReactToastify.css';
import RunQuiz from "./components/UserQuiz/RunQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/quizes" element={<MyQuizes />} />
      <Route path="/play/:quizname" element={<RunQuiz />} />
    </Routes>
  );
}

export default App;
