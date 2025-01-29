"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState } from "react";
import { api } from "@/utils/utils";
import Cookies from "js-cookie";
// import Link from "next/link";

export default function Client() {
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api("client/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
        },
        body: JSON.stringify({
          email,
          name,
          address,
          phone_number: phoneNumber,
          industry,
          status,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      window.location.href = "/crm/client";
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-10 rounded-sm">
        <div className="p-6 shadow-lg w-3/4">
          <h3 className="text-lg text-gray-700 font-bold">+ Add Client</h3>
          {error && <p className="text-red-500 italic text-sm mt-5">{error}</p>}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="campaign-name" className="label-gray">
                Client Name
              </label>
              <input
                type="text"
                className="input-orange"
                id="client-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="campaign-status" className="label-gray">
                Email
              </label>
              <input
                type="text"
                className="input-orange"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="sub-campaign-name" className="label-gray">
                Phone Number
              </label>
              <input
                type="text"
                className="input-orange"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-owner" className="label-gray">
                Address
              </label>
              <textarea
                name=""
                id="address"
                className="input-orange"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="sub-campaign-manager" className="label-gray">
                Industry
              </label>
              <input
                type="text"
                className="input-orange"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-status" className="label-gray">
                Status
              </label>
              <select
                className="select-orange"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Pilih Status</option>
                <option value="1">Active</option>
                <option value="0">Non-Antive</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn-orange-sm w-full mt-3">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
