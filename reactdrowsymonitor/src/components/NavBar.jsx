import React from "react";

const NavBar = ({ toggleSidebar }) => {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-2 text-xl font-semibold">
        <p>Drowsiness Detection Monitoring</p>
        <button
          className="px-8 py-2 rounded-lg shadow-md"
          onClick={toggleSidebar}
        >
          Mobil
        </button>
      </div>
    </>
  );
};

export default NavBar;
