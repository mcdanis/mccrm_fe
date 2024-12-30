"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [filterValue, setFilterValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value);
  };

  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Kampanye Klinik ${i + 1}`,
  }));

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2">
              TYPE:
            </label>
            <input
              type="text"
              id="filter"
              value={filterValue}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>
          &nbsp;
          <div className="flex items-center">
            <label htmlFor="status" className="mr-2">
              STATUS:
            </label>
            <select
              id="status"
              value={statusValue}
              onChange={handleStatusChange}
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white rounded-md p-4">
            <p className="font-bold text-lg">APLIKASI BOOKING KLINIK</p>

            <div className="max-w-4xl mx-auto mt-2">
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="overflow-y-auto h-[200px]">
                  <table className="min-w-full border-collapse border-spacing-0">
                    <tbody>
                      {data.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-yellow-100 hover:text-black"
                        >
                          <td className="px-4 py-2 border-b border-gray-300">
                            <Link href="/crm/campaign/sub-campaign/12">
                              {item.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-500 text-white rounded-md p-4">
            <p className="font-bold text-lg">APLIKASI PENGATURAN KEUANGAN</p>
            <button className="bg-gray-400 text-white rounded-md px-4 py-2 mt-2">
              Detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
