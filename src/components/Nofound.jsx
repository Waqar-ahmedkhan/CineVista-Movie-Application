import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Notfound from "/404.gif";

const Nofound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen absolute flex justify-center items-center bg-black">
      <Link>
        <i
          onClick={() => navigate(-1)}
          className=" absolute ri-close-fill top-8 right-8 text-3xl  text-white  z-[100]  hover:text-[#6556CD]"
        ></i>
      </Link>
      <img src={Notfound} alt="" className="h-[60%] object-cover"></img>
    </div>
  );
};

export default Nofound;
