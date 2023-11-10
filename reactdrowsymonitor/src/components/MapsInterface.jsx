import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { vehicle } from "../data/vehicle.json";
import { IoWarning } from "react-icons/io5";

import useWebSocket from "react-use-websocket";

const MapsInterface = () => {
  const socketUrl = `ws://127.0.0.1:8000/1`;

  const [driverState, setDriverState] = useState("");
  const [alarmState, setAlarmState] = useState("");
  const [latitude, setLatitude] = useState("-7.7659942");
  const [longitude, setLongitude] = useState("110.3732863");
  const [velocity, setVelocity] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const [lastData, setLastData] = useState([]);

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
      console.log(newMessage);
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
      <div className="h-full w-full">
        <div className="h-full">
          <MapContainer
            center={[latitude, longitude]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude, 18]}>
              <Popup>
                <div className="flex flex-col">
                  <span className="flex flex-row justify-between items-center h-8 w-40">
                    <p className="font-bold text-lg">TEST</p>
                    {driverState == "true" && (
                      <IoWarning className="text-3xl text-kuning" />
                    )}
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>test</p>
                    <p>test123</p>
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Drowsy:</p>
                    <p
                      className={`flex justify-center items-center rounded-md px-2 h-min ${
                        driverState === "true" ? "bg-darkMerah" : "bg-darkHijau"
                      }  text-white font-bold`}
                    >
                      {driverState === "true" ? "Drowsy" : "Not Drowsy"}
                    </p>
                  </span>

                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Alarm:</p>
                    <p>{alarmState === "true" ? "ON" : "OFF"}</p>
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Velocity:</p>
                    <p>{velocity} km/h</p>
                  </span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapsInterface;
