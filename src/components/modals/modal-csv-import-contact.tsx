import React, { useState } from "react";
import Papa from "papaparse";
import ApiService from "@/utils/services/ApiService";
import ErrorElement from "@/components/error-element";

interface ModalProps {
  isOpen: boolean;
  subCampaignId: number;
  onClose: () => void;
}

const ModalCsv: React.FC<ModalProps> = ({ isOpen, onClose, subCampaignId }) => {
  const apiService = new ApiService();
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      delimiter: ";",
      complete: (result) => {
        console.log(result.data);
        setData(result.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = data
        .filter((item) => item.full_name)
        .map((item) => ({
          ...item,
          sub_campaign_id: subCampaignId,
        }));

      const response = await apiService.importContact(updatedData);

      if (response.error == true) {
        setError(response.message);
      } else {
        alert("Success imported");
        setError("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        full_name: "",
        phone_number: "",
        email: "",
        country: "",
        website: "",
        sosmed: "",
        address: "",
        source: "",
        tag: "",
        status: "",
        level_priority: "",
        company: "",
      },
    ];

    const csv = Papa.unparse(templateData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "contact-template.csv";
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 h-2/3 overflow-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Import from CSV file
        </h2>
        <ErrorElement error={error} />
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {data.length >= 1 && (
          <div>
            <h3 className="text-xl text-black mt-3">Preview</h3>
            <table className=" bg-white border border-gray-200">
              <thead>
                <tr className="bg-primary text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">no</th>
                  <th className="py-3 px-6 text-left">full_name</th>
                  <th className="py-3 px-6 text-left">phone_number</th>
                  <th className="py-3 px-6 text-left">email</th>
                  <th className="py-3 px-6 text-left">country</th>
                  <th className="py-3 px-6 text-left">address</th>
                  <th className="py-3 px-6 text-left">source</th>
                  <th className="py-3 px-6 text-left">tag</th>
                  <th className="py-3 px-6 text-left">status</th>
                  <th className="py-3 px-6 text-left">level_priority</th>
                  <th className="py-3 px-6 text-left">company</th>
                  <th className="py-3 px-6 text-left">sosmed</th>
                  <th className="py-3 px-6 text-left">website</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{item.full_name}</td>
                    <td className="py-3 px-6 text-left">{item.phone_number}</td>
                    <td className="py-3 px-6 text-left">{item.email}</td>
                    <td className="py-3 px-6 text-left">{item.country}</td>
                    <td className="py-3 px-6 text-left">{item.address}</td>
                    <td className="py-3 px-6 text-left">{item.source}</td>
                    <td className="py-3 px-6 text-left">{item.tag}</td>
                    <td className="py-3 px-6 text-left">{item.status}</td>
                    <td className="py-3 px-6 text-left">
                      {item.level_priority}
                    </td>
                    <td className="py-3 px-6 text-left">{item.company}</td>
                    <td className="py-3 px-6 text-left">{item.sosmed}</td>
                    <td className="py-3 px-6 text-left">{item.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-5">
          <button className="btn-orange-sm" onClick={handleSubmit}>
            Import
          </button>
          <button
            className="text-black ml-2 btn-orange-outline-sm"
            onClick={handleDownloadTemplate}
          >
            Download Template
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

export default ModalCsv;
