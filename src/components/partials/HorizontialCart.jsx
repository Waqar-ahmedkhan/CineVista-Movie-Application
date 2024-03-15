import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import Dropdown from "./Dropdown";

const HorizontalCart = ({ data }) => {
  const [filterOption, setFilterOption] = useState("all");

  if (!data || !data.length) {
    return null; // Return null if data is not available or if it's an empty array
  }

  const truncateText = (text, numWords) => {
    const words = text.split(/\s+/); // Split on whitespace (including spaces and non-breaking spaces)
    if (words.length <= numWords) {
      return text;
    }
    return `${words.slice(0, numWords).join(" ")}...`; // Use join(' ') for proper spacing
  };

  // Function to filter data based on selected option
  const filteredData = data.filter((item) => {
    if (filterOption === "all") {
      return true; // Return true for all items if "all" is selected
    } else {
      // Return true only for items matching the selected filter option (tv or movie)
      return item.media_type === filterOption;
    }
  });

  return (
    <div className="w-full p-5">
      <div className="pb-5 flex w-full">
        <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>

        {/* Drop down */}
        <Dropdown
          title="Filter"
          options={["tv", "movie", "all"]}
          onSelect={setFilterOption}
        />
      </div>

      <div className="w-full flex overflow-y-hidden bg-zinc-900 align-middle justify-center">
        {filteredData.map((item, i) => (
          <div key={i} className="min-w-[22%] mr-7 h-full">
            <img
              src={`https://image.tmdb.org/t/p/original${
                item.backdrop_path || item.poster_path
              }`}
              alt={item.title}
              className="w-full h-[50%] object-cover"
            />
            <div className="p-3 min-h-[20vh]">
              <h1 className="text-zinc-200 font-semibold text-xl">
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </h1>
              <p className="italic text-zinc-400 ">
                {truncateText(
                  item.overview ||
                    item.description ||
                    "not description available",
                  13 // Limiting to 10 words
                )}
                ...<Link className="text-blue-400">more</Link>
              </p>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCart;
