import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { vehicle } from "../data/vehicle.json";
import { IoWarning } from "react-icons/io5";
import axios from "axios";

import { BASE_URL } from "../config";

import useWebSocket from "react-use-websocket";

const MapsInterface = () => {
  const [vehicleData, setVehicleData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://${BASE_URL}:8000/api/vehicle/`);
    setVehicleData(response.data[0]);
  };

  useEffect(() => {
    fetchData(() => {
      console.log("Data fetched successfully!");
    });
  }, []);

  const socketUrl = `ws://${BASE_URL}:8000/1`;

  const [driverState, setDriverState] = useState("");
  const [alarmState, setAlarmState] = useState("");
  const [latitude, setLatitude] = useState("-7.7659942");
  const [longitude, setLongitude] = useState("110.3732863");
  const [velocity, setVelocity] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [location, setLocation] = useState([]);

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
      setLocation((prev_loc) => [
        ...prev_loc,
        [newMessage.coordinate.latitude, newMessage.coordinate.longitude],
      ]);
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
                    <p className="font-bold text-lg">
                      {vehicleData.driver_name}
                    </p>
                    {driverState == "true" && (
                      <IoWarning className="text-3xl text-kuning" />
                    )}
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>{vehicleData.vehicle_model}</p>
                    <p>{vehicleData.plate_licence}</p>
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
            <Polyline pathOptions={{ color: "lime" }} positions={location} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapsInterface;
