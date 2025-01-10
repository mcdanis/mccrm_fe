"use client"

import React, { useEffect, useState } from "react";
import Header from "@/app/crm/header";
import Link from "next/link";
import {api} from "@/utils/utils"
import Cookies from 'js-cookie';

interface User{
  title: string;
  role: string;
  name: string;
  email: string;
  client_id: number;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() =>{
    const fetchUsers = async () => { 
      try {
        const response = await api('users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('mccrm_token')}`
          }
        })
        const data = await response.json()
        setUsers(data)
      }catch(error){
        console.log(error);
      }
    }
    fetchUsers()
  }, [])

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 mb-4 gap-4">
            <h1 className="text-2xl text-bold">Users</h1>
          </div>
          <div className="text-end">
            <Link href="/crm/user/add" className="btn-orange-sm">
              Add User
            </Link>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Client</th>
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
                <td className="py-3 px-6">{user.client_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    </>
  );
};

export default User;
