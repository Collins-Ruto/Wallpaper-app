import React, { useEffect } from "react";
import ImageSelect from "../components/ImageSelect";
import Navigation from "../components/Navigation";
import "../styles/Wallpaper.css";

export default function Wallpaper({user, setUser, favs, usr}) {
  
  const [datab, setData] = React.useState([]);
  const [count, setcount] = React.useState(2);
  const [image, setImage] = React.useState();
  const [index, setIndex] = React.useState(1)
  const [searchIn, setSearchIn] = React.useState("");
  const [querys, setQuerys] = React.useState(`curated?page=${count}`)
  
  React.useEffect(() => {
    fetch(`https://api.pexels.com/v1/${querys}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: '',
      }
    })
      .then((res) => res.json())
      .then((data) =>!favs && setData((prev) => prev.concat(data.photos)));
    return () => {};
  }, [count, favs, querys])

  useEffect(() => {
  const locUser = JSON.parse(localStorage.getItem('user'));
  if (locUser) {
   !user && setUser(locUser);
  }
}, [setUser, user]);
  
  function nextPage() {
    setcount((count) => count + 1);
    setQuerys(`curated?page=${count + 1}`)
  }
  console.log(count, querys)
  
  //https://api.imgflip.com/get_memes)
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

  function clickHandler(img, index) {
    setImage(img)
    setIndex(index)
    console.log("click", index, datab[index].url)
  }
  function nextImg(){
    if (index === datab.length - 2) {
      nextPage()
    }
    let newIdx = index + 1
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
  function prevImg(){
    if (index === 0) {
      var newIdx = datab.length - 1
    } else {
         newIdx = index - 1
    }
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
  function favImage(img){
    if (!user) {return}
    let tempDt = [...datab]
    tempDt[img] = datab[img].liked ? 
    {...tempDt[img], liked: false}: {...tempDt[img], liked: true}
    setData(tempDt)
    if (!user){return}
    // remove unliked images from the array
    if (datab[img].liked) {
      const unFav = user.favorites.indexOf(img)
      user.favorites.splice(unFav, 1)
      console.log(user.favorites)
      return
    }
    //  Add loved images to user Favorites
    const faImg = datab[img]
    !user.favorites && setUser({...user, favorites: []})
    let tempUsr = user
    if (tempUsr.favorites.includes(faImg)){console.log("match")}
    console.log("faImg", faImg)
    tempUsr.favorites = [...tempUsr.favorites, faImg]
    setUser(tempUsr)
    localStorage.setItem("user", JSON.stringify(tempUsr))
    console.log(user.favorites.indexOf(faImg))
    console.log("homes ", user)
  }
  useEffect(() => {
    favs && setData(favs)
    return
  }, [favs])
  
  console.log(datab)
  const imageCard = datab.map((image) => {
    return (
      <div className="image-card trans" key={image.id} >
        <img onClick={() => clickHandler(image, datab.indexOf(image))} src={image.src.large} alt=""></img>
        <div className="image-act">
          {!image.liked ? <i onClick={() => favImage(datab.indexOf(image))} className="fa-regular fa-heart" aria-hidden="true"></i>
          : <i onClick={() => favImage(datab.indexOf(image))} className="fa-solid fa-heart image-favs" aria-hidden="true"></i>}
          <i className="fa-regular fa-circle-down"></i>
          <i className="fa fa-share" aria-hidden="true"></i>
        </div>
      </div>
    );
  });

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
      <div className="wallpaper-page">{imageCard}</div>
      {favs? "": <div className="footer" onClick={nextPage}>
        <button>Load More ...</button>
      </div>}
    </div>
  );
}
