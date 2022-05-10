import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Wallpaper from "./pages/Wallpaper";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path="/" element={<Wallpaper />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/upload" element={<Upload/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
