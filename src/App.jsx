import { Route, Routes } from "react-router-dom";

import { HomePage } from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import Nofound from "./components/Nofound";
import People from "./components/People";
import PersonDetails from "./components/PersonDetails";
import Populer from "./components/Popular";
import Trailer from "./components/Trailer";
import Trending from "./components/Trending";
import Tv from "./components/Tv";
import TvDetails from "./components/TvDetails";
function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-vh flex flex-row">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Populer />} />
        <Route path="/movie" element={<Movies />} />{" "}
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<Nofound />} />
      </Routes>
    </div>
  );
}

export default App;
