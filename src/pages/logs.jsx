import React, { useEffect, useState } from "react";
import axios from "axios";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      
      const res = await axios.get("http://172.17.6.87:4001/api/Log", {
        params: {
          PageIndex: pageIndex,
          PageSize: pageSize,
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      });

      setLogs(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [pageIndex, pageSize, search]);

  return (
    <div className="flex-1 bg-[#0C111D] text-white p-8 overflow-auto">
      <h1 className="text-3xl font-semibold mb-6">Logs</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full max-w-md bg-[#101828] text-white border border-[#344054] rounded-lg focus:outline-none"
        />
      </div>

      {/* Log Table */}
      <div className="overflow-x-auto rounded-xl border border-[#344054]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#101828] text-gray-300 border-b border-[#344054]">
            <tr>
              <th className="text-left px-4 py-3">№</th>
              <th className="text-left px-4 py-3">Action</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">ipAddress</th>
              <th className="text-left px-4 py-3">Method</th>
              <th className="text-left px-4 py-3">User</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  Данных нет
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr
                  key={log.id || index}
                  className="hover:bg-[#1A1F2E] transition"
                >
                  <td className="px-4 py-3">{(pageIndex - 1) * pageSize + index + 1}</td>
                  <td className="px-4 py-3">{log.action || "—"}</td>
                  <td className="px-4 py-3">{log.description || "—"}</td>
                  <td className="px-4 py-3">{log.ipAddress || "—"}</td>
                  <td className="px-4 py-3">{log.method || "—"}</td>
                  <td className="px-4 py-3">{log.performedBy || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-[#101828] text-white rounded-md mr-2"
            disabled={pageIndex === 1}
          >
            ⬅️
          </button>
          <button
            onClick={() => setPageIndex((prev) => prev + 1)}
            className="px-4 py-2 bg-[#101828] text-white rounded-md"
            disabled={pageIndex >= totalPages}
          >
            ➡️
          </button>
        </div>

        <div className="text-sm text-gray-400">
          Sahifa: {pageIndex} / {totalPages}
        </div>
      </div>
    </div>
  );
}

export default Logs;
