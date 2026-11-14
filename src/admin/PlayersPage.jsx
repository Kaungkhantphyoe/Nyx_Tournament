import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function PlayersPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Players");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 12 Mock Players with distinct info & statuses
  const [players] = useState([
    {
      id: "#NYX-8842",
      name: "Min Thant",
      team: "Yangon Badminton Club",
      email: "minthant@example.com",
      phone: "09250123789",
      stats: "0 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8843",
      name: "Aung Myo",
      team: "Mandalay Heroes Club",
      email: "aungmyo@example.com",
      phone: "09252998877",
      stats: "3,650 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8844",
      name: "Htet Aung",
      team: "Mawlamyine Shuttlers",
      email: "htetaung@example.com",
      phone: "09250998888",
      stats: "2,900 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8845",
      name: "Su Su",
      team: "Yangon Club",
      email: "susu@example.com",
      phone: "0925011223",
      stats: "1,500 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8846",
      name: "Zin Min",
      team: "Taunggyi Club",
      email: "zinmin@example.com",
      phone: "09250112233",
      stats: "950 PTS",
      status: "Warning",
    },
    {
      id: "#NYX-8847",
      name: "Thet Htar",
      team: "Naypyidaw Smashers",
      email: "thethtar@example.com",
      phone: "09250445566",
      stats: "4,100 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8848",
      name: "May Oo",
      team: "Bago United",
      email: "mayoo@example.com",
      phone: "09250778899",
      stats: "1,200 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8849",
      name: "Zaw Lin",
      team: "Pathein Racquet",
      email: "zawlin@example.com",
      phone: "09250332211",
      stats: "800 PTS",
      status: "Warning",
    },
    {
      id: "#NYX-8850",
      name: "Kyaw Swar",
      team: "Mandalay Smash",
      email: "kyawswar@example.com",
      phone: "09250889900",
      stats: "0 PTS",
      status: "Banned",
    },
    {
      id: "#NYX-8851",
      name: "Thiri San",
      team: "Yangon Elites",
      email: "thirisan@example.com",
      phone: "09250113344",
      stats: "2,300 PTS",
      status: "Active",
    },
    {
      id: "#NYX-8852",
      name: "Aung Ko",
      team: "Bago Strikers",
      email: "aungko@example.com",
      phone: "09250224455",
      stats: "450 PTS",
      status: "Warning",
    },
    {
      id: "#NYX-8853",
      name: "Nilar Win",
      team: "Taunggyi Eagles",
      email: "nilarwin@example.com",
      phone: "09250335566",
      stats: "0 PTS",
      status: "Banned",
    },
  ]);

  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Players" ||
      p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPlayers.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPlayers.slice(indexOfFirstRow, indexOfLastRow);

  const paddedRows = [...currentRows];
  while (paddedRows.length < rowsPerPage) {
    paddedRows.push(null);
  }

  const handleExportCSV = () => {
    const headers = [
      "Player ID,Athlete Name,Team/Club,Contact Email,Phone Number,Stats & Points,Status\n",
    ];
    const rows = filteredPlayers.map(
      (p) =>
        `"${p.id}","${p.name}","${p.team}","${p.email}","${p.phone}","${p.stats}","${p.status}"\n`,
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + headers.concat(rows).join("");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registered_players.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        padding: "28px",
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 75px)",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          padding: "16px 20px",
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: "280px",
            maxWidth: "400px",
          }}
        >
          <SearchIcon
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "18px",
            }}
          />
          <input
            type="text"
            placeholder="Search player name, ID, or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "12px",
              outline: "none",
              boxSizing: "border-box",
              backgroundColor: "#fff",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            Status:
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                fontSize: "12px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="All Players">All Players</option>
              <option value="Active">Active</option>
              <option value="Warning">Warning</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#0f172a",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <FileDownloadOutlinedIcon style={{ fontSize: "16px" }} /> Export
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
                color: "#64748b",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              <th style={{ padding: "14px 20px" }}>Player ID</th>
              <th style={{ padding: "14px 20px" }}>Athlete Name</th>
              <th style={{ padding: "14px 20px" }}>Team / Club</th>
              <th style={{ padding: "14px 20px" }}>Contact Email</th>
              <th style={{ padding: "14px 20px" }}>Phone Number</th>
              <th style={{ padding: "14px 20px" }}>Stats & Points</th>
              <th style={{ padding: "14px 20px" }}>Status</th>
              <th style={{ padding: "14px 20px", textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paddedRows.map((player, index) => {
              if (!player) {
                return (
                  <tr
                    key={`empty-${index}`}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      height: "51px",
                    }}
                  >
                    <td
                      colSpan="8"
                      style={{ padding: "14px 20px", color: "transparent" }}
                    >
                      -
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={player.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    color: "#334155",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    {player.id}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {player.name}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#64748b" }}>
                    {player.team}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {player.email}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {player.phone}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    {player.stats}
                  </td>
                  <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                    {player.status === "Active" && (
                      <span
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#16a34a",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        ● Active
                      </span>
                    )}
                    {player.status === "Warning" && (
                      <span
                        style={{
                          backgroundColor: "#fefce8",
                          color: "#ca8a04",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        ● Warning
                      </span>
                    )}
                    {player.status === "Banned" && (
                      <span
                        style={{
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        ● Banned
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/players/${player.id.replace("#", "")}`,
                          { state: { player } },
                        )
                      }
                      style={{
                        backgroundColor: "#f1f5f9",
                        color: "#0f172a",
                        border: "1px solid #cbd5e1",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <VisibilityOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Showing {filteredPlayers.length > 0 ? indexOfFirstRow + 1 : 0} to{" "}
            {Math.min(indexOfLastRow, filteredPlayers.length)} of{" "}
            {filteredPlayers.length} entries
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "6px 12px",
                backgroundColor: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                color: currentPage === 1 ? "#94a3b8" : "#334155",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor:
                    currentPage === index + 1 ? "#0f172a" : "#fff",
                  color: currentPage === index + 1 ? "#fff" : "#334155",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                padding: "6px 12px",
                backgroundColor: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "12px",
                cursor:
                  currentPage === totalPages || totalPages === 0
                    ? "not-allowed"
                    : "pointer",
                color:
                  currentPage === totalPages || totalPages === 0
                    ? "#94a3b8"
                    : "#334155",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
