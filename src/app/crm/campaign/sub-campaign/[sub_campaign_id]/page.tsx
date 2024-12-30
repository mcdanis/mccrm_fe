"use client";

import React, { useState } from "react";
import Header from "@/app/crm/header";
import { Contact, Info } from "@/components/sub-campaign-detail";

const Crm = () => {
  // State to store the active content
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
              onClick={() => handleNavClick("Contact")}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded ${
                activeContent === "Contact" ? "bg-orange-700" : ""
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavClick("Info")}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded ${
                activeContent === "Info" ? "bg-orange-700" : ""
              }`}
            >
              Info
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-3">Kampanye 1s</h2>
          <h2 className="text-1xl font-semibold">{activeContent}</h2>
          <div className="mt-4">
            {activeContent === "Contact" && <Contact />}
            {activeContent === "Info" && <Info />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crm;
