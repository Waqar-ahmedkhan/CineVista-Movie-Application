import { Route, Routes } from "react-router-dom";

import { HomePage } from "./components/Home";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-vh flex flex-row">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
