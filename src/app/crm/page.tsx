"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { contact_status } from "@/utils/utils";
import { useRouter } from "next/navigation";

interface Contacts {
  id: number;
  full_name: string;
  subCampaign: {
    name: string;
  };
  status: number; // Pastikan untuk menyesuaikan tipe ini sesuai dengan data Anda
}

const Crm = () => {
  const apiService = new ApiService();
  const router = useRouter();
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

  const redirectToContact = (contactId: number) => {
    router.push(`/crm/campaign/sub-campaign/contact/${contactId}`);
  };

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
                  <th className="p-2 ">No</th>
                  <th className="p-2 ">Name</th>
                  <th className="p-2 ">Campaign</th>
                  <th className="p-2 ">Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-300 hover:text-black cursor-pointer"
                    onDoubleClick={() => redirectToContact(item.id)}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item.full_name}</td>
                    <td className="p-2">{item.subCampaign.name}</td>
                    <td className="p-2">{contact_status[item.status]}</td>
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
