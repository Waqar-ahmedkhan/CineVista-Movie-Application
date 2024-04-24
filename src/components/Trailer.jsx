import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nofound from "./Nofound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category]?.info?.video);

  return ytVideo ? (
    <div className="bg-[rgba(0,0,0,.9)] z-[100] absolute top-0 left-0 flex w-screen h-screen items-center justify-center">
      <ReactPlayer
        controls
        height={760}
        width={1600}
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
      />
      <Link to="/">
        <i
          onClick={() => navigate(-1)}
          className="ri-close-fill absolute top-8 right-8 text-3xl text-white z-[100] hover:text-[#6556CD]"
        ></i>
      </Link>
    </div>
  ) : (
    <Nofound />
  );
};

export default Trailer;
