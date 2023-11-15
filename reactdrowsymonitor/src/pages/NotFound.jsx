import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold text-gray-600">Error 404</h1>
          <p className="text-gray-400 font-medium mb-4">
            Whoops. Laman tidak ditemukan.
          </p>
          <Link
            to="/"
            className="px-10 py-4 rounded-sm bg-sky-600 hover:bg-sky-500 text-sm text-white shadow-xl"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
