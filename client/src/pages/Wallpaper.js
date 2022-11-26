import axios from "axios";
import React, { useEffect, useMemo } from "react";
import ImageSelect from "../components/ImageSelect";
import Navigation from "../components/Navigation";
import "../styles/Wallpaper.css";

export default function Wallpaper({user, setUser, favs, usr}) {
  
  const [datab, setData] = React.useState([]);
  const [count, setcount] = React.useState(2);
  const [image, setImage] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = React.useState(1)
  const [searchIn, setSearchIn] = React.useState("");
  const [querys, setQuerys] = React.useState(`curated?page=${count}`)
  const [favIdd, setFavIdd] = React.useState()
  const favIds = useMemo(() => [], []) 
  const allImgIds = []
  
  React.useEffect(() => {
    fetch(`https://api.pexels.com/v1/${querys}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.REACT_APP_PEXELS_API,
      },
    })
      .then((res) => res.json())
      .then((data) => !favs && setData((prev) => prev.concat(data.photos)))
      .then(() => setLoading(false));
    return () => {};
  }, [count, favs, querys])

  useEffect(() => {
    const locUser = JSON.parse(localStorage.getItem('user'));
    // console.log("refresh",locUser)
    if (locUser) {
    !user && setUser(locUser.result);
    }
  }, [setUser, user]);
  
  function nextPage() {
    setcount((count) => count + 1);
    setQuerys(`curated?page=${count + 1}`)
  }
  
  //https://api.imgflip.com/get_memes) => api for free unlimited access to meme images
  function imgSearch(e) {
    const search = e.target.value
    if (search === "") {
      setSearchIn("")
      return
    }
    setSearchIn(search)
    setData([])
    setQuerys(`search?query=${search}&page=${count}`)
  }
  // click handler for images
  function clickHandler(img, index) {
    setImage(img)
    setIndex(index)
  }
  // switch to next image
  function nextImg(){
    if (index === datab.length - 2) {
      nextPage()
    }
    let newIdx = index + 1
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
  // switch to previous image
  function prevImg(){
    if (index === 0) {
      var newIdx = datab.length - 1
    } else {
         newIdx = index - 1
    }
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
  // Favorite images management
  function favImage(img){
    if (!user) {return}
    let tempDt = [...datab]
    tempDt[img] = datab[img].liked ? 
    {...tempDt[img], liked: false}: {...tempDt[img], liked: true}
    setData(tempDt)
    if (!user){return}
    
    // remove unliked images from the favorites array
    if (favIds.includes(datab[img].id)) {
      const deleteFav = {userId: user._id, imageId: datab[img].id}
      const unFav = user.favorites.indexOf(img)
      const unFavId = favIds.indexOf(datab[img].id)
      console.log("unfav 1", favIds)
      user.favorites.splice(unFav, 1)
      favIds.splice(favIds[unFavId], 1)
      console.log("unfav 2", favIds)
      console.log(user.favorites)
      axios
        .delete("https://wallpapers-api.herokuapp.com/users/favorites", {
          data: deleteFav,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(res);
        });
      return
     }

    //  Add loved images to user Favorites in database
    if (!favIds.includes(datab[img].id)) {
    favIds.push(datab[img].id)
    user.favorites.push(datab[img])
    const updateFav = {userId: user._id, image: datab[img]}
    console.log("homes ", user)
    axios
      .put("https://wallpapers-api.herokuapp.com/users/favorites", updateFav)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res);
      });
  }}
  // show favorite images on favorite and user tabs
  useEffect(() => {
    favs && setData(favs)
    return
  }, [favs])

  // Get id of all images on the users favorites list and give them the liked emoji
  for (let image in user?.favorites) {
    favIds.push(user.favorites[image].id)
    // console.log(favIds)
  }
  useEffect(() => {
    setFavIdd(favIds)
  }, [favIds])
  
  console.log(favIdd)

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => {
    return (
      <div key={n} className="skeleton-card image-card">
        <div className="skeleton-img" style={{height: "400px", width: "280px", background:"#E5E4E2"}}></div>
        <div className="skeleton-act image-act">
          <i className="fa-solid fa-heart image-favs" aria-hidden="true"></i>
          <i className="fa-regular fa-circle-down"></i>
          <i className="fa fa-share" aria-hidden="true"></i>
        </div>
      </div>
    );
    }
  );

  const imageCard = datab.map((image) => {
    if (allImgIds.includes(image.id)) {
      // eslint-disable-next-line array-callback-return
      return
    } else {
    allImgIds.push(image.id);
    return (
        <div className="image-card trans" key={image.id} >
          <img onClick={() => clickHandler(image, datab.indexOf(image))} src={image.src.large} alt=""></img>
          <div className="image-act">
            {!favIdd.includes(image.id) ? <i onClick={() => favImage(datab.indexOf(image))} className="fa-regular fa-heart" aria-hidden="true"></i>
            : <i onClick={() => favImage(datab.indexOf(image))} className="fa-solid fa-heart image-favs" aria-hidden="true"></i>}
            <i className="fa-regular fa-circle-down"></i>
            <i className="fa fa-share" aria-hidden="true"></i>
          </div>
        </div>
    );
  }});

  return (
    <div className="wallpaper">
      <div>
        <Navigation user={user}/>
      </div>
      <div className="wall-header">
        {!usr? <section className="wallpaper-home trans" >
        {image? 
        <div className="wal-img-sect">
        <div onClick={() => clickHandler()} className="x-toggle">
          <div className="xmark"></div>
        </div>
        <i onClick={() => prevImg()} className="fas fa-angle-left "></i>
        <i onClick={() => nextImg()} className="fas fa-angle-right "></i>
           <ImageSelect image={datab[index]} user={user} setUser={setUser} />
           </div>
           : ""}
          <div className="wallpaper-search trans">
            <h1 className="trans">
              The image library is available for you. check out our collection
              of high quality wallpapers for your phone, tablet or computer.
            </h1>
            <input value={searchIn} onChange={imgSearch} placeholder="search for images"></input>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </section>: ""}
      </div>
      <div className="wallpaper-page">{loading ? skeleton :imageCard}</div>
      {favs? "": <div className="footer" onClick={nextPage}>
        <button>Load More ...</button>
      </div>}
    </div>
  );
}
