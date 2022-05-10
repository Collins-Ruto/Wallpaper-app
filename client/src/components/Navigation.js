import React from 'react'
import { Link } from "react-router-dom";
import devsq1 from "../images/devsq1.svg";
import '../styles/Wallpaper.css'

export default function Navigation() {
    var bar = false;
    function switchBar() {
        bar = !bar
  }
  return (
    <div>
        <div className="wall-nav">
          <nav className="wall-nav-bar wall-nav-item trans">
            <div className="wall-nav-logo wall-nav-item trans">
              <Link className="trans" to="/">
                <img className="trans" src={devsq1} alt="devsquest"></img>
              </Link>
            </div>
            <div className="wall-nav-search wall-nav-item trans">
              <input placeholder="search for images"></input>
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <ul className="wall-nav-links wall-nav-item trans">
              <Link className="wall-nav-link mid-w trans" to="#">
                <li className="trans wall-nav-txt">Explore</li>
                <i className="fa-solid fa-arrow-pointer wall-nav-icon"></i>
              </Link>
              <Link className="wall-nav-link trans" to="/upload">
                <li className="trans wall-nav-txt">Upload</li>
                <i className="fas fa-upload wall-nav-icon"></i>
              </Link>
              <Link className="wall-nav-link trans" to="/favorites">
                <li className="trans wall-nav-txt">Favorites</li>
                <i className="fas fa-heart wall-nav-icon trans"></i>
              </Link>
              <Link className="wall-nav-link trans" to="/login">
                <li className="trans wall-nav-txt">Login</li>
                <i className="fa-solid fa-user trans wall-nav-icon"></i>
              </Link>
            </ul>
            <div onClick={switchBar} className="wall-bar trans">
              {!bar ? (
                <i id="hamburger" className="fa fa-bars" aria-hidden="true"></i>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )}
            </div>
          </nav>
        </div>
    </div>
  )
}
