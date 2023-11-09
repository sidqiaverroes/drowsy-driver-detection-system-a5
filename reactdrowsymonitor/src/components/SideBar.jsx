import React, { useState } from "react";

import CardDriver from "./CardDriver";
import SearchBar from "./SearchBar";

export default function SideBar({ isOpen, toggleSidebar }) {
  //   const [isOpen, setIsOpen] = useState(true);

  //   const toggleSidebar = () => {
  //     setIsOpen(!isOpen);
  //   };
  return (
    <>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } right-0 top-0 h-full w-64 bg-white border-l border-gray-300 z-100 p-6`}
      >
        {/* <button onClick={toggleSidebar}>OPEN</button> */}
        <SearchBar />
        <div className="mt-5">
          <CardDriver />
        </div>
      </div>
    </>
  );
}
