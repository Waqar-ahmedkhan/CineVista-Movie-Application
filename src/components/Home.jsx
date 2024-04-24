import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Loader from "./Loader";
import DropDown1 from "./partials/DropDown1";
import Header from "./partials/Header";
import HorizontialCart from "./partials/HorizontialCart";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";

export const HomePage = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const getHeaderWallPaper = async () => {
    try {
      const response = await axios.get("/trending/all/day");
      const { data } = response;
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomWallpaper = data.results[randomIndex];
      setWallpaper(randomWallpaper);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTrending = async () => {
    try {
      const response = await axios.get(`/trending/${category}/day`);

      const { data } = response;
      const randomWallpaper = data.results;
      settrending(randomWallpaper);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrending();
    getHeaderWallPaper();
  }, [category]);

  console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto  overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className=" flex w-full p-5 justify-between">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>

          {/* Drop down */}
          <DropDown1
            title="Filter"
            options={["all", "movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontialCart data={trending} title={category} />
      </div>
    </>
  ) : (
    <Loader />
  );
};
