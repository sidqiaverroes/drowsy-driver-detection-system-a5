import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { vehicle } from "../data/vehicle.json";
import { IoWarning } from "react-icons/io5";

const MapsInterface = () => {
  const vehicleData = vehicle;
  var index = vehicleData.length - 1;
  const data = vehicleData[index];
  console.log(data);

  var location = data.coordinate;
  var ds = data.driver_state == "true" ? "Drowsy" : "Not Drowsy";
  var as = data.alarm_state == "true" ? "On" : "Off";

  return (
    <>
      <div className="h-full w-full">
        <div className="h-full">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude, 18]}>
              <Popup>
                <div className="flex flex-col">
                  <span className="flex flex-row justify-between items-center h-8 w-40">
                    <p className="font-bold text-lg">{data.driver_name}</p>
                    {ds == "Drowsy" && (
                      <IoWarning className="text-3xl text-kuning" />
                    )}
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>{data.vehicle_model}</p>
                    <p>{data.plate_licence}</p>
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Drowsy:</p>
                    <p
                      className={`flex justify-center items-center rounded-md px-2 h-min ${
                        ds == "Drowsy" ? "bg-darkMerah" : "bg-darkHijau"
                      }  text-white font-bold`}
                    >
                      {ds}
                    </p>
                  </span>

                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Alarm:</p>
                    <p>{as}</p>
                  </span>
                  <span className="flex flex-row justify-between items-center h-8">
                    <p>Velocity:</p>
                    <p>{data.velocity}</p>
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
