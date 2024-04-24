import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimg from "/no.jpg";
const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [loadings, setLoadings] = useState(false);

  const truncateText = (text, numWords) => {
    const words = text.split(" ");
    if (words.length <= numWords) {
      return text;
    }
    const truncatedText = words.slice(0, numWords).join(" ");
    return `${truncatedText}...`;
  };

  const getSearches = async () => {
    try {
      setLoadings(true);
      const response = await axios.get(`/search/multi?query=${query}`);
      setSearches(response.data.results || []);
      setLoadings(false); // Ensure there is a results property in your data structure
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center  ">
      <i className="ri-search-line text-zinc-400 text-3xl "></i>
      <input
        className="w-[50%] text-zinc-200 mx-10 p-4 text-lg border-none outline-none bg-transparent"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anything"
      ></input>
      {query.length > 0 && (
        <i
          className="ri-close-line text-zinc-400 text-3xl absolute right-80 "
          onClick={() => setQuery("")}
        ></i>
      )}

      <div className="absolute w-[50%] bg-zinc-200 max-h-[50vh] top-[90%] left-[23%] overflow-auto rounded z-50 ">
        {searches.map((search, index) =>
          loadings ? (
            <p
              key={search.id}
              className="font-semibold text-xl flex justify-center items-center  text-zinc-400 mt-14 italic"
            >
              loadings...
            </p>
          ) : (
            <Link
              to={`/${search.media_type}/details/${search.id}`}
              key={index}
              className="w-[100%] hover:text-black duration-300 hover:bg-zinc-300 text-zinc-600 font-semibold flex justify-start items-center p-8 bg-zinc-200 border-b-2 border-zinc-100"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  search.profile_path ||
                  search.poster_path ||
                  search.backdrop_path
                }`}
                width={90}
                height={90}
                alt={
                  search.name ||
                  search.title ||
                  search.original_name ||
                  search.original_title
                }
                className="flex flex-row justify-center items-center mr-4"
                onError={(e) => {
                  e.target.src = noimg; // Set the default image path
                }}
              />
              <div>
                <span className="font-bold text-xl">
                  {search.name ||
                    search.title ||
                    search.original_name ||
                    search.original_title}
                </span>
                <p>
                  {truncateText(
                    search.overview ||
                      search.description ||
                      "not description availiable",
                    25
                  )}
                </p>

                <p className="mt-2 font-semibold italic text-black">
                  {" "}
                  {search.release_date || search.date || "not data avialiable"}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Topnav;
