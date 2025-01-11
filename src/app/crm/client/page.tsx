"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/crm/header";
import Link from "next/link";
import ApiService from "@/utils/services/ApiService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { messageBox } from "@/utils/utils";

interface Client {
  id: string;
  name: string;
  status: string;
  phone_number: string;
  email: string;
  address: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await apiService.getClients();
      setClients(clientsData);
    };
    fetchClients();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = await messageBox(
      "Delete a Client",
      "sure delete this client " + name + "?",
      "question"
    );
    if (confirmDelete) {
      const response = await apiService.delete("client", id);
      if (!response.error) {
        setClients((prevClients) =>
          prevClients.filter((client) => Number(client.id) !== id)
        );

        messageBox("Berhasil", "Client berhasil di hapus", "success", "no");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <h1 className="text-2xl text-bold text-gray-700">Client</h1>
          </div>
          <div className="text-end">
            <Link href="/crm/client/add" className="btn-orange-sm">
              Add Client
            </Link>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-primary text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Kontak</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left"></th>
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
                <td className="py-3 px-6">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() =>
                        handleDelete(Number(client.id), client.name)
                      }
                      type="button"
                      className="flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
                    >
                      <TrashIcon className="h-4 w-6 text-red-500" />
                      <span>Delete</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        messageBox(
                          "Hapus client",
                          "Yakin hapus client " + client.name + "?",
                          "question"
                        )
                      }
                      className="flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:focus:ring-green-500 "
                    >
                      <PencilIcon className="h-4 w-6 text-green-500" />
                      <span>Edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Clients;
