import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {UserContext}from "../../App"
import M from "materialize-css"
const Signin=() =>{
    const navigate=useNavigate()
    const [password,setPassword] = useState("")
const {state,dispatch}=useContext(UserContext)
     const [email,setEmail] = useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return

        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({

                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.token))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signedin sucessfully",classes:"#00c853 green accent-4"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className ="mycard">
            <div className ="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text"
                placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

                <input type="password"
                placeholder='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()} >Login</button>

  <h6> <Link to="/signup">Don't have an account ?</Link></h6>
         


            </div>

        </div>
    )
}


export default Signin