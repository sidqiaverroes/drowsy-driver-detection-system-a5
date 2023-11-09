import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";

const MapsInterface = () => {
  return (
    <div className=" h-screen w-full bg-blue-300">
      <div className=" h-full">
        <MapContainer
          center={[0.5481339, 121.7880643]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[0.5481339, 121.7880643, 18]}>
            <Popup>Kantor Desa Banuroja</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapsInterface;
