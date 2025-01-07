"use client";

import React from "react";
import { useState } from "react";
import Modal from "@/components/modals/modal-add-existing-contact";
import Link from "next/link";

export const Contact = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
              href="/crm/campaign/sub-campaign/contact/add"
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
export const Info = () => {
  const [formData, setFormData] = useState({
    projectTargetClosingProd: "",
    subCampaignOwner: "",
    createdAt: "",
    status: "",
    subCampaignManager: "",
    summary: "",
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
          <div className="grid grid-cols-2 grid-rows-5 gap-3">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectTargetClosingProd"
              >
                Project/Target Closing/Production:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="createdAt"
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subCampaignManager"
              >
                Sub Campaign Manager:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="subCampaignManager"
                type="text"
                name="subCampaignManager"
                value={formData.subCampaignManager}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="summary"
              >
                Summary:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
