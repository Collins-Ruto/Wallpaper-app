import React from 'react'
import Navigation from '../components/Navigation'

export default function User({user, setUser}) {
  return (
    <>
      <div className="">
            <Navigation />
      </div>
      <div className="user-page">
            User page
      </div>
    </>
  )
}
