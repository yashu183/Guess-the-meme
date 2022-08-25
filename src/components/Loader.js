import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black opacity-50 z-40 absolute">
      <i className="fa-solid fa-spinner fa-spin-pulse text-6xl text-white"></i>
    </div>
  );
};

export default Loader;
