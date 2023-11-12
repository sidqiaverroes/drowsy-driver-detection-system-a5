import React, { useState, useEffect } from "react";
import axios from "axios";
import CardDriver from "./CardDriver";
import SearchBar from "./SearchBar";

// import { vehicle } from "../data/vehicle.json";

export default function SideBar({ isOpen, toggleSidebar }) {
  const [vehicleData, setVehicleData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/vehicle/");
    setVehicleData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData(() => {
      // You can perform additional actions after data is fetched
      console.log("Data fetched successfully!");
    });
  }, []);

  // const vehicleData = vehicle;
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
