import React,{useEffect,createContext,useReducer,useContext} from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route ,useNavigate } from "react-router-dom";
//switch not used for now

import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Singup"
import CretePost from "./components/screens/CreatePost"
import UserProfile from "./components/screens/UserProfile"
import {reducer,initialState} from "./reducers/userReducer" 
export const UserContext =createContext()





const Routing =()=>{
  const navigate=useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
     // navigate('/')
    }else{
     // if(!history.location.pathname.startsWith('/reset'))
           navigate('/signin')
    }
  },[])

  
  return(
    
          <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    
    <Route path="/signup" element={<Signup />} />
   <Route exact path="/profile" element={<Profile/>} />
   <Route path="/create" element={<CretePost />} />
   <Route path="/profile/:userid" element={<UserProfile />} />
  </Routes>
    

  )
}

//import
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
  <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
          <NavBar />
  <Routing />
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;