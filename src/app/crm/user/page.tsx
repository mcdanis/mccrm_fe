"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/crm/header";
import Link from "next/link";
import ApiService from "@/utils/services/ApiService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { messageBox } from "@/utils/utils";

interface User {
  id: number;
  title: string;
  role: string;
  name: string;
  email: string;
  client_id: number;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await apiService.getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = await messageBox(
      "Delete an User",
      "sure delete this user " + name + "?",
      "question"
    );
    if (confirmDelete) {
      const response = await apiService.delete("user", id);
      if (!response.error) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

        messageBox("Berhasil", "User deleted", "success", "no");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <h1 className="text-2xl text-bold text-gray-700">Users</h1>
          </div>
          <div className="text-end">
            <Link href="/crm/user/add" className="btn-orange-sm">
              Add User
            </Link>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 bg-primary text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Client</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.title}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">{user.client.name}</td>
                <td className="py-3 px-6">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() => handleDelete(Number(user.id), user.name)}
                      type="button"
                      className="flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
                    >
                      <TrashIcon className="h-4 w-6 text-red-500" />
                      <span>Delete</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        messageBox(
                          "Delete this user",
                          "sure delete this user " + user.name + "?",
                          "question"
                        )
                      }
                      className="flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:focus:ring-green-500 "
                    >
                      <PencilIcon className="h-4 w-6 text-green-500" />
                      <span>Edit</span>
                    </button>
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

export default User;
