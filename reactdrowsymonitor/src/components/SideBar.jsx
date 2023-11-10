import React, { useState } from "react";

import CardDriver from "./CardDriver";
import SearchBar from "./SearchBar";

import { vehicle } from "../data/vehicle.json";

export default function SideBar({ isOpen, toggleSidebar }) {
  //   const [isOpen, setIsOpen] = useState(true);

  //   const toggleSidebar = () => {
  //     setIsOpen(!isOpen);
  //   };

  const vehicleData = vehicle;
  return (
    <>
      <div
        className={`gap-4 ${
          isOpen ? "flex flex-col" : "hidden"
        } h-full bg-white border-l border-gray-300 p-4`}
      >
        {/* <button onClick={toggleSidebar}>OPEN</button> */}
        <SearchBar />
        <div className="flex flex-col w-auto h-[520px] gap-4 overflow-y-scroll">
          {/* {vehicleData.map((vehicle, index) => (
              <CardDriver key={index} data={vehicle} />
            ))} */}
          {vehicleData.map((vehicle, index) => (
            <CardDriver key={index} data={vehicle} />
          ))}
        </div>
      </div>
    </>
  );
}
