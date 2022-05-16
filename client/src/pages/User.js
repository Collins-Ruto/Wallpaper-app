import React from 'react'
import profile from '../images/ripplelg.svg'
import Wallpaper from './Wallpaper'
import '../styles/User.css'
import { useNavigate } from "react-router-dom";

export default function User({user, setUser}) {
  const favs = user.favorites
  const history = useNavigate()
  const logout = ()=> {
    setUser(null)
    history("/");
  }
  return (
    <>
      <div className="user-page">
            <div className='usr-bar' >
              <div className='user-pro'>
                <img src={profile}  alt=""></img>
                <h1>{user.name}</h1>
                <h3>{user.about || ""}</h3>
                <button onClick={logout}>LogOut</button>
              </div>
            </div>
            <div>
              <h2>Your Favorite Photos</h2>
              <Wallpaper user={user} favs={favs} usr/>
            </div>
      </div>
    </>
  )
}
