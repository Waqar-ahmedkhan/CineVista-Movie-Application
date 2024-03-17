import React from "react";
import loader from "/loader.gif";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img src={loader} alt="" className="h-[60%] object-cover"></img>
    </div>
  );
};

export default Loader;
