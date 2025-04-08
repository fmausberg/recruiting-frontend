// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  return (
    <nav
      className={`bg-navbar-background shadow-lg ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-12 items-center h-16">
          <div className="col-span-1 md:col-span-3">
            <span className="text-xl font-bold text-navbar-text">Hello</span>
          </div>

          <div className="hidden md:block md:col-span-6">
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              <a href="/home" className="hover:text-navbar-hover text-navbar-text">
                Recruitingtests
              </a>
              {!loading && isLoggedIn && (
                <>
                  <a
                    href="/questions"
                    className="hover:text-navbar-hover text-navbar-text"
                  >
                    Questions
                  </a>
                  <a
                    href="/score"
                    className="hover:text-navbar-hover text-navbar-text"
                  >
                    Your Score
                  </a>
                  <a
                    href="/user"
                    className={`hover:text-navbar-hover text-navbar-text ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Profile
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 justify-self-end">
            <div className="hidden md:flex gap-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

