"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    /**
     * BACKEND INTEGRATION POINT
     * -------------------------
     * fetch("/api/leads")
     *   .then(res => res.json())
     *   .then(setLeads)
     */

    // mock data
    setLeads([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9999999999",
        company: "Stealth Startup",
        service: "AI Product",
        createdAt: "2026-01-31",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Decacorn – Incoming Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-xl overflow-hidden">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-white/70">
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Service</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-white/10 text-sm"
              >
                <td className="p-4">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.company}</td>
                <td>{lead.service}</td>
                <td>{lead.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
