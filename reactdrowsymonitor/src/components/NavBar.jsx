import React from "react";
import { BsCarFrontFill } from "react-icons/bs";

const NavBar = ({ toggleSidebar }) => {
  return (
    <>
      <div className="flex w-full items-center justify-between px-6 py-2 text-2xl text-gray-800 font-semibold  border-l border-gray-300">
        <p>Drowsiness Detection Monitoring</p>
        <button
          className="p-4 rounded-lg shadow-md bg-white border-l border-gray-300"
          onClick={toggleSidebar}
        >
          <BsCarFrontFill />
        </button>
      </div>
    </>
  );
};

export default NavBar;
