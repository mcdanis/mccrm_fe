import React from "react";
import Header from "@/app/crm/header";

const Clients = () => {
  return (
    <>
      <Header />
      <div className="container p-3">
        <h2 className="text-2xl font-semibold">Client</h2>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No</th>

                <th className="py-3 px-6 text-left">Nama</th>

                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              <tr
                key="2"
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">1</td>

                <td className="py-3 px-6">PT Superindo</td>

                <td className="py-3 px-6">Aktif</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clients;
