"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Inter, Montserrat } from "@next/font/google";
import ApiService from "@/utils/services/ApiService";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface SubCampaign {
  id: number;
  name: string;
}

interface Campaign {
  id: number;
  name: string;
  subCampaigns: SubCampaign[];
}

export default function Campaign() {
  const [filterValue, setFilterValue] = useState("");
  const [statusValue, setStatusValue] = useState(1);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsData = await apiService.getCampaignsWithSubs(
        statusValue,
        filterValue
      );
      setCampaigns(campaignsData);
    };
    fetchCampaigns();
  }, [statusValue, filterValue]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(Number(event.target.value));
  };

  const highlightText = (text: string) => {
    if (!filterValue) return text;

    const regex = new RegExp(`(${filterValue})`, "gi"); // Regex untuk mencari kata yang sesuai (case-insensitive)
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === filterValue.toLowerCase() ? (
        <mark
          key={index}
          style={{ backgroundColor: "#ff0", fontWeight: "bold" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-5">
            <div className="items-center">
              <input
                type="text"
                id="filter"
                value={filterValue}
                onChange={handleFilterChange}
                className="input-orange"
                placeholder="type campaign/sub campaign name"
              />
            </div>
            <div className="items-center">
              <select
                id="status"
                value={statusValue}
                onChange={handleStatusChange}
                className="select-orange"
              >
                <option value="1">Active</option>
                <option value="0">Non-Active</option>
              </select>
            </div>
          </div>
          <div className="text-end">
            <Link href="/crm/campaign/add" className="btn-orange-sm">
              Add Campaign
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {campaigns.map((campaign) => (
            <div className="inline-block" key={campaign.id}>
              <div className="max-w-xs overflow-hidden rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
                <p
                  className={`font-bold text-md text-gray-700 ${montserrat.className} flex items-center`}
                >
                  <Link
                    href={`/crm/campaign/` + campaign.id}
                    className="hover:underline"
                  >
                    {campaign.name}
                  </Link>
                  <Link
                    href={`/crm/campaign/sub-campaign/add?campaign_id=${campaign.id}`}
                    className="ml-auto text-center btn-orange-sm"
                  >
                    +
                  </Link>
                </p>
                <div className="mt-4 overflow-y-auto h-[200px]">
                  <table className="min-w-full">
                    <tbody>
                      {campaign.subCampaigns.map((subCampaign) => (
                        <tr
                          key={`${campaign.id}-${subCampaign.id}`}
                          className="hover:bg-gray-200 hover:text-black"
                        >
                          <td
                            className={`px-4 py-2 border-b border-gray-300 ${inter.className}`}
                          >
                            <Link
                              href={`/crm/campaign/sub-campaign/${subCampaign.id}`}
                              className="label-gray underline"
                            >
                              {highlightText(subCampaign.name)}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
