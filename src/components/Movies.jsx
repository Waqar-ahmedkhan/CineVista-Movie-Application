import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import Cards from "./partials/Cards";
import DropDown1 from "./partials/DropDown1";
import Topnav from "./partials/Topnav";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  document.title = "CinéVista | Movies ";

  const getMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie/${category}`, {
        params: { page },
      });
      const { data } = response;
      if (data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
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
    if (movies.length === 0) {
      getMovies();
    } else {
      setPage(1);
      setMovies([]);
      getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]); // Call refreshHandler when category changes

  return movies.length > 0 ? (
    <div className="px-[3%] w-full h-full">
      <div className="w-full flex items-center justify-between">
        <div className="min-w-fit">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate("/")}
              className="ri-arrow-left-line hover:text-[#6556CD]"
            ></i>{" "}
            <span className="">Movies</span>
          </h1>
        </div>
        <div className="w-full min-w-[70%]">
          <Topnav />
        </div>

        <div className="flex flex-row gap-3  overflow-hidden">
          <DropDown1
            title={"Category"}
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
            className="max-w-[10vh] p-2"
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movies.length} // Total number of items
        next={getMovies} // Function to call when more data needs to be loaded
        hasMore={hasMore} // Indicates whether there are more items to load
        loader={<Loader />} // Loader component to display while loading more data
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movies;
