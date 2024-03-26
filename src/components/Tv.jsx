import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import Cards from "./partials/Cards";
import DropDown1 from "./partials/DropDown1";
import Topnav from "./partials/Topnav";

const Tv = () => {
  const navigate = useNavigate();
  const [tv, setTv] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  document.title = "CinéVista | TV";

  const getTv = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/tv/${category}`, {
        params: { page },
      });
      const { data } = response;
      if (data.results.length > 0) {
        setTv((prevTv) => [...prevTv, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const refreshHandler = async () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="px-[3%] w-full h-full">
      <div className="w-full flex items-center justify-between">
        <div className="min-w-fit">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate("/")}
              className="ri-arrow-left-line hover:text-[#6556CD]"
            ></i>{" "}
            <span className="">TV</span>
          </h1>
        </div>
        <div className="w-full min-w-[70%]">
          <Topnav />
        </div>

        <div className="flex flex-row gap-3  overflow-hidden">
          <DropDown1
            title={"Category"}
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
            className="max-w-[10vh] p-2"
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={tv} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Tv;
