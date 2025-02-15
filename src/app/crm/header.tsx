"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useIsNotLogin } from "../../utils/utils";
import ApiService from "@/utils/services/ApiService";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  role: string;
  title: string;
  client_id: string;
}

const Header = () => {
  useIsNotLogin();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const apiService = new ApiService();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await apiService.getUser(
        Number(Cookies.get("mccrm_user_id"))
      );
      setUser(userData);
    };
    getCurrentUser();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!user) {
    return <>Loading...</>;
  }
  return (
    <>
      <nav className="bg-[#5C708E]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-lg font-bold">McCRM v1</div>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/crm"
              className={`text-white hover:bg-[#3c5d8f] px-3 py-2 rounded`}
            >
              DASHBOARD
            </Link>
            {user.role == "ADM" && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`text-white hover:bg-[#3c5d8f] px-3 py-2 rounded `}
                >
                  ACCOUNT
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      href="/crm/client"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Client
                    </Link>
                    <Link
                      href="/crm/user"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      User
                    </Link>
                  </div>
                )}
              </div>
            )}
            <Link
              href="/crm/campaign"
              className={`text-white hover:bg-[#3c5d8f] px-3 py-2 rounded `}
            >
              CAMPAIGN
            </Link>
            <a
              href="/crm/customer"
              className={`text-white hover:bg-[#3c5d8f] px-3 py-2 rounded `}
            >
              CUSTOMER
            </a>
            <a
              href="/crm/report"
              className={`text-white hover:bg-[#3c5d8f] px-3 py-2 rounded `}
            >
              REPORT
            </a>
          </div>
          {/* Menu Hamburger untuk tampilan mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-orange">
            <Link
              href="/crm"
              className="block text-white hover:bg-[#3c5d8f] px-4 py-2"
            >
              DASHBOARD
            </Link>
            {user.role == "ADM" && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="block w-full text-left text-white hover:bg-[#3c5d8f] px-4 py-2"
                >
                  ACCOUNT
                </button>
                {isDropdownOpen && (
                  <div className="bg-white rounded-md shadow-lg z-10">
                    <Link
                      href="/crm/client"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Client
                    </Link>
                    <Link
                      href="/crm/user"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      User
                    </Link>
                  </div>
                )}
              </div>
            )}
            <Link
              href="/crm/campaign"
              className="block text-white hover:bg-[#3c5d8f] px-4 py-2"
            >
              CAMPAIGN
            </Link>
            <Link
              href="/crm/customer"
              className="block text-white hover:bg-[#3c5d8f] px-4 py-2"
            >
              CUSTOMER
            </Link>
            <Link
              href="/crm/report"
              className="block text-white hover:bg-[#3c5d8f] px-4 py-2"
            >
              REPORT
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
