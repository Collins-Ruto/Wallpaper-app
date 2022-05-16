import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Wallpaper from './Wallpaper'

export default function Favorites({user}) {
  const favs = user?.name && user.favorites
  return (
    <div>
      <div>
        {user? "" : <Navigation/>}
      </div>
        <div className="favorite">
            {user?
            (favs? <Wallpaper user={user} favs={favs}/> : <div>You currently don't have any favorite photos</div>) :
              <div><h1 style={{margin: "30% 10%"}}
              >Please <Link to="/login">Login</Link> first to access your favorites photos</h1></div>}
        </div>
    </div>
  )
}
