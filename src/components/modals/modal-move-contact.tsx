import React from "react";
import { useState, useEffect } from "react";
import ApiService from "@/utils/services/ApiService";
import { messageBox } from "@/utils/utils";

interface subCampaigns {
  name: string;
  id: number;
}

interface Campaigns {
  name: string;
  id: number;
  subCampaigns: subCampaigns[];
}
interface ModalProps {
  isOpen: boolean;
  contactId: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, contactId }) => {
  const apiService = new ApiService();
  const [campaigns, setCampaigns] = useState<Campaigns[]>([]);
  const [newSubCampaignId, setNewSubCampaignId] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const contact = await apiService.getCampaignsWithSubs(1, "");
      setCampaigns(contact);
    };
    fetchCampaigns();
  }, []);

  const handleSelectCampaign = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setNewSubCampaignId(value);
  };

  const handleSubmit = async () => {
    const acc = await apiService.moveContact(
      contactId,
      Number(newSubCampaignId)
    );
    if (!acc.error) {
      const success = await messageBox("", acc.message, "success", "no");
      if (success) {
        window.location.reload();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Choose a Sub Campaign
        </h2>
        <select
          onChange={(event) => handleSelectCampaign(event)}
          className="select-orange"
        >
          {campaigns.map((c) =>
            c.subCampaigns.map((subCampaign) => (
              <option key={`${c.id}-${subCampaign.id}`} value={subCampaign.id}>
                {c.name} / {subCampaign.name}
              </option>
            ))
          )}
        </select>
        <div className="flex justify-end mt-5">
          <button className="btn-orange-sm" onClick={handleSubmit}>
            Add
          </button>
          <button
            className="btn-orange-outline-sm ml-2 text-black"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
