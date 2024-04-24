import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncCloudDetail, removeTvDetails } from "../store/actions/TvAction";
import Loader from "./Loader";
import HorizontialCart from "./partials/HorizontialCart";

const TvDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncCloudDetail(id));

    return () => {
      dispatch(removeTvDetails());
    };
  }, [dispatch, id]);

  if (!info) {
    return <Loader />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.7), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-[100%] px-[10%] py-2 bg-[#1F1E24] relative"
    >
      <nav className="w-full text-xl text-zinc-200  flex justify-start gap-10">
        <Link to="/">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
        </Link>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          IMDb
        </a>
      </nav>

      <div className="flex flex-row w-full h-full gap-8">
        <div className="max-w-[30%] h-full flex flex-col">
          <Link to="/" className="my-4 mx-2">
            <img
              className="w-[200px] h-[320px]"
              src={`https://image.tmdb.org/t/p/original${info.detail.poster_path}`}
              alt={info.detail.title}
            />
          </Link>
        </div>

        <div className="max-w-[70%] h-full text-white">
          <div className="flex flex-col justify-between gap-2">
            <h1 className="text-white my-3 mx-2 text-5xl font-bold">
              {info.detail.original_title}
              <span className="text-lg font-semibold">
                ({info.detail.first_air_date.slice(0, 4)})
              </span>
            </h1>

            <div className=" flex gap-x-3 text-white items-center">
              {" "}
              <div className=" font-semibold w-[7vh] text-lg  right-[-11%] bottom-[35%] rounded-full h-[7vh]  flex justify-center items-center bg-yellow-600">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
              <span className="text-lg font-bold">
                User <br /> Score{" "}
              </span>
              <h1 className="">{info.detail.first_air_date}</h1>
              <h1 className="">
                {info.detail.genres.map((g) => g.name).join(",")}
              </h1>
              <h1 className="">{info.detail.runtime}min</h1>
            </div>

            <div className="italic font-semibold text-lg my-2">
              {info.detail.tagline}
            </div>

            <div>
              <h1 className=" text-2xl">Overview</h1>
              <p className="my-2 max-w-[99%]">{info.detail.overview}</p>
            </div>

            <div className="flex flex-col ">
              <h1 className="text-2xl">Movie Translated</h1>
              <p className="my-2  ">{info.translations.join(", ")}</p>
            </div>
          </div>

          <div className="flex flex-row mt-4">
            <Link
              to={`${pathname}/trailer`}
              className="p-5   bg-[#6556CD] font-semibold rounded-lg "
            >
              <i className="ri-play-fill pr-2"></i>
              Play Trailer
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[80%] flex flex-col py-4  text-white">
        {info.watchProviders && (
          <>
            {/* Available on Platforms */}
            {info.watchProviders.flatrate && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-10 my-2">
                  <h1 className=" pr-8">Available on platforms</h1>
                  {info.watchProviders.flatrate.map((w) => (
                    <img
                      key={w.id}
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      alt={w.logo_path}
                      className="w-[2rem] h-[2rem]"
                    />
                  ))}
                </div>
              </div>
            )}

            {info.watchProviders.rent && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-10 my-2 ">
                  <h1 className=" pr-8">Available on rent</h1>
                  {info.watchProviders.rent.map((w) => (
                    <img
                      title=""
                      key={w.id}
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      alt={w.logo_path}
                      className="w-[2rem] h-[2rem]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Available to Buy */}
            {info.watchProviders.buy && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-10 my-2">
                  <h1 className=" pr-8">Available to buy</h1>
                  {info.watchProviders.buy.map((w) => (
                    <img
                      key={w.id}
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      alt={w.logo_path}
                      className="w-[2rem] h-[2rem]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Available to Rent */}
          </>
        )}
      </div>

      {/* season  */}
      <div className="h-[1px] mb-2 w-[100%] text-white bg-white"></div>

      <div className="text-white font-bold text-3xl mb-2"> Seasons</div>

      {/* its part 4 now  */}

      <div className="w-full h-full flex overflow-y-hidden  gap-6">
        {info.detail.seasons.map((item, i) => (
          <div key={i} className="w-full mb-5">
            <img
              src={`https://image.tmdb.org/t/p/original${
                item.backdrop_path || item.poster_path
              }`}
              alt={item.title}
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[50vh] min-w-[15vw]"
            />
            <h1 className="text-zinc-400 text-2xl font-semibold mt-2">
              {item.name ||
                item.title ||
                item.original_name ||
                item.original_title}
            </h1>
          </div>
        ))}
      </div>

      <div className="h-[1px] mb-2 w-[100%] text-white bg-white"></div>

      <div className="text-white font-bold text-3xl mb-2">
        {" "}
        Recommendation & Similar Staff
      </div>

      {/* its part 4 now  */}

      <HorizontialCart
        data={info.recommendation ? info.recommendation : info.similar}
      />

      <Outlet />
    </div>
  );
};

export default TvDetails;
