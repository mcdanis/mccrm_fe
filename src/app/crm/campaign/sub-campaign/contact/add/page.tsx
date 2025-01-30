"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Header from "@/app/crm/header";
import ErrorElement from "@/components/error-element";
import { Inter } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { messageBox, tag, contact_status, level_priority } from "@/utils/utils";
import ApiService from "@/utils/services/ApiService";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"]
});

interface SubCampaign {
  campaign: {
    name: string;
  };
  name: string;
}

const Contact = () => {
  const router = useRouter();
  const apiService = new ApiService();

  const searchParams = useSearchParams();
  const [subCampaign, setSubCampaign] = useState<SubCampaign>();
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "",
    address: "",
    source: "",
    note: "",
    company: "",
    tag: 1,
    contactStatus: 1,
    levelPriority: 1,
    subCampaignId: searchParams.get("sub_campaign_id"),
    userId: apiService.getCookiesUserId(),
  });

  useEffect(() => {
    const checkingCampaignId = async () => {
      if (!searchParams.get("sub_campaign_id")) {
        const msg = await messageBox(
          "",
          "URL Tidak valid, mohon pilih campaign/sub campaign dengan benar !",
          "warning",
          "no"
        );
        if (msg) {
          router.push("/crm/campaign");
        }
      }
    };

    const subCampaign = async () => {
      const subCampaignData = await apiService.getSubCampaign(
        Number(searchParams.get("sub_campaign_id"))
      );
      setSubCampaign(subCampaignData);
    };
    checkingCampaignId();
    subCampaign();
  }, []);

  if (!subCampaign) {
    return (
      <>
        <div>please wait Loading...</div>
      </>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = await messageBox(
      "",
      "Data will be saved, make sure all data is correct!",
      "question"
    );
    if (msg) {
      const response = await apiService.addContact(formData);
      if (response.error == false) {
        const msg = await messageBox(
          "",
          "Contacts successfully added",
          "success",
          "no"
        );
        if (msg) {
          // router.push("/crm/campaign");
          router.push(
            "/crm/campaign/sub-campaign/" + searchParams.get("sub_campaign_id")
          );
        }
      } else {
        setError(response.error);
      }
    }
  };

  const back = () => {
    router.back();
  };

  return (
    <>
      <Header />
      <div className="flex h-auto items-stretch">
        <div className="bg-[#F3F4F6] w-1/4 p-4">
          <h2
            className={`font-bold text-lg mb-4 text-gray-700 ${inter.className}`}
          >
            PERSONAL INFORMATION
          </h2>

          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="min-h-1">
              <label className="label-gray">Full Name</label>
              <input
                className="input-orange"
                name="fullName"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Phone Number</label>
              <input
                className="input-orange"
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Email</label>
              <input
                className="input-orange"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Company</label>
              <input
                className="input-orange"
                name="company"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Country</label>
              <input
                className="input-orange"
                name="country"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Address</label>
              <textarea
                className="input-orange"
                name="address"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="label-gray">Source</label>
              <input
                className="input-orange"
                name="source"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 bg-white">
          <ErrorElement error={error} />
          <div className="flex items-center p-4 bg-[#F3F4F6] shadow-md">
            <button
              onClick={back}
              className="flex items-center text-gray-600 hover:text-orange-500 focus:outline-none text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H3m0 0l6-6m-6 6l6 6"
                />
              </svg>
              Back
            </button>

            <div className="flex items-center w-full">
              <h1 className={`ml-4 font-bold text-gray-800 ${inter.className}`}>
                {subCampaign.campaign.name} \ {subCampaign.name}
              </h1>
              <button className="ml-auto btn-orange-sm" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="">
              <div className="flex-1 mt-2">
                <div className="bg-secondary p-4 rounded shadow-md">
                  <div className="mb-4">
                    <label className="label-gray" htmlFor="note">
                      Input Note
                    </label>
                    <textarea
                      id="note"
                      className="w-full p-2 text-black rounded focus:outline-none focus:ring-2 input-orange"
                      name="note"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="label-gray" htmlFor="tag">
                        Tag
                      </label>
                      <select
                        id="tag"
                        className="select-orange"
                        name="tag"
                        onChange={handleChange}
                      >
                        {Object.entries(tag).map(([key, value]) => (
                          <option key={key} value={key}>
                            {" "}
                            {value}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-gray" htmlFor="contact-status">
                        Contact Status
                      </label>
                      <select
                        id="contact-status"
                        className="select-orange"
                        name="contactStatus"
                        onChange={handleChange}
                      >
                        {Object.entries(contact_status).map(([key, value]) => (
                          <option key={key} value={key}>
                            {" "}
                            {value}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-gray">Level Priority</label>
                      <select
                        id="level-priority"
                        className="select-orange"
                        name="levelPriority"
                        onChange={handleChange}
                      >
                        {Object.entries(level_priority).map(([key, value]) => (
                          <option key={key} value={key}>
                            {" "}
                            {value}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
