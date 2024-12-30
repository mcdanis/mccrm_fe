"use client";

import React, { useState } from "react";
import Header from "@/app/crm/header";

const Client = () => {
  const [activeContent, setActiveContent] = useState("Contact");

  // Function to handle button clicks
  const handleNavClick = (content: string) => {
    setActiveContent(content);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 flex flex-col justify-start items-start p-4">
          <nav className="flex flex-col gap-4 w-full">
            <button
              onClick={() => handleNavClick("Campaigns")}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded ${
                activeContent === "Campaigns" ? "bg-orange-700" : ""
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => handleNavClick("Info")}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded ${
                activeContent === "Info" ? "bg-orange-700" : ""
              }`}
            >
              Info
            </button>
            <button
              onClick={() => handleNavClick("Users")}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded ${
                activeContent === "Users" ? "bg-orange-700" : ""
              }`}
            >
              Users
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-3">Kampanye 1s</h2>
          <h2 className="text-1xl font-semibold">{activeContent}</h2>
          <div className="mt-4">
            {activeContent === "Contact" && `sd`}
            {activeContent === "Info" && `ddd`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
