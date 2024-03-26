import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, onSelect }) => {
  return (
    <div className="h-[100%]  w-full flex flex-row flex-wrap">
      {data.map((card, index) => (
        <Link
          key={index}
          to={`/${card.id}`}
          className="w-[35vh] m-[3%] relative"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              card.poster_path ||
              card.backdrop_path ||
              card.img_path ||
              card.profile_path
            }`}
            alt={card.name}
            className="h-[40vh] w-full shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          />
          <h1 className="text-zinc-400 text-2xl font-semibold m-2">
            {card.name ||
              card.title ||
              card.original_name ||
              card.original_title}
          </h1>

          {card.vote_average && (
            <div className="text-white font-semibold w-[7vh] text-lg absolute right-[-11%] bottom-[35%] rounded-full h-[7vh]  flex justify-center items-center bg-yellow-600">
              {(card.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
