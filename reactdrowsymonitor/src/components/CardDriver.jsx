import React, { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { BASE_URL } from "../config";
import useWebSocket from "react-use-websocket";

export default function CardDriver({ data }) {
  const socketUrl = `ws://${BASE_URL}:8000/${data.id}`;

  const [driverState, setDriverState] = useState("");
  const [alarmState, setAlarmState] = useState("");
  const [latitude, setLatitude] = useState("-7.7659942");
  const [longitude, setLongitude] = useState("110.3732863");
  const [velocity, setVelocity] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const {} = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      const newMessage = data.new_message;
      setDriverState(JSON.stringify(newMessage.driver_state));
      setAlarmState(JSON.stringify(newMessage.alarm_state));
      setVelocity(JSON.stringify(newMessage.velocity));
      setLatitude(JSON.stringify(newMessage.coordinate.latitude));
      setLongitude(JSON.stringify(newMessage.coordinate.longitude));
      setTimestamp(newMessage.timestamp);
    },
  });

  return (
    <>
      <div
        className={`flex flex-col w-[300px] ${
          driverState == "true" ? "bg-merah" : "bg-hijau"
        } rounded-lg p-4 gap-2`}
      >
        {/* top */}
        <div className="flex flex-row justify-between items-center h-6">
          <span className="flex flex-row justify-center items-center gap-2 text-xs">
            {alarmState == "true" ? "Alarm ON" : "Alarm OFF"}
            <p
              className={`flex justify-center items-center rounded-md px-2 h-min ${
                driverState == "true" ? "bg-darkMerah" : "bg-darkHijau"
              }  text-white font-bold`}
            >
              {driverState == "true" ? "Drowsy" : "Not Drowsy"}
            </p>
          </span>
          {driverState == "true" && (
            <IoWarning className="text-3xl text-kuning" />
          )}
        </div>
        {/* end top */}
        {/* bottom */}
        <div className="flex flex-row justify-between items-center">
          <span className="flex flex-col">
            <p className="font-bold">{data.driver_name}</p>
            <p className="text-xs">
              {data.vehicle_model} - {data.plate_licence}
            </p>
          </span>
          <span className="flex flex-col justify-center items-center p-2 bg-white rounded-lg text-xs">
            <p className="font-bold">{velocity}</p>
            <p>km/h</p>
          </span>
        </div>
      </div>
    </>
  );
}
