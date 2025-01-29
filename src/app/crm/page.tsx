"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { contact_status } from "@/utils/utils";
interface Contacts {
  full_name: string;
  subCampaign: {
    name: string;
  };
  status: number; // Pastikan untuk menyesuaikan tipe ini sesuai dengan data Anda
}

const Crm = () => {
  const apiService = new ApiService();
  const [keyword, setKeyword] = useState("");
  const [contacts, setContacts] = useState<Contacts[]>();

  const findContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchContacts = async () => {
        const contactsData = await apiService.findContacts(keyword);
        setContacts(contactsData);
      };
      fetchContacts();
    }, 700);

    return () => clearTimeout(timer);
  }, [keyword]);

  if (!contacts) {
    return <>please wait..</>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <h1 className="text-2xl text-bold text-gray-700">Dashboard</h1>
          </div>
          <div className="text-end"></div>
        </div>
        <div className="text-gray-700 grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="find a contact"
              className="input-orange"
              value={keyword}
              onChange={findContacts}
            />
            <table className="min-w-full bg-white border mt-4 border-gray-200">
              <thead>
                <tr className="bg-primary text-gray-600 uppercase text-sm leading-normal">
                  <th>No</th>
                  <th>Name</th>
                  <th>Campaign</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.full_name}</td>
                    <td>{item.subCampaign.name}</td>
                    <td>{contact_status[item.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            tempat kontak yang harus di proses atau karena kontak ada yang di
            asign ke akun anda
          </div>
        </div>
      </div>
    </>
  );
};

export default Crm;
