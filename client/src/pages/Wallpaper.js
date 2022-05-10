import React from "react";
import "../styles/Wallpaper.css";
import { Link } from "react-router-dom";
import devsq1 from "../images/devsq1.svg";
// import FontAwesomeIcon from "fort-awesome";

export default function Wallpaper() {
  const [datab, setData] = React.useState([]);
  const [count, setcount] = React.useState(0);
  var bar = false;
  function switchBar() {
    setcount((count) => count + 1);
  }
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setData(data.data.memes));
    return () => {};
  }, [count]);

  const imageCard = datab.map((image) => {
    return (
      <div className="image-card trans" key={image.id}>
        <img id={image.id} src={image.url} alt=""></img>

        <div className="image-act">
          <i className="fa-regular fa-heart" aria-hidden="true"></i>
          <i className="fa-regular fa-circle-down"></i>
          <i className="fa fa-share" aria-hidden="true"></i>
        </div>
      </div>
    );
  });

  return (
    <div className="wallpaper">
      <div className="wall-header">
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
              <Link className="wall-nav-link trans" to="#">
                <li className="trans wall-nav-txt">Upload</li>
                <i className="fas fa-upload wall-nav-icon"></i>
              </Link>
              <Link className="wall-nav-link trans" to="#">
                <li className="trans wall-nav-txt">Favorites</li>
                <i className="fas fa-heart wall-nav-icon trans"></i>
              </Link>
              <Link className="wall-nav-link trans" to="#">
                <li className="trans wall-nav-txt">Login</li>
                <i class="fa-solid fa-user trans wall-nav-icon"></i>
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
        <section className="wallpaper-home trans">
          <div className="wallpaper-search trans">
            <h1 className="trans">
              The image library is available for you. check out our collection
              of high quality wallpapers for your phone, tablet or computer.
            </h1>
            <input placeholder="search for images"></input>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </section>
      </div>
      <div className="wallpaper-page">{imageCard}</div>
    </div>
  );
}
