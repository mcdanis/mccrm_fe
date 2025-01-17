"use client";

import React from "react";
import { useState } from "react";
import Header from "@/app/crm/header";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Contact = () => {
  const [activeTab, setActiveTab] = useState("notes");

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <div className="flex h-auto items-stretch">
        <div className="bg-[#F3F4F6] w-1/4 p-4">
          <h2
            className={`font-bold text-lg mb-4 text-gray-700 ${inter.className}`}
          >
            PERSONAL INFORMATION
          </h2>
          <label className="text-xs italic text-gray-500">
            Created at : 12-02-2023
          </label>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="min-h-1">
              <label className="label-gray">Full Name</label>
              <input className="input-orange" />
            </div>
            <div>
              <label className="label-gray">Phone Number</label>
              <input className="input-orange" />
            </div>
            <div>
              <label className="label-gray">Email</label>
              <input className="input-orange" />
            </div>
            <div>
              <label className="label-gray">Country</label>
              <input className="input-orange" />
            </div>
            <div>
              <label className="label-gray">Address</label>
              <textarea className="input-orange"></textarea>
            </div>
            <div>
              <label className="label-gray">Source</label>
              <input className="input-orange" />
            </div>
            <div>
              <label className="label-gray">Original Status</label>
              <input className="input-orange" />
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 bg-white">
          <div className="flex items-center p-4 bg-[#F3F4F6] shadow-md">
            <button className="flex items-center text-gray-600 hover:text-orange-500 focus:outline-none text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H3m0 0l6-6m-6 6l6 6"
                />
              </svg>
              Kembali
            </button>

            <h1
              className={`ml-4 text-lg font-bold text-gray-800 ${inter.className}`}
            >
              Kampanye \ sub kampanye
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="">
              <div className="flex-1 mt-5">

                {/* Notes Section */}
                {activeTab == "notes" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="mb-4">
                      <label className="label-gray" htmlFor="note">
                        Input Note
                      </label>
                      <textarea
                        id="note"
                        className="w-full p-2 text-black rounded focus:outline-none focus:ring-2 input-orange"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="label-gray" htmlFor="tag">
                          Tag
                        </label>
                        <select
                          id="tag"
                          className="w-full bg-white p-2 text-black rounded border border-[#5C708E] focus:outline-none focus:ring-2 focus:ring-[#5C708E]"
                        >
                          <option value="">Pilih Tag</option>
                          <option value="tag1">Tag 1</option>
                          <option value="tag2">Tag 2</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-gray" htmlFor="tag">
                          Status Kontak
                        </label>
                        <select
                          id="tag"
                          className="w-full bg-white p-2 text-black rounded border border-[#5C708E] focus:outline-none focus:ring-2 focus:ring-[#5C708E]"
                        >
                          <option value="">Pilih Tag</option>
                          <option value="tag1">Draf</option>
                          <option value="tag1">Open</option>
                          <option value="tag2">On Progress</option>
                          <option value="tag2">Qualification Lead</option>
                          <option value="tag2">Negotiation</option>
                          <option value="tag2">Deal</option>
                          <option value="tag2">Active Project</option>
                          <option value="tag2">Done</option>
                          <option value="tag2">Lost</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-gray">Level Priority</label>
                        <select
                          id="tag"
                          className="w-full bg-white p-2 text-black rounded border border-[#5C708E] focus:outline-none focus:ring-2 focus:ring-[#5C708E]"
                        >
                          <option value="">Level</option>
                          <option value="">Low</option>
                          <option value="">Medium</option>
                          <option value="">Priority</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-3">
                      <button className="btn-orange-sm">Simpan Notes</button>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
