import React from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
        placeholder="Cari..."
      />
    </div>
  );
}
