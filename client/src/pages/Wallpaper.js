import React from "react";
import ImageSelect from "../components/ImageSelect";
import Navigation from "../components/Navigation";
import "../styles/Wallpaper.css";

export default function Wallpaper() {
  // const [datas, setDatas] = React.useState([]);
  const [datab, setData] = React.useState(
    []
  );
  const [count, setcount] = React.useState(1);
  const [image, setImage] = React.useState();
  const [index, setIndex] = React.useState(1)
  function nextPage() {
    setcount((count) => count + 1);
  }
  React.useEffect(() => {
    fetch(`https://api.pexels.com/v1/curated?page=${count}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: 'YOUR_API_KEY_HERE',
      }
    })
      .then((res) => res.json())
      .then((data) => setData((prev) => prev.concat(data.photos)));
    return () => {}
  }, [count])
  //https://api.imgflip.com/get_memes)

  function clickHandler(img, index) {
    setImage(img)
    setIndex(index)
    console.log("click", index, datab[index].url)
  }
  function nextImg(){
    let newIdx = index + 1
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
  function prevImg(){
    let newIdx = index - 1
    setImage(datab[newIdx].url)
    setIndex(newIdx)
  }
   console.log("dtays",datab[3])
  const imageCard = datab.map((image) => {
    return (
      <div className="image-card trans" key={image.id} onClick={() => clickHandler(image, datab.indexOf(image))}>
        <img src={image.src.large} alt=""></img>
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
      <div>
        <Navigation />
      </div>
      <div className="wall-header">
        <section className="wallpaper-home trans">
        {image? 
        <div className="wal-img-sect">
        <div onClick={() => clickHandler()} className="x-toggle">
          <div className="xmark"></div>
        </div>
        <i onClick={() => prevImg()} className="fas fa-angle-left "></i>
        <i onClick={() => nextImg()} className="fas fa-angle-right "></i>
           <ImageSelect image={datab[index]} />
           </div>
           : ""}
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
      <div className="footer" onClick={nextPage}>
        <button>Load More ...</button>
      </div>
    </div>
  );
}
