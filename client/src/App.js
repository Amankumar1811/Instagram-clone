import React from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Login";
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Singup"

//import
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route path="/signup" element={<Signup />} />
       <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;