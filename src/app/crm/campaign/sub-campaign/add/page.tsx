"use client";

import React, { Suspense } from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { messageBox } from "@/utils/utils";
import ErrorElement from "@/components/error-element";
import { useRouter, useSearchParams } from "next/navigation";

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
function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const apiService = new ApiService();

  const [error, setError] = useState("");

  const [subCampaignName, setSubCampaignName] = useState("");
  const [clientId, setClientId] = useState<number | undefined>(undefined); // Definisikan tipe state

  const [subCampaignOwner, setSubCampaignOwner] = useState("");
  const [subCampaignManager, setSubCampaignManager] = useState("");
  const [subCampaignStatus, setSubCampaignStatus] = useState("");

  const [clients, setClients] = useState<Client_User[]>([]);
  const [users, setUsers] = useState<Client_User[]>([]);

  useEffect(() => {
    const checkingCampaignId = async () => {
      if (!searchParams.get("campaign_id")) {
        const msg = await messageBox(
          "",
          "URL Tidak valid, mohon pilih campaign !",
          "warning",
          "no"
        );
        if (msg) {
          router.push("/crm/campaign");
        }
      }
    };
    const fetchClients = async () => {
      const clientsData = await apiService.getClients();
      setClients(clientsData);
    };
    const fetchUsers = async () => {
      const usersData = await apiService.getUsers();
      setUsers(usersData);
    };

    checkingCampaignId();
    fetchUsers();
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const campaignId = searchParams.get("campaign_id") ?? "";
    const response = await apiService.addCampaign(
      "dummy",
      "1",
      subCampaignName,
      String(clientId),
      String(subCampaignOwner),
      String(subCampaignManager),
      String(subCampaignStatus),
      String(campaignId)
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
      setError(response.error);
    }
  };

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>

        <div className="flex items-center justify-center mt-10 rounded-sm">
          <div className="p-6 shadow-lg w-3/4">
            <h3 className="text-xl text-gray-700 font-bold mt-2 ">
              + Sub Campaign
            </h3>
            <ErrorElement error={error} />

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
                  onChange={(e) => setClientId(Number(e.target.value))}
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
      </Suspense>
    </>
  );
}

export default function Home() {
  return (<>
    <Suspense fallback={<>loading</>}>
      <MainContent />
    </Suspense>
  </>)
}
