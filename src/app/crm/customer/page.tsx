// // fitur
// - jumlah projek yang masih on going, dan setiap projek menampilkan detail tambahan seperti kapan di mulai, kapan berakhir, sisa berapa hari lagi
// - leaderboard menampilkan 5 orang dengan skor tertinggi
// - jumlah kontak hari ini yang statusnya SQL, MQL dan Cold berapa
// - jumlah projek closing 1 bulan ini 
// - menampilkan jumlah customer yang di tangani oleh setiap user

import React from 'react';
import Header from "@/app/crm/header";

const ReportDashboard = () => {


    return (<>
        <Header />
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold mb-6 text-gray-700">Laporan Sistem CRM</h1>
            <small>menampilkan kontak yang sudah final, antara kontak yang menolak dan yang sudah closing, dan data ini juga yang bisa di ambil saat nambah kontak by exitiskontak</small>

            <div className="bg-white p-4 rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 bg-primary text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">No</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">E-mail</th>
                            <th className="py-3 px-6 text-left">Campaign</th>
                            <th className="py-3 px-6 text-left">Company</th>
                            <th className="py-3 px-6 text-left">Prospect Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>dani</td>
                            <td>dani@gmail.com</td>
                            <td>uber / web dev android</td>
                            <td>Customer</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>dani</td>
                            <td>dani@gmail.com</td>
                            <td>uber / web dev android</td>
                            <td>Reject</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>dani</td>
                            <td>dani@gmail.com</td>
                            <td>uber / web dev android</td>
                            <td>Loyal</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ div></>
    );
};

export default ReportDashboard;