import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>
      <div className="w-[20%] h-full border-r-2 border-zinc-400 p-8 ">
        <h1 className="text-2xl  text-white font-bold font-mullish">
          <i className=" text-[#6556CD] hover:text-red-400 duration-500 ri-clapperboard-fill mr-2 "></i>
          <span className=" "> CinéVista. </span>
        </h1>
        <nav className=" flex flex-col text-xl text-zinc-400 gap-3 ">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            New Feeds
          </h1>

          <Link
            to={"/trending"}
            className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 "
          >
            {" "}
            <i className="ri-fire-fill hover:text-yellow-300 duration-200 "></i>{" "}
            Trending{" "}
          </Link>
          <Link
            to={"/popular"}
            className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 "
          >
            {" "}
            <i className="ri-bar-chart-grouped-line hover:text-green-400 duration-200 "></i>{" "}
            Popular{" "}
          </Link>

          <Link
            to={"/movie"}
            className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 "
          >
            {" "}
            <i className="ri-movie-line hover:text-red-400 duration-200"></i>{" "}
            Movies{" "}
          </Link>
          <Link
            to={"/tv"}
            className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 "
          >
            {" "}
            <i className="ri-slideshow-2-fill hover:text-red-400 duration-200"></i>{" "}
            Tv Shows{" "}
          </Link>
          <Link
            to={"/people"}
            className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 "
          >
            {" "}
            <i className="ri-team-line hover:text-yellow-200 duration-200 "></i>{" "}
            People{" "}
          </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400 mt-2" />
        <nav className=" flex flex-col text-xl text-zinc-400 gap-2 ">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            Website information
          </h1>

          <Link className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 ">
            {" "}
            <i className="ri-information-fill hover:text-yellow-500"></i> About{" "}
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white text-lg rounded-lg duration-500 p-5 ">
            {" "}
            <i className="ri-contacts-fill hover:text-green-500"></i> Contact{" "}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
