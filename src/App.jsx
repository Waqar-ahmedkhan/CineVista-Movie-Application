import { Route, Routes } from "react-router-dom";

import { HomePage } from "./components/Home";
import Trending from "./components/Trending";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-vh flex flex-row">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  );
}

export default App;
