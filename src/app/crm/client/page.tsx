"use client"

import React, { useEffect, useState } from "react";
import Header from "@/app/crm/header";
import Link from "next/link";
import ApiService from "@/utils/services/ApiService";

interface Client{
  name: string;
  status: string;
  phone_number: string;
  email: string;
  address: string;
}

const Clients = () => {
  const [clients, setClients] =useState<Client[]>([]);
  const apiService = new ApiService()

  useEffect(() =>{    
    const fetchClients = async () => {
      const clientsData = await apiService.getClients();
      setClients(clientsData);
    };
    fetchClients();    
  }, [])

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <h1 className="text-2xl text-bold">Client</h1>
          </div>
          <div className="text-end">
            <Link href="/crm/client/add" className="btn-orange-sm">
              Add Client
            </Link>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Kontak</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {clients.map((client, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{client.name}</td>
                <td className="py-3 px-6">{client.email}</td>
                <td className="py-3 px-6">{client.phone_number}</td>
                <td className="py-3 px-6">{client.address}</td>
                <td className="py-3 px-6">{client.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    </>
  );
};

export default Clients;
