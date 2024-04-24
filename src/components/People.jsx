import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav";

const People = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  document.title = "CinéVista | People";

  const getPeople = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/person/${category}`, {
        params: { page },
      });
      const { data } = response;
      console.log(data);
      if (data.results.length > 0) {
        setPeople((prevPeople) => [...prevPeople, ...data.results]);
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
    if (people.length === 0) {
      getPeople();
    } else {
      setPage(1);
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="px-[3%] w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <i
            className="ri-arrow-left-line text-2xl text-zinc-400 hover:text-[#6556CD] cursor-pointer mr-2"
            onClick={() => navigate("/")}
          ></i>
          <h1 className="text-2xl text-zinc-400 font-semibold">People</h1>
        </div>
        <div className="w-full min-w-[70%]">
          <Topnav />
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
