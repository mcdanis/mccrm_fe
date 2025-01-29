"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/crm/header";
import Link from "next/link";
import { Contact, Info } from "@/components/sub-campaign-detail";
import ApiService from "@/utils/services/ApiService";
import { useParams } from "next/navigation";
interface Campaign {
  id: number;
  name: string;
}

interface SubCampaign {
  id: number;
  campaign_id: string;
  name: string;
  owner: number;
  manager: number;
  status: string;
  client_id: number;
  created_by: number;
  createdAt: number;
  campaign: Campaign;
}

const Crm = () => {
  const apiService = new ApiService();

  const params = useParams();
  const { sub_campaign_id } = params;

  const [activeContent, setActiveContent] = useState("Contact");
  const [subCampaign, setSubCampaign] = useState<SubCampaign>();

  useEffect(() => {
    const subCampaign = async () => {
      const subCampaignData = await apiService.getSubCampaign(
        Number(sub_campaign_id)
      );
      setSubCampaign(subCampaignData);
    };
    subCampaign();
  }, []);

  const handleNavClick = (content: string) => {
    setActiveContent(content);
  };
  if (!subCampaign) {
    return <>please wait..</>;
  }
  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 flex flex-col justify-start items-start p-4">
          <nav className="flex flex-col gap-4 w-full">
            <button
              onClick={() => handleNavClick("Contact")}
              className={`text-white hover:bg-[#5C708E] px-4 py-2 rounded ${
                activeContent === "Contact" ? "bg-[#3c5d8f]" : ""
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavClick("Info")}
              className={`text-white hover:bg-[#5C708E] px-4 py-2 rounded ${
                activeContent === "Info" ? "bg-[#3c5d8f]" : ""
              }`}
            >
              Info
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            <Link
              href={`/crm/campaign/` + subCampaign.campaign.id}
              className="text-gray-400 hover:underline hover:text-gray-700"
            >
              {subCampaign.campaign.name}
            </Link>{" "}
            \ {subCampaign?.name}
          </h2>
          <h2 className="text-1xl font-semibold text-gray-500">
            {activeContent}
          </h2>
          <div className="mt-4">
            {activeContent === "Contact" && (
              <Contact subCampaign={subCampaign} />
            )}
            {activeContent === "Info" && <Info subCampaign={subCampaign} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crm;
