"use client";

import React from "react";
import { useState } from "react";
import Modal from "@/components/modals/modal-add-existing-contact";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export const Contact: React.FC<InfoProps> = ({ subCampaign }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const searchParams = useSearchParams()

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className="relative">
        <button onClick={toggleDropdown} className="btn-orange-sm">
          Add contact
        </button>
        {isDropdownOpen && (
          <div className="absolute w-48 bg-white rounded-md shadow-lg z-10">
            <Link
              href={`/crm/campaign/sub-campaign/contact/add?sub_campaign_id=${subCampaign.id}`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Single
            </Link>
            <a
              href="/service2"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              CSV
            </a>
            <button
              onClick={openModal}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-start"
            >
              Existing data
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>

              <th className="py-3 px-6 text-left">Nama</th>

              <th className="py-3 px-6 text-left">Company</th>

              <th className="py-3 px-6 text-left">Status</th>

              <th className="py-3 px-6 text-left">Tag</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            <tr key="2" className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">sdf</td>

              <td className="py-3 px-6">item.name</td>

              <td className="py-3 px-6">item.email</td>

              <td className="py-3 px-6">item.role</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

interface InfoProps {
  subCampaign: Record<string>;
}

export const Info: React.FC<InfoProps> = ({ subCampaign }) => {
  const [formData, setFormData] = useState({
    projectTargetClosingProd: subCampaign.name,
    subCampaignOwner: subCampaign.owner,
    status: subCampaign.status,
    subCampaignManager: subCampaign.manager,
  });

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

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectTargetClosingProd"
              >
                Sub-Campaign Name
              </label>
              <input
                className="input-orange"
                id="projectTargetClosingProd"
                type="text"
                name="projectTargetClosingProd"
                value={formData.projectTargetClosingProd}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subCampaignOwner"
              >
                Sub Campaign Owner:
              </label>
              <input
                className="input-orange"
                id="subCampaignOwner"
                type="text"
                name="subCampaignOwner"
                value={formData.subCampaignOwner}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="createdAt"
              >
                Created At:
              </label>
              <label className="text-gray-700">
                {new Date(subCampaign.createdAt).toLocaleString()}
              </label>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="createdAt"
              >
                Created By:
              </label>
              <label className="text-gray-700">{subCampaign.created_by}</label>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <input
                className="input-orange"
                id="status"
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subCampaignManager"
              >
                Sub Campaign Manager:
              </label>
              <input
                className="input-orange"
                id="subCampaignManager"
                type="text"
                name="subCampaignManager"
                value={formData.subCampaignManager}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn-orange-sm w-full mt-5">Update</button>
        </form>
      </div>
    </>
  );
};
