import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  if (!data || !data.id) {
    return null; // Return null if data is not available or if the id is missing
  }

  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length <= numWords) {
      return text;
    }
    const truncatedText = words.slice(0, numWords).join(" ");
    return `${truncatedText}...`;
  };

  // Build the URL for the background image
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${
    data.backdrop_path || data.poster_path
  }`;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.7), rgba(0,0,0,.8)), url(${backgroundImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-full h-[60vh] min-h-[400px] min-w-full relative "
      key={data.id} // Ensure each instance has a unique key
    >
      <div className="text-white flex flex-col justify-end items-start gap-1 w-[70%] absolute bottom-0 mx-[15vh] my-[10vh]">
        <h1 className="text-4xl font-semibold">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="italic w-[80%]">
          {truncateText(
            data.overview || data.description || "not description available",
            80
          )}
          ...
          <Link
            to={`${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>
        <div className="flex flex-row gap-3">
          <p className="font-semibold italic font-mono text-white">
            <i className="ri-megaphone-fill text-yellow-400 text-lg"></i>{" "}
            {data.release_date ||
              data.date ||
              data.first_air_date ||
              "not data available"}
          </p>
          <p className="italic text-white">
            {data.media_type === "tv" ? (
              <i className="ri-tv-2-fill text-yellow-400 text-lg mr-2"></i>
            ) : (
              <i className="ri-album-fill text-yellow-400 mr-2 text-lg"></i>
            )}
            {data.media_type.toUpperCase()}
          </p>
        </div>
        <Link
          to={`${data.media_type}/details/${data.id}/trailer`}
          className="p-5   bg-[#6556CD] font-semibold rounded-lg "
        >
          <i className="ri-play-fill pr-2"></i>
          Play Trailer
        </Link>
      </div>
    </div>
  );
};

// Define propTypes for props validation
Header.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure id is present and is a number
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
  }),
};

export default Header;
