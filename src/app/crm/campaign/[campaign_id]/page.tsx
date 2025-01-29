"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/crm/header";
import ApiService from "@/utils/services/ApiService";
import { useParams } from "next/navigation";
import { messageBox, status } from "@/utils/utils";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  name: string;
  status: string;
}

const ReportDashboard = () => {
  const apiService = new ApiService();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const router = useRouter();
  const params = useParams();

  const { campaign_id } = params;

  const [form, setFormData] = useState({
    campaignStatus: "",
    campaignName: "",
    campaignId: 0,
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      const data = await apiService.getCampaign(Number(campaign_id));
      setCampaign(data);
    };
    fetchCampaign();
  }, []);

  useEffect(() => {
    if (campaign) {
      setFormData({
        campaignId: Number(campaign.id),
        campaignName: campaign.name,
        campaignStatus: campaign.status,
      });
    }
  }, [campaign]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRedirectToSubcampaign = async (id: number) => {
    router.push("/crm/campaign/sub-campaign/" + id);
  };
  const handleSubmit = async () => {
    const response = await apiService.updateCampaign(form);
    if (!response.error) {
      messageBox("", response.message, "success", "no");
    }
  };

  if (!campaign) {
    return <>please wait..</>;
  }

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-bold mb-6 text-gray-700">
          CAMPAIGN SETTINGS
        </h1>

        <div className="bg-white p-4 rounded-lg shadow text-gray-700">
          <h3 className="text-lg font-bold">Info</h3>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <input
                type="text"
                className="input-orange"
                placeholder="Campaign Name"
                value={form.campaignName}
                name="campaignName"
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                className="select-orange"
                name="campaignStatus"
                onChange={handleChange}
                value={form.campaignStatus}
              >
                <option value="">--</option>
                <option value={1}>Active</option>
                <option value={0}>Non-Active</option>
              </select>
            </div>
            <div>
              <label>Created by : {campaign.user.name}</label>
            </div>
            <div>
              <button className="btn-orange-sm" onClick={handleSubmit}>
                Update Campaign
              </button>
            </div>
          </div>
          <h1 className="text-lg font-bold mt-10">Sub Campaigns</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 bg-primary text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaign.subCampaigns.map((c, index) => (
                <tr
                  onDoubleClick={() => handleRedirectToSubcampaign(c.id)}
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{c.name}</td>
                  <td className="py-3 px-6 text-left">{status[c.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportDashboard;
