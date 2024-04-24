import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncCloudDetail, removePeople } from "../store/actions/PersonAction";
import Loader from "./Loader";
import Dropdown from "./partials/DropDown1";

import { useState } from "react";
import HorizontailCart from "./partials/HorizontialCart";
const PersonDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);

  const [category, setcategory] = useState("movie");

  console.log(info);

  useEffect(() => {
    dispatch(asyncCloudDetail(id));

    return () => {
      dispatch(removePeople());
    };
  }, [dispatch, id]);

  if (!info) {
    return <Loader />;
  }

  return (
    <div className=" px-[8%]  w-screen h-full bg-[#1F1E24] my-5">
      <div className=" w-full h-full flex flex-row gap-10 ">
        <div className="w-[20%] h-full flex  flex-col  ">
          <Link to="/">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line hover:text-[#6556CD] text-2xl text-zinc-200 "
            ></i>
          </Link>
          <Link to="/" className="my-4 mx-2">
            <img
              className="h-[35vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] "
              src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
              alt={info.detail.title}
            />
          </Link>
          <div className="h-[1px] w-[80%] bg-zinc-500 mt-5 "></div>

          <div className="flex flex-row gap-4 text-white mt-2">
            {" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
            >
              <i className="ri-earth-fill text-2xl"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
            >
              <i className="ri-facebook-circle-fill text-2xl"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={info.detail.homepage}
            >
              <i className="ri-instagram-fill text-2xl"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
            >
              <i className="ri-twitter-x-line text-2xl"></i>
            </a>{" "}
          </div>

          <div className="w-full h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-zinc-400 mt-5">
              {" "}
              Person Info{" "}
            </h3>
            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Know for</h5>
              <p className=" font-semibold">
                {info.detail.known_for_department}
              </p>
            </div>
            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Gender</h5>
              <p className=" font-semibold">
                {info.detail.Gender == 0 ? "male" : "female"}
              </p>
            </div>
            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Birthday</h5>
              <p className=" font-semibold">{info.detail.birthday}</p>
            </div>
            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Deathday</h5>
              <p className=" font-semibold">
                {info.detail.deathday == null
                  ? "Still Alive"
                  : info.detail.deathday}
              </p>
            </div>
            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Place Of Birth</h5>
              <p className=" font-semibold">{info.detail.place_of_birth}</p>
            </div>

            <div className="text-zinc-400 mt-4 flex-col">
              <h5 className="text-xl font-semibold">Also Known As</h5>
              <p className=" font-semibold">{info.detail.also_known_as}</p>
            </div>
          </div>
        </div>

        <div className="w-[80%] h-full  ">
          <div className="flex flex-col justify-between ">
            <h1 className="text-zinc-400 my-10 text-6xl  font-bold">
              {info.detail.name}
            </h1>
            <h1 className="text-2xl  text-zinc-400 font-semibold">Biography</h1>
            <p className="text-zinc-400  mt-2  ">{info.detail.biography}</p>
          </div>
          <h4 className="text-xl text-zinc-400 font-semibold mt-5 mb-3">
            {" "}
            Known for{" "}
          </h4>

          <HorizontailCart data={info.combinedCredits.cast} />

          <div className="flex w-full h-full  justify-between">
            <h2 className="text-zinc-400 text-2xl">Acting</h2>
            <Dropdown
              title={"category"}
              options={["movie", "tv"]}
              func={(e) => {
                setcategory(e.target.value);
              }}
            />
          </div>
          <div className="h-[50vh] mt-2 w-full text-zinc-400 shadow-xl shadow-[rgba(255,255,255,.3)] overflow-y-auto overflow-x-hidden border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-5 hover:bg-[#19191d] hover:text-white duration-300 cursor-pointer"
              >
                <div
                  className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-zinc-700 hover:bg-[#6556CD]"
                  style={{ transition: "background-color 0.3s ease" }}
                ></div>
                <div className="flex flex-col">
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    <span className="block">Character name: {c.character}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
