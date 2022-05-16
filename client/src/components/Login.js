import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {GoogleLogin} from 'react-google-login'

import '../styles/Login.css'
import Navigation from './Navigation'
const initialState = {name:"", email:"", password:"", confPass:"", favorites:[]}

const googleSuccess = (res) => {
  console.log(res)
}
const googleFailure = () => {
  console.log("Google sign in was unsuccessful")
}

function Login({user, setUser}) {
  const history = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [eqPass, setEqPass] = useState(true)
  const [isSigned, setIsSigned] = useState(false)
  const userHandler =(e) => {
    e.preventDefault()
    console.log(e.target.value)
    setFormData({...formData, [e.target.name]:e.target.value})
    console.log(e.target.name)
    e.target.name === "confPass" && confirm(e.target.value)
    }
  const submit =(e)=>{
    e.preventDefault()
    setUser(formData)
    history("/");
  }
  const confirm =(conf) =>{
    formData.password === conf && setEqPass(true)
    formData.password !== conf && setEqPass(false)
  }
  console.log("data ",formData)
  console.log("user ",user)
  //value={formData.name}value={formData.email}
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
                <form onSubmit={(e)=>submit(e)}>
                  <label htmlFor="email">Your Email</label>
                <input type="email" name="email" id="email" onChange={()=>{}} value={formData.email} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={()=>{}} value={formData.password} required/>
                <button>Sign In</button>
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
            <GoogleLogin
            clientId="508452009550-ph4gq5i63fjlkgafrvi5dg064p5h3e78.apps.googleusercontent.com"
            render={(renderProps) => {
              <button className="google-sign" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa-brands fa-google"></i>  Sign in with Google</button>
            }}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"

            />
            
            <h4>{isSigned? "Don't": "Already"} have an account? <span onClick={()=>setIsSigned((prev)=>!prev)}>{isSigned? "Sign up": "Sign In"}</span></h4>
        </div>
        </div>}
    </div>
    </>
  )
}

export default Login