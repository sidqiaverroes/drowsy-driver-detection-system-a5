import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MapsInterface from "../components/MapsInterface";
import InputField from "../components/InputField";
import SideBar from "../components/SideBar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* <InputField /> */}
      <div className="h-screen w-screen flex">
        <div className="flex flex-col w-full h-full">
          <div className="w-full z-50">
            <NavBar toggleSidebar={toggleSidebar} />
          </div>
          <div className="h-full w-full flex flex-row z-0">
            <MapsInterface />
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
