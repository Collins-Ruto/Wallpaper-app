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
                    Like
                </div>
            <div className="img-fav-add" onClick={favImage}>
                {!liked ? <i className="fa-regular fa-heart" aria-hidden="true"></i>
          : <i className="fa-solid fa-heart image-favs" aria-hidden="true"></i>}
                Favorite
            </div>
            <div className="img-download">
                <button>Download</button>
            </div>
            </div>
        </div>
        <div className="img-content">
             <img src={image.src.large} alt=""></img>
        </div>
        <div className="img-alt">{image.alt}</div>
    </div>
  )
}
