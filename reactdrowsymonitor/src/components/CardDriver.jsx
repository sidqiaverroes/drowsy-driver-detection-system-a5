import React from "react";
import { IoWarning } from "react-icons/io5";

export default function CardDriver({ data }) {
  var ds = data.driver_state == "true" ? "Drowsy" : "Not Drowsy";
  var as = data.alarm_state == "true" ? "Alarm On" : "Alarm Off";
  return (
    <>
      <div
        className={`flex flex-col w-[300px] h-[300px] ${
          ds == "Drowsy" ? "bg-merah" : "bg-hijau"
        } rounded-lg p-4 gap-2`}
      >
        {/* top */}
        <div className="flex flex-row justify-between items-center">
          <span className="flex flex-row gap-2 text-xs">
            {as}
            <p
              className={`flex justify-center items-center rounded-md px-2 ${
                ds == "Drowsy" ? "bg-darkMerah" : "bg-darkHijau"
              }  text-white font-bold`}
            >
              {ds}
            </p>
          </span>
          {ds == "Drowsy" && <IoWarning className="text-3xl text-kuning" />}
        </div>
        {/* bottom */}
        <div className="flex flex-row justify-between items-center">
          <span className="flex flex-col">
            <p className="font-bold">{data.driver_name}</p>
            <p className="text-xs">
              {data.vehicle_model} - {data.plate_licence}
            </p>
          </span>
          <span className="flex flex-col justify-center items-center p-2 bg-white rounded-lg text-xs">
            <p className="font-bold">{data.velocity}</p>
            <p>km/h</p>
          </span>
        </div>
      </div>
    </>
  );
}
