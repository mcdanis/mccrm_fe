// // fitur
// - jumlah projek yang masih on going, dan setiap projek menampilkan detail tambahan seperti kapan di mulai, kapan berakhir, sisa berapa hari lagi
// - leaderboard menampilkan 5 orang dengan skor tertinggi
// - jumlah kontak hari ini yang statusnya SQL, MQL dan Cold berapa
// - jumlah projek closing 1 bulan ini
// - menampilkan jumlah customer yang di tangani oleh setiap user

import React from "react";
import Header from "@/app/crm/header";

const ReportDashboard = () => {
  const ongoingProjects = [
    { name: "Project A", startDate: "2023-01-01", endDate: "2023-12-31" },
    { name: "Project B", startDate: "2023-06-01", endDate: "2023-11-30" },
  ];

  const leaderboard = [
    { name: "User  1", score: 95 },
    { name: "User  2", score: 90 },
    { name: "User  3", score: 85 },
    { name: "User  4", score: 80 },
    { name: "User  5", score: 75 },
  ];

  const contactsToday = { SQL: 10, MQL: 5, Cold: 15 };
  const projectsClosedThisMonth = 3;
  const customersPerUser = [
    { user: "User  1", customers: 20 },
    { user: "User  2", customers: 15 },
    { user: "User  3", customers: 10 },
  ];

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Laporan Sistem CRM
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Ongoing Projects */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Projek Ongoing
            </h2>
            {ongoingProjects.map((project, index) => {
              const remainingDays = "";
              return (
                <div
                  key={index}
                  className="text-gray-600 mb-4 p-2 border rounded"
                >
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <small className="text-gray-400">
                    Kampanye <span className="text-red-500">/</span> sub kapanye
                  </small>
                  <div className="grid grid-cols-2 grid-rows-1 gap-0">
                    <div>
                      <p>Mulai: {project.startDate}</p>
                      <p>Berakhir: {project.endDate}</p>
                      <p>Sisa Hari: {remainingDays} hari</p>
                    </div>
                    <div>
                      <p>Campaign Owner: Idin</p>
                      <p>Campaign Manager: Idin</p>
                      <p>Level Priority: Idin</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leaderboard */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Leaderboard
            </h2>
            <ul className="text-gray-600">
              {leaderboard.map((user, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{user.name}</span>
                  <span>{user.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Contacts Today */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Kontak Hari Ini
            </h2>
            <div className="text-gray-600">
              <p>SQL: {contactsToday.SQL}</p>
              <p>MQL: {contactsToday.MQL}</p>
              <p>Cold: {contactsToday.Cold}</p>
            </div>
          </div>

          {/* Projects Closed This Month */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Projek Closing Bulan Ini
            </h2>
            <p className="text-gray-600">{projectsClosedThisMonth} projek</p>
          </div>
        </div>

        {/* Customers Per User */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Jumlah Customer per User
          </h2>
          <ul>
            {customersPerUser.map((user, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{user.user}</span>
                <span>{user.customers} customers</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReportDashboard;
