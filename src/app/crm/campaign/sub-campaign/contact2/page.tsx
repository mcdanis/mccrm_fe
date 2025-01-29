"use client";
import React from "react";
import Header from "@/app/crm/header";

const Grid = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="bg-green-300 w-1/4 h-full p-4">
          {/* Sidebar content */}
        </div>
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-400 p-4 rounded-md">ss</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
