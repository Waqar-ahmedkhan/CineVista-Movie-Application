import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="h-[100%] w-full flex flex-row  flex-wrap    ">
      {data.map((card, index) => (
        <Link
          key={index}
          to={``}
          className="text-white w-[35vh] text-xl m-[3%] "
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              card.poster_path || card.backdrop_path || card.img_path
            }`}
            alt={card.name}
            className="h-[40vh] w-[100%]   "
          />
          {/* Assuming each card has an 'id' property */}
          {card.name || card.title || card.original_name || card.original_title}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
