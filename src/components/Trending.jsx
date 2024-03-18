import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("week");
  const [trending, settrending] = useState(null);

  const getTrending = async () => {
    try {
      const response = await axios.get(`/trending/${category}/${duration}`);
      const { data } = response;
      const randomWallpaper = data.results;
      settrending(randomWallpaper);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    !trending && getTrending();
  }, [category, duration]);

  console.log(trending);

  return trending ? (
    <div className=" px-[3%]   w-[100%] h-[100%]    ">
      <div className=" w-full  flex items-center justify-between  ">
        <div className="min-w-fit">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate("/")}
              className="ri-arrow-left-line  hover:text-[#6556CD]"
            ></i>{" "}
            <span className=""> Trending</span>
          </h1>
        </div>
        <div className="w-full min-w-[73%]">
          <Topnav />
        </div>

        <Dropdown
          title={"Filter"}
          options={["tv", "movie", "all"]}
          func={(e) => {
            setcategory(e.value.result);
          }}
        />
        <Dropdown
          className=""
          title={"Duration"}
          options={["day", "Week"]}
          func={(e) => {
            setduration(e.value.result);
          }}
        />
      </div>

      <Cards data={trending} title={category} />
    </div>
  ) : (
    <>
      {" "}
      <Loader />
    </>
  );
};

export default Trending;
