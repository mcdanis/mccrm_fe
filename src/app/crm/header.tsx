"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-lg font-bold">MyApp</div>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/crm"
              className="text-white hover:bg-orange-700 px-3 py-2 rounded"
            >
              Dashboard
            </Link>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white hover:bg-orange-700 px-3 py-2 rounded"
              >
                Account
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
            <Link
              href="/crm/campaign"
              className="text-white hover:bg-orange-700 px-3 py-2 rounded"
            >
              Campaign
            </Link>
            <a
              href="/crm/contact"
              className="text-white hover:bg-orange-700 px-3 py-2 rounded"
            >
              Contact
            </a>
            <a
              href="/contact"
              className="text-white hover:bg-orange-700 px-3 py-2 rounded"
            >
              Report
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
          <div className="md:hidden bg-orange-600">
            <Link
              href="/"
              className="block text-white hover:bg-orange-700 px-4 py-2"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="block w-full text-left text-white hover:bg-orange-700 px-4 py-2"
              >
                Services
              </button>
              {isDropdownOpen && (
                <div className="bg-white rounded-md shadow-lg z-10">
                  <a
                    href="/service1"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Service 1
                  </a>
                  <a
                    href="/service2"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Service 2
                  </a>
                  <a
                    href="/service3"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Service 3
                  </a>
                </div>
              )}
            </div>
            <a
              href="/about"
              className="block text-white hover:bg-orange-700 px-4 py-2"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-white hover:bg-orange-700 px-4 py-2"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
