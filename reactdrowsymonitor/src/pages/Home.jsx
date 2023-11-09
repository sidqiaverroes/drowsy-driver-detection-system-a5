import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MapsInterface from "../components/MapsInterface";
import InputField from "../components/InputField";
import SideBar from "../components/SideBar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* <InputField /> */}
      <div className="h-screen w-screen flex flex-col">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="h-full flex flex-row">
          <MapsInterface />
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </>
  );
};

export default Home;
