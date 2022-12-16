import React from 'react'
import '../styles/ImageSelect.css'
import imag from '../images/26.jpg'

export default function ImageSelect({image, user, setUser}) {
    const [liked, setLiked] = React.useState(image.liked)
    console.log(image.src.original)

    function favImage() {
        setLiked(!liked)
        if (!user){return}
        if (user.favorites.includes(image)){return}
    !user.favorites && setUser({...user, favorites: []})
    let tempUsr = user
    console.log("image", image)
    tempUsr.favorites = [...tempUsr.favorites, image]
    setUser(tempUsr)
    console.log("homes ", user)
    }

    function downloadImage(src) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // This tells the browser to request cross-origin access when trying to download the image data.
      // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
      img.src = src;
      img.onload = () => {
        // create Canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // create a tag
        const a = document.createElement("a");
        a.download = "download.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
    }



  return (
    <div className="img-select-cont">
      <div className="img-sect-head">
        <div className="img-owner">
          <img src={imag} alt=""></img>
          <h3>{image.photographer}</h3>
        </div>
        <div className="img-head-rgt">
          <div className="img-likes">
            <i className="fa-regular fa-thumbs-up "></i>
          </div>
          <div className="img-fav-add" onClick={favImage}>
            {!liked ? (
              <i className="fa-regular fa-heart" aria-hidden="true"></i>
            ) : (
              <i
                className="fa-solid fa-heart image-favs"
                aria-hidden="true"
              ></i>
            )}
          </div>
          <div onClick={() => downloadImage(image.src.large)} className="img-download">
            <i className="fa-regular fa-circle-down"></i>
          </div>
        </div>
      </div>
      <div className="img-content">
        <img src={image.src.large} alt=""></img>
      </div>
      <div className="img-alt">{image.alt}</div>
    </div>
  );
}
