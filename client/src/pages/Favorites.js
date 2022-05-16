import React from 'react'
import { Link } from 'react-router-dom'
import Wallpaper from './Wallpaper'

export default function Favorites({user}) {
  const favs = user.favorites
  return (
    <div>
        <div className="favorite">
            {user?
            (favs? <Wallpaper user={user} favs={favs}/> : <div>You currently don't have any favorite photos</div>) :
              <div>Please <Link to="/login">Login</Link> first to access your favorites photos</div>}
        </div>
    </div>
  )
}
