"use client";

import React from "react";
import { useState, useEffect } from "react";
import Modal from "@/components/modals/modal-add-existing-contact";
import ModalCsv from "@/components/modals/modal-csv-import-contact";
import ModalMoveContact from "@/components/modals/modal-move-contact";
import Link from "next/link";
import ApiService from "@/utils/services/ApiService";
import { useRouter } from "next/navigation";
import { convert, messageBox } from "@/utils/utils";

interface InfoProps {
  subCampaign: Record<string>;
}

export const Contact: React.FC<InfoProps> = ({ subCampaign }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactId, setContactId] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCsv, setIsModalOpenCsv] = useState(false);

  const [isModalMoveContactOpen, setIsModalMoveContactOpen] = useState(false);

  const [contacts, setContacts] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalMoveContact = () => setIsModalMoveContactOpen(true);
  const closeModalMoveContact = () => setIsModalMoveContactOpen(false);

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

  const handleChangeAction = async (event, id, name) => {
    const ev = event.target;

    switch (ev.value) {
      case "edit":
        // Jalankan kode untuk aksi Edit
        console.log("Edit action selected");
        break;
      case "delete":
        const confirmDelete = await messageBox(
          "",
          "Sure to delete this data '" +
            name +
            "', This will REMOVE ALL DATA related with this contact",
          "question"
        );
        if (confirmDelete) {
          const del = await apiService.delete("contact", id);
          if (!del.error) {
            const success = await messageBox("", del.message, "success", "no");
            if (success) {
              window.location.reload();
            }
          }
        }
        break;
      case "duplicate":
        const confirm = await messageBox(
          "",
          "sure duplicat this contact " + name + "?",
          "question"
        );
        if (confirm) {
          const duplicated = await apiService.duplicateContact(id);
          if (!duplicated.error) {
            const success = await messageBox(
              "",
              duplicated.message,
              "info",
              "no"
            );
            if (success) {
              window.location.reload();
            }
          }
        }

        break;
      case "move":
        const confimMove = await messageBox(
          "",
          "Sure move this contact " + name + " to another campaign?",
          "question"
        );
        if (confimMove) {
          setIsModalMoveContactOpen(true);
          setContactId(id);
        }
        break;
      case "aac":
        const confirmAcc = await messageBox(
          "",
          "Sure adding " + name + " as a customer?",
          "question"
        );
        if (confirmAcc) {
          const acc = await apiService.addAsCustomer(id);
          if (!acc.error) {
            const success = await messageBox("", acc.message, "success", "no");
            if (success) {
              window.location.reload();
            }
          }
        }
        break;
      default:
        // Jika tidak ada aksi yang dipilih
        console.log("No action selected");
    }
  };

  if (!contacts) {
    return;
  }

  const contactDetail = (contactId: number) => {
    router.push(`/crm/campaign/sub-campaign/contact/${contactId}`);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <ModalMoveContact
        isOpen={isModalMoveContactOpen}
        onClose={closeModalMoveContact}
        contactId={contactId}
      />
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
              >
                {/* onDoubleCdlick={() => contactDetail(contact.id)} */}
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {index + 1}
                </td>
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {contact.full_name}
                </td>
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {contact.phone_number}
                </td>
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {contact.email}
                </td>
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {contact.company}
                </td>
                <td
                  onDoubleClick={() => contactDetail(contact.id)}
                  className="py-3 px-6"
                >
                  {convert(contact.status, "status")}
                </td>
                <td
                  className="py-3 px-6"
                  onDoubleClick={() => contactDetail(contact.id)}
                >
                  {convert(contact.tag, "tag")}
                </td>
                <td className="py-3 px-6">
                  <select
                    name=""
                    id=""
                    className="select-orange"
                    onChange={(event) =>
                      handleChangeAction(event, contact.id, contact.full_name)
                    }
                  >
                    <option value="">Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="duplicate">Duplicate</option>
                    <option value="move">Move</option>
                    {contact.status == 8 && (
                      <option value="aac">Add as Customer</option>
                    )}
                  </select>
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
