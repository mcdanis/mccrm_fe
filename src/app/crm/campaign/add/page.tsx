"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { messageBox } from "@/utils/utils";
import { useRouter } from "next/navigation";

// import Link from "next/link";

// interface Campaign {
//   campaign_name: string;
//   campaign_status: string;
//   sub_campaign_name: string;
//   client_id: number;
//   sub_campaign_owner: string;
//   sub_campaign_manager: string;
//   sub_campaign_status: string;
// }
interface Client_User {
  id: number;
  name: string;
}
export default function Home() {
  const router = useRouter();

  const apiService = new ApiService();

  const [error, setError] = useState("");

  const [campaignName, setCampaignName] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [subCampaignName, setSubCampaignName] = useState("");
  const [clientId, setClientId] = useState("");
  const [subCampaignOwner, setSubCampaignOwner] = useState("");
  const [subCampaignManager, setSubCampaignManager] = useState("");
  const [subCampaignStatus, setSubCampaignStatus] = useState("");

  const [clients, setClients] = useState<Client_User[]>([]);
  const [users, setUsers] = useState<Client_User[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await apiService.getClients();
      setClients(clientsData);
    };
    const fetchUsers = async () => {
      const usersData = await apiService.getUsers();
      setUsers(usersData);
    };

    fetchUsers();
    fetchClients();

  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await apiService.addCampaign(
      campaignName,
      campaignStatus,
      subCampaignName,
      clientId,
      subCampaignOwner,
      subCampaignManager,
      subCampaignStatus
    );
    if (response.error == false) {
      const msg = await messageBox(
        "",
        "Campaign berhasil di buat",
        "success",
        "no"
      );
      if (msg) {
        router.push("/crm/campaign");
      }
    } else {
      setError(response.error)

    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-10 rounded-sm">
        <div className="p-6 shadow-lg w-3/4">
          <h3 className="text-lg text-gray-700 font-bold">Campaign</h3>
          {error &&
            <div className="p-4 mb-4 text-sm rounded-lg bg-red-100 dark:bg-gray-200 dark:text-red-400" role="alert">
              {error}
            </div>
          }
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div>
              <label htmlFor="campaign-name" className="label-gray">
                Campaign Name
              </label>
              <input
                type="text"
                className="input-orange"
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="campaign-status" className="label-gray">
                Status
              </label>
              <select
                className="select-orange"
                value={campaignStatus}
                onChange={(e) => setCampaignStatus(e.target.value)}
              >
                <option>Pilih</option>
                <option value={1}>Active</option>
                <option value={0}>Non-Active</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg text-gray-700 font-bold mt-5">Sub Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            <div>
              <label htmlFor="sub-campaign-name" className="label-gray">
                Sub Campaign Name
              </label>
              <input
                type="text"
                className="input-orange"
                id="sub-campaign-name"
                value={subCampaignName}
                onChange={(e) => setSubCampaignName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sub-campaign-owner" className="label-gray">
                Sub Campaign Owner
              </label>
              <select
                className="select-orange"
                value={subCampaignOwner}
                onChange={(e) => setSubCampaignOwner(e.target.value)}
              >
                <option>Pilih</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-manager" className="label-gray">
                Sub Campaign Manager
              </label>
              <select
                className="select-orange"
                value={subCampaignManager}
                onChange={(e) => setSubCampaignManager(e.target.value)}
              >
                <option>Pilih</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub-campaign-status" className="label-gray">
                Status
              </label>
              <select
                className="select-orange"
                value={subCampaignStatus}
                onChange={(e) => setSubCampaignStatus(e.target.value)}
              >
                <option>Pilih</option>
                <option value={1}>Active</option>
                <option value={0}>Non-Active</option>
              </select>
            </div>
            <div>
              <label htmlFor="client-id" className="label-gray">
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
          </div>
          <button onClick={handleSubmit} className="btn-orange-sm w-full mt-3">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
