import { Routes, Route } from "react-router-dom";
import Wallpaper from "./pages/Wallpaper";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Wallpaper />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
