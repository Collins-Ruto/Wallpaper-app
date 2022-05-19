import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import '../styles/Login.css'
import Navigation from './Navigation'
import GoogleAuth from './GoogleAuth';
const initialState = {name:"", email:"", password:"", favorites:[]}

function Login({user, setUser}) {
  const history = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [eqPass, setEqPass] = useState(true)
  const [isSigned, setIsSigned] = useState(false)
  const userHandler =(e) => {
    e.preventDefault()
    console.log(e.target.value)
    setFormData({...formData, [e.target.name]:e.target.value})
    e.target.name === "confPass" && confirm(e.target.value)
    }
  const submit =(e)=>{
    e.preventDefault()
    setUser(formData)
    history("/");
    localStorage.setItem("user", JSON.stringify(formData))
    console.log("data ax ",formData)
    axios.post('http://localhost:5000/users', formData)
    .then(res => console.log("axios", res.data))
  }
  const signIn =(e)=>{
    e.preventDefault()
    history("/");
    console.log("data ax get ",formData)
    axios.post('http://localhost:5000/users/signin', formData)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data))
        console.log("axios", res.data)
      })
  }
  const confirm =(conf) =>{
    formData.password === conf && setEqPass(true)
    formData.password !== conf && setEqPass(false)
  }
  console.log("data ",formData)
  console.log("user ",user)
  return (
    <>
    <Navigation user={user} setUser={setUser}/>
    <div className="login-page">
        {user ? 
        <div>
            <h1>You are logged in, wanna go back to images</h1>
            <Link to="/" className="back-btn">Back Home</Link>
        </div> : 
        <div className="login-cont">
          <i className="fa fa-user" aria-hidden="true"></i>
            <h3>Sign up</h3>
            <div>
              {isSigned ? <div>
                <form onChange={(e)=>userHandler(e)} onSubmit={(e)=>signIn(e)}>
                  <label htmlFor="email">Your Email</label>
                <input type="email" name="email" id="email" onChange={()=>{}} value={formData.email} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={()=>{}} value={formData.password} required/>
                <button onClick={(e)=>signIn(e)}>Sign In</button>
                </form>
              </div> :
            <form onChange={(e)=>userHandler(e)} onSubmit={(e)=>submit(e)}>
                <label htmlFor="name">Your Name</label>
                <input type="text" name="name"  id="name" onChange={()=>{}} required/>
                <label htmlFor="email">Your Email</label>
                <input type="email" name="email" id="email" onChange={()=>{}} value={formData.email} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={()=>{}} value={formData.password} required/>
                <label htmlFor="conf-pass">Confirm Password</label>
                <input type="password" name="confPass" id="conf-pass" onChange={()=>{}} value={formData.confPass} required/>
                <small>{!eqPass? "Passwords do not match!": ""}</small>
                <button onClick={(e)=>submit(e)}>Sign Up</button>
            </form> }
            <GoogleAuth user={user} setUser={setUser} />
            <h4>{isSigned? "Don't": "Already"} have an account? <span onClick={()=>setIsSigned((prev)=>!prev)}>{isSigned? "Sign up": "Sign In"}</span></h4>
        </div>
        </div>}
    </div>
    </>
  )
}

export default Login