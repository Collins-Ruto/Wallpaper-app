import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import User from "./pages/User";
import Upload from "./pages/Upload";
import Wallpaper from "./pages/Wallpaper";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path="/" element={<Wallpaper user={user} setUser={setUser}/>}></Route>
          <Route path="/user" element={<User user={user} setUser={setUser} />}/>
          <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/upload" element={<Upload/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
