import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import Cards from "./partials/Cards";
import DropDown1 from "./partials/DropDown1"; // Consider renaming DropDown1 for clarity
import Topnav from "./partials/Topnav";

const Trending = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  (document.title = "CinéVista | Trending "), category.toUpperCase();

  const getTrending = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/trending/${category}/${duration}`, {
        params: { page },
      });
      const { data } = response;
      if (data.results.length > 0) {
        setTrending((prevTrending) => [...prevTrending, ...data.results]);
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

  const RefreshHandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    RefreshHandler();
  }, [category, duration]); // Call RefreshHandler when category, duration,

  return trending.length > 0 ? (
    <div className="px-[3%] w-full h-full">
      <div className="w-full flex items-center justify-between">
        <div className="min-w-fit">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate("/")}
              className="ri-arrow-left-line hover:text-[#6556CD]"
            ></i>{" "}
            <span className="">Trending</span>
          </h1>
        </div>
        <div className="w-full min-w-[70%]">
          <Topnav />
        </div>

        <div className="flex flex-row gap-3  overflow-hidden">
          <DropDown1
            title={"Filter"}
            options={["all", "movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
            className="max-w-[10vh] p-2"
          />
          <DropDown1
            className=""
            title={"Duration"}
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length} // Total number of items
        next={getTrending} // Function to call when more data needs to be loaded
        hasMore={hasMore} // Indicates whether there are more items to load
        loader={<Loader />} // Loader component to display while loading more data
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
