"use client";

import React from "react";
import { useState } from "react";
import Header from "@/app/crm/header";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("notes");

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <div className="flex h-auto items-stretch">
        <div className="bg-gray-100 w-1/4 p-4">
          <h2 className="font-bold text-xl mb-4">NEW CONTACT</h2>
          <h2 className="font-bold text-md mb-4">PERSONAL INFORMATION</h2>

          <div className="grid grid-cols-1 grid-rows-6 mt-3">
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
        <div className="w-3/4 p-4">
          <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center">
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

              <h1 className="ml-4 text-lg font-bold text-gray-800">
                Kampanye \ sub kampanye
              </h1>
            </div>

            <button className="btn-orange-sm">Save</button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="">
              <div className="flex-1 p-4">
                {/* Tabs */}
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => switchTab("notes")}
                    className={`hover:bg-orange-400 py-2 px-4 border-b-4 border-orange-700 hover:orange-blue-500 rounded ${
                      activeTab == "notes"
                        ? "bg-orange-500 text-white font-bold"
                        : "bg-white text-black"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => switchTab("progress")}
                    className={`hover:bg-orange-400 py-2 px-4 border-b-4 border-orange-700 hover:orange-blue-500 rounded ${
                      activeTab == "progress"
                        ? "bg-orange-500 text-white font-bold"
                        : "bg-white text-black"
                    }`}
                  >
                    Activity
                  </button>
                </div>

                {/* Notes Section */}
                {activeTab == "notes" && (
                  <div className="bg-orange-200 p-4 rounded shadow-md">
                    <div className="mb-4">
                      <label className="label-gray" htmlFor="note">
                        Input Note
                      </label>
                      <textarea
                        id="note"
                        className="w-full p-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="label-gray" htmlFor="tag">
                          Tag
                        </label>
                        <select
                          id="tag"
                          className="w-full bg-white p-2 text-black rounded border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                          className="w-full bg-white p-2 text-black rounded border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                          className="w-full bg-white p-2 text-black rounded border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Level</option>
                          <option value="">Low</option>
                          <option value="">Medium</option>
                          <option value="">Priority</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* progress section */}
                {activeTab == "progress" && (
                  <div className="bg-orange-200 p-4 rounded shadow-md">
                    <div className="grid grid-cols-2 grid-rows-3 gap-2">
                      {/* <div>
                        <label className="label-gray">Salesperson</label>
                        <input className="input-orange" />
                      </div> */}
                      <div>
                        <label className="label-gray">Input Progress</label>
                        <input className="input-orange" />
                      </div>
                      <div>
                        <label className="label-gray">Keterangan</label>
                        <textarea className="input-orange"></textarea>
                      </div>
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
