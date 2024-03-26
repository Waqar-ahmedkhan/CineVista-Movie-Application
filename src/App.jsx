import { Route, Routes } from "react-router-dom";

import { HomePage } from "./components/Home";
import Movies from "./components/Movies";
import People from "./components/People";
import Populer from "./components/Popular";
import Trending from "./components/Trending";
import Tv from "./components/Tv";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-vh flex flex-row">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Populer />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </div>
  );
}

export default App;
