"use client";

import React from "react";
import Header from "@/app/crm/header";
import { useState } from "react";
import Link from "next/link";

export default function Campaign() {
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
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <div className="items-center">
              <input
                type="text"
                id="filter"
                value={filterValue}
                onChange={handleFilterChange}
                className="input-orange"
                placeholder="type campaign/sub campaign name"
              />
            </div>
            <div className="items-center">
              <select
                id="status"
                value={statusValue}
                onChange={handleStatusChange}
                className="select-orange"
              >
                <option value="">Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>
          <div className="text-end">
            <Link href="/crm/campaign/add" className="btn-orange-sm">
              Add Campaign
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="inline-block">
            <div className="max-w-xs overflow-hidden rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
              <p className="font-bold text-lg text-center">
                APLIKASI BOOKING KLINIK
              </p>
              <div className="mt-4 overflow-y-auto h-[200px]">
                <table className="min-w-full">
                  <tbody>
                    {data.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-yellow-100 hover:text-black"
                      >
                        <td className="px-4 py-2 border-b border-gray-300">
                          <Link
                            href="/crm/campaign/sub-campaign/12"
                            className="label-gray"
                          >
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
          <div className="inline-block">
            <div className="max-w-xs overflow-hidden rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out p-5">
              <p className="font-bold text-lg text-center">
                APLIKASI BOOKING KLINIK
              </p>
              <div className="mt-4 overflow-y-auto h-[200px]">
                <table className="min-w-full">
                  <tbody>
                    {data.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-yellow-100 hover:text-black"
                      >
                        <td className="px-4 py-2 border-b border-gray-300">
                          <Link
                            href="/crm/campaign/sub-campaign/12"
                            className="label-gray"
                          >
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
      </div>
    </>
  );
}
