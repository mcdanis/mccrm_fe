import React from "react";
import Header from "@/app/crm/header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen bg-purple-200">
        {/* Sidebar */}
        <div className="w-1/4 bg-purple-300 p-4">
          <h2 className="font-bold text-lg mb-4">Personal Information</h2>
          <ul className="space-y-2 text-sm">
            <li>Nama</li>
            <li>Email</li>
            <li>No WA</li>
            <li>No Telp</li>
            <li>Alamat</li>
            <li>Negara</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 bg-orange-300 text-black font-bold rounded">
              Notes
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded">
              Progress
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded">
              Status
            </button>
          </div>

          {/* Notes Section */}
          <div className="bg-purple-400 p-4 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-black mb-2 font-bold" htmlFor="note">
                Input Note
              </label>
              <textarea
                id="note"
                className="w-full p-2 bg-purple-200 text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-black mb-2 font-bold" htmlFor="tag">
                Tag
              </label>
              <select
                id="tag"
                className="w-1/3 p-2 bg-purple-200 text-black rounded border border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Pilih Tag</option>
                <option value="tag1">Tag 1</option>
                <option value="tag2">Tag 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
