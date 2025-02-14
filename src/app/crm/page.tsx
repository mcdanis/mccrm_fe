"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { contact_status, tag, level_priority } from "@/utils/utils";
import { useRouter } from "next/navigation";

interface Contacts {
  id: number;
  full_name: string;
  email: string;
  level_priority: number;
  tag: number;
  subCampaign: {
    name: string;
  };
  status: number; // Pastikan untuk menyesuaikan tipe ini sesuai dengan data Anda
}

interface subCampaigns {
  name: string;
  id: number;
}

interface Campaigns {
  name: string;
  id: number;
  subCampaigns: subCampaigns[];
}

const Crm = () => {
  const apiService = new ApiService();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [contacts, setContacts] = useState<Contacts[]>();
  const [campaigns, setCampaigns] = useState<Campaigns[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [subCampaignId, setSubCampaignId] = useState<string>("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const contact = await apiService.getCampaignsWithSubs(1, "");
      setCampaigns(contact);
    };
    fetchCampaigns();
  }, []);

  const findContacts = async () => {
    const filters = {
      keyword,
      status,
      tag: tagFilter,
      priority,
      subCampaignId,
    };
    const queryString = new URLSearchParams(filters).toString();
    const url = `${queryString}`;
    const contactsData = await apiService.findContacts(url);
    setContacts(contactsData);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      findContacts();
    }, 700);

    return () => clearTimeout(timer);
  }, [keyword, status, tagFilter, priority, subCampaignId]);

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
        <div className="text-gray-700">
          <div className="w-full">
            <h3 className="text-lg font-bold">FILTERS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="">Contact Name</label>
                <input
                  type="text"
                  placeholder="find a contact"
                  className="input-orange"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div>
                <label>Tag</label>
                <select
                  id=""
                  className="select-orange"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                >
                  <option value="">Select Tag</option>
                  {Object.entries(tag).map(([key, value]) => (
                    <option key={key} value={key}>
                      {" "}
                      {value}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Priority</label>
                <select
                  id=""
                  className="select-orange"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority Level</option>
                  {Object.entries(level_priority).map(([key, value]) => (
                    <option key={key} value={key}>
                      {" "}
                      {value}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <label htmlFor="">Status</label>
                <select
                  id="contact-status"
                  className="select-orange"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {Object.entries(contact_status).map(([key, value]) => (
                    <option key={key} value={key}>
                      {" "}
                      {value}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/3">
                <label htmlFor="">Campaign</label>
                <select
                  className="select-orange"
                  value={subCampaignId}
                  onChange={(e) => setSubCampaignId(e.target.value)}
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map((c) =>
                    c.subCampaigns.map((subCampaign) => (
                      <option
                        key={`${c.id}-${subCampaign.id}`}
                        value={subCampaign.id}
                      >
                        {c.name} / {subCampaign.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border mt-4 border-gray-200">
                <thead>
                  <tr className="bg-primary text-gray-600 uppercase text-sm leading-normal">
                    <th className="p-2 ">No</th>
                    <th className="p-2 ">Name</th>
                    <th className="p-2 ">Campaign</th>
                    <th className="p-2 ">Status</th>
                    <th className="p-2 ">E-Mail</th>
                    <th className="p-2 ">Tag</th>
                    <th className="p-2 ">Level Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {isLoading && (
                      <td colSpan={7} className="text-center p-2">
                        <div
                          role="status"
                          className="flex justify-center items-center"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-white-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    )}
                  </tr>
                  {contacts && contacts.length > 0 ? (
                    contacts.map((item, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-300 hover:text-black cursor-pointer"
                        onDoubleClick={() => redirectToContact(item.id)}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item.full_name}</td>
                        <td className="p-2">{item.subCampaign.name}</td>
                        <td className="p-2">{contact_status[item.status]}</td>
                        <td className="p-2">{item.email}</td>
                        <td className="p-2">{tag[item.tag]}</td>
                        <td className="p-2">
                          {level_priority[item.level_priority]}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-2 text-center italic text-gray-500"
                      >
                        Data Tidak Ada
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crm;
