"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import { api } from "@/utils/utils";
import Cookies from "js-cookie";
import ApiService from "@/utils/services/ApiService";
// import Link from "next/link";

interface Client {
  id: number;
  name: string;
  role: string;
  title: string;
  email: string;
  client_id: number;
  password: string;
}
export default function Client() {
  const [error, setError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await api("user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
        },
        body: JSON.stringify({
          email,
          name,
          title,
          role: role,
          client_id: clientId,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      window.location.href = "/crm/user";
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const apiService = new ApiService();

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await apiService.getClients();
      setClients(clientsData);
    };
    fetchClients();
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-10 rounded-sm">
        <div className="p-6 shadow-lg w-3/4">
          <h3 className="text-lg text-gray-700 font-bold">+ Add User</h3>
          {error && <p className="text-red-500 italic text-sm mt-5">{error}</p>}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="campaign-name" className="label-gray">
                Name
              </label>
              <input
                type="text"
                className="input-orange"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-name" className="label-gray">
                Title
              </label>
              <input
                type="text"
                className="input-orange"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-owner" className="label-gray">
                Role
              </label>
              <select
                className="select-orange"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Pilih Role</option>
                <option value="MR">Marketing Representative (MR)</option>
                <option value="SDR">
                  Sales Development Representative (SDR)
                </option>
                <option value="AE">Account Executive (AE)</option>
                <option value="ADM">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-status" className="label-gray">
                Client
              </label>
              <select
                className="select-orange"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option>Pilih Client</option>
                {clients.map((client, index) => (
                  <option key={index} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-name" className="label-gray">
                Password
              </label>
              <input
                type="text"
                className="input-orange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
