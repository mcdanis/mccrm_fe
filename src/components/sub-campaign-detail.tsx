"use client";

import React from "react";
import { useState, useEffect } from "react";
import Modal from "@/components/modals/modal-add-existing-contact";
import ModalCsv from "@/components/modals/modal-csv-import-contact";
import Link from "next/link";
import ApiService from "@/utils/services/ApiService";
import { useRouter } from "next/navigation";
import { convert } from "@/utils/utils";

interface InfoProps {
  subCampaign: Record<string>;
}

export const Contact: React.FC<InfoProps> = ({ subCampaign }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCsv, setIsModalOpenCsv] = useState(false);
  const [contacts, setContacts] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalCsv = () => setIsModalOpenCsv(true);
  const closeModalCsv = () => setIsModalOpenCsv(false);

  const apiService = new ApiService();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const searchParams = useSearchParams();
  useEffect(() => {
    if (!subCampaign || !subCampaign.id) {
      return;
    }
    const fetchContacts = async () => {
      const contacts = await apiService.getContacts(subCampaign.id);
      setContacts(contacts);
    };

    fetchContacts();
  }, [subCampaign]);

  if (!contacts) {
    return;
  }

  const contactDetail = (contactId: number) => {
    router.push(`/crm/campaign/sub-campaign/contact/${contactId}`);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <ModalCsv
        subCampaignId={subCampaign.id}
        isOpen={isModalOpenCsv}
        onClose={closeModalCsv}
      />
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
            <button
              onClick={openModalCsv}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-start"
            >
              CSV
            </button>
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
            <tr className="bg-primary text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>

              <th className="py-3 px-6 text-left">Name</th>

              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">E-Mail</th>
              <th className="py-3 px-6 text-left">Company</th>

              <th className="py-3 px-6 text-left">Status</th>

              <th className="py-3 px-6 text-left">Tag</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onDoubleClick={() => contactDetail(contact.id)}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{contact.full_name}</td>
                <td className="py-3 px-6">{contact.phone_number}</td>
                <td className="py-3 px-6">{contact.email}</td>
                <td className="py-3 px-6">{contact.company}</td>
                <td className="py-3 px-6">
                  {convert(contact.status, "status")}
                </td>
                <td className="py-3 px-6">{convert(contact.tag, "tag")}</td>
                <td className="py-3 px-6">
                  s
                  {contact.status == 8 && (
                    <button className="btn-orange-sm">Add as Customer</button>
                  )}
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Dropdown button{" "}
                  </button>
                  <div
                    id="dropdown"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

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
