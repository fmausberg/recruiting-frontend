"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = getCookie("jwttoken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
};

export default function UserPage() {
  const { isLoggedIn, loading } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mail: "",
  });

  useEffect(() => {
    if (!isLoggedIn || loading) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchUserData = async () => {
      try {
        const response = await fetchWithToken(`${apiUrl}/appuser/me`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">
          Benutzerübersicht
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Vorname:
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Nachname:
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              E-Mail:
            </label>
            <input
              type="email"
              name="mail"
              value={userData.mail}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper function to get cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};
