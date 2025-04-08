"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = getCookie("jwttoken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
};

export default function TestPage() {
  const [testData, setTestData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchTestData = async () => {
      try {
        const response = await fetchWithToken(`${apiUrl}/test/check`);
        if (response.ok) {
          const data = await response.json();
          setTestData(JSON.stringify(data, null, 2)); // Store the fetched data as a formatted string
        } else {
          setError(`Failed to fetch data: ${response.status}`);
        }
      } catch (error) {
        setError("Error fetching test data.");
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">
          Test Page
        </h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : testData ? (
          <pre className="text-sm text-gray-700">{testData}</pre>
        ) : (
          <p>Loading...</p>
        )}
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
