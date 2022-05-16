import React from 'react'
import Wallpaper from './Wallpaper'

export default function Favorites({user}) {
  const favs = user.favorites
  return (
    <div>
        <div className="favorite">
            <Wallpaper user={user} favs={favs}/>
        </div>
    </div>
  )
}
