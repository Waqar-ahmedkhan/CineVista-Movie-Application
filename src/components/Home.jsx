import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontialCart from "./partials/HorizontialCart";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";

export const HomePage = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        const response = await axios.get("/trending/all/day");
        const { data } = response;
        const randomWallpaper = data.results;
        settrending(randomWallpaper);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (!wallpaper && !trending) {
      getHeaderWallPaper();
      getTrending();
    }
  }, [wallpaper, trending]);

  console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto  overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <HorizontialCart data={trending} />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
