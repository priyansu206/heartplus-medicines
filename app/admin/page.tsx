"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Appointment {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  service: string;
  status?: string;
}

export default function AdminDashboard() {
  return <AdminContent />;
}

function AdminContent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        setFetchError("Failed to load appointments: " + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <p className="text-slate-500 font-bold text-lg">Loading appointments...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">{fetchError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Clinic Admin Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              All appointment requests from patients.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
          >
            Logout
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold text-lg">No appointments found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-4 font-bold text-slate-600 uppercase tracking-wider text-xs">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 uppercase tracking-wider text-xs">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 uppercase tracking-wider text-xs">
                      Phone
                    </th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 uppercase tracking-wider text-xs">
                      Service
                    </th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 uppercase tracking-wider text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {new Date(appt.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-bold">
                        {appt.name}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {appt.phone}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {appt.service}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {appt.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-slate-400 text-xs font-medium">
                Total: {appointments.length} appointment{appointments.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
