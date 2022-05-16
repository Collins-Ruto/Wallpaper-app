import React from 'react'
import profile from '../images/ripplelg.svg'
import Wallpaper from './Wallpaper'

export default function User({user, setUser}) {
  const favs = user.favorites
  return (
    <>
      <div className="">
            {/* <Navigation /> */}
      </div>
      <div className="user-page">
            <div className='usr-bar' >
              <div>background-img</div>
              <div>
                <img src={profile} style={{width: "8rem"}} alt=""></img>
                <h1>{user.name}</h1>
                <h3>{user.about || ""}</h3>
                <button>LogOut</button>
              </div>
            </div>
            <div>
              <Wallpaper user={user} favs={favs} usr/>
            </div>
      </div>
    </>
  )
}
