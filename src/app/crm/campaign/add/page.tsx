"use client";

import React from "react";
import Header from "@/app/crm/header";
// import { useState } from "react";
// import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-10 rounded-sm">
        <div className="p-6 shadow-lg w-3/4">
          <h3 className="text-lg text-gray-700 font-bold">Campaign</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="campaign-name" className="label-gray">
                Campaign Name
              </label>
              <input type="text" className="input-orange" id="campaign-name" />
            </div>
            <div>
              <label htmlFor="campaign-status" className="label-gray">
                Status
              </label>
              <select className="select-orange">
                <option>aktif</option>
                <option>non aktif</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg text-gray-700 font-bold mt-5">Sub Campaign</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="sub-campaign-name" className="label-gray">
                Sub Campaign Name
              </label>
              <input
                type="text"
                className="input-orange"
                id="sub-campaign-name"
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-owner" className="label-gray">
                Sub Campaign Owner
              </label>
              <select className="select-orange">
                <option>dani</option>
                <option>ijem</option>
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-manager" className="label-gray">
                Sub Campaign Manager
              </label>
              <select className="select-orange">
                <option>dani</option>
                <option>ijem</option>
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-status" className="label-gray">
                Status
              </label>
              <select className="select-orange">
                <option>aktif</option>
                <option>non aktif</option>
              </select>
            </div>
          </div>
          <button className="btn-orange-sm w-full mt-3">Save</button>
        </div>
      </div>
    </>
  );
}
