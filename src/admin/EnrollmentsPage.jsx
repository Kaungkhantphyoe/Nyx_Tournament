import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import CloseIcon from "@mui/icons-material/Close";

export default function EnrollmentsPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Reject Modal States
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // View Reason Modal States
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [currentReason, setCurrentReason] = useState("");

  // Payment Slip Preview Modal States
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  // 15 Fake Enrollments Mock Data with Payment Slip Images
  const [enrollments, setEnrollments] = useState([
    {
      id: "#1",
      playerName: "Aung Aung",
      tournamentName: "Mandalay Open 2026",
      venue: "Badminton / Court A",
      format: "U-13 Boys Singles",
      amount: "25,000 MMK",
      date: "Aug 29, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742049-0a67d553c299?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#2",
      playerName: "Kyaw Kyaw",
      tournamentName: "Weekend Shuttle Masters",
      venue: "Badminton / Court B",
      format: "Men's Singles",
      amount: "10,000 MMK",
      date: "Aug 29, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#3",
      playerName: "Min Min",
      tournamentName: "Smash Summer Open 2026",
      venue: "Badminton / Court C",
      format: "U-13 Boys Singles",
      amount: "20,000 MMK",
      date: "Aug 29, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#4",
      playerName: "Min Maw & Hein Aung",
      tournamentName: "Weekend Shuttle Masters",
      venue: "Badminton / Court D",
      format: "Mixed Doubles",
      amount: "35,000 MMK",
      date: "Aug 29, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#5",
      playerName: "Su Su",
      tournamentName: "Mandalay Open 2026",
      venue: "Badminton / Court A",
      format: "Women's Singles",
      amount: "25,000 MMK",
      date: "Aug 28, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742049-0a67d553c299?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#6",
      playerName: "Zayar Lin",
      tournamentName: "Yangon Championship",
      venue: "Court 1",
      format: "Men's Singles",
      amount: "30,000 MMK",
      date: "Aug 28, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#7",
      playerName: "Nilar Win",
      tournamentName: "Smash Summer Open 2026",
      venue: "Court 2",
      format: "Women's Doubles",
      amount: "28,000 MMK",
      date: "Aug 27, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#8",
      playerName: "Thiha Zaw",
      tournamentName: "Weekend Shuttle Masters",
      venue: "Court 3",
      format: "Men's Singles",
      amount: "15,000 MMK",
      date: "Aug 27, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#9",
      playerName: "Hla Hla",
      tournamentName: "Mandalay Open 2026",
      venue: "Court A",
      format: "Women's Singles",
      amount: "25,000 MMK",
      date: "Aug 26, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742049-0a67d553c299?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#10",
      playerName: "Phone Myint",
      tournamentName: "Yangon Championship",
      venue: "Court B",
      format: "Men's Doubles",
      amount: "40,000 MMK",
      date: "Aug 26, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#11",
      playerName: "Nay Lin",
      tournamentName: "Smash Summer Open 2026",
      venue: "Court C",
      format: "Men's Singles",
      amount: "20,000 MMK",
      date: "Aug 25, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#12",
      playerName: "Thiri Mon",
      tournamentName: "Weekend Shuttle Masters",
      venue: "Court D",
      format: "Women's Singles",
      amount: "18,000 MMK",
      date: "Aug 25, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#13",
      playerName: "Khin Maung",
      tournamentName: "Mandalay Open 2026",
      venue: "Court A",
      format: "Men's Singles",
      amount: "25,000 MMK",
      date: "Aug 24, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742049-0a67d553c299?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#14",
      playerName: "Yadanar",
      tournamentName: "Yangon Championship",
      venue: "Court 1",
      format: "Women's Doubles",
      amount: "30,000 MMK",
      date: "Aug 24, 2026",
      method: "Wavepay",
      slipImg:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600",
      status: "Pending",
      reason: "",
    },
    {
      id: "#15",
      playerName: "Bo Bo",
      tournamentName: "Smash Summer Open 2026",
      venue: "Court 2",
      format: "Men's Singles",
      amount: "20,000 MMK",
      date: "Aug 23, 2026",
      method: "Kpay",
      slipImg:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600",
      status: "Pending",
      reason: "",
    },
  ]);

  // Handle Approve Action
  const handleApprove = (id) => {
    setEnrollments(
      enrollments.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item,
      ),
    );
  };

  // Open Reject Modal
  const openRejectModal = (id) => {
    setSelectedEnrollmentId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };

  // Confirm Reject Action
  const handleConfirmReject = () => {
    if (!rejectReason.trim()) return;
    setEnrollments(
      enrollments.map((item) =>
        item.id === selectedEnrollmentId
          ? { ...item, status: "Rejected", reason: rejectReason }
          : item,
      ),
    );
    setShowRejectModal(false);
    setSelectedEnrollmentId(null);
    setRejectReason("");
  };

  // Filter Data by Active Tab, Search Query, and Play Format Filter
  const filteredData = enrollments.filter((item) => {
    const matchesTab = item.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      item.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tournamentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat =
      formatFilter === "All" || item.format === formatFilter;
    return matchesTab && matchesSearch && matchesFormat;
  });

  // Pagination Logic (10 rows per page)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const emptyRowsCount = rowsPerPage - currentRows.length;

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 75px)",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      }}
    >
      {/* Filter Tabs & Format Filter & Search & Export Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            backgroundColor: "#e2e8f0",
            padding: "4px",
            borderRadius: "8px",
          }}
        >
          {["Pending", "Approved", "Rejected"].map((tab) => {
            const isActive = activeTab === tab;
            const count = enrollments.filter(
              (e) => e.status.toLowerCase() === tab.toLowerCase(),
            ).length;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  color: isActive ? "#0f172a" : "#64748b",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: isActive ? "bold" : "600",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {tab}
                <span
                  style={{
                    fontSize: "10px",
                    backgroundColor: isActive ? "#0f172a" : "#cbd5e1",
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "999px",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Play Format Filter & Search & Export */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* Play Format Dropdown Filter */}
          <select
            value={formatFilter}
            onChange={(e) => {
              setFormatFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "9px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "12px",
              fontWeight: "600",
              color: "#334155",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">Format: All Play Formats</option>
            <option value="Men's Singles">Men's Singles</option>
            <option value="Women's Singles">Women's Singles</option>
            <option value="U-13 Boys Singles">U-13 Boys Singles</option>
            <option value="Men's Doubles">Men's Doubles</option>
            <option value="Women's Doubles">Women's Doubles</option>
            <option value="Mixed Doubles">Mixed Doubles</option>
          </select>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "260px",
            }}
          >
            <SearchIcon
              style={{
                position: "absolute",
                left: "12px",
                color: "#94a3b8",
                fontSize: "18px",
              }}
            />
            <input
              type="text"
              placeholder="Search tournaments or players..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "9px 12px 9px 38px",
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "12px",
                outline: "none",
              }}
            />
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 16px",
              backgroundColor: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <FileDownloadOutlinedIcon style={{ fontSize: "16px" }} /> Export
          </button>
        </div>
      </div>

      {/* Enrollments Table Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
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
              <th style={{ padding: "14px 16px" }}>ID</th>
              <th style={{ padding: "14px 16px" }}>Player Name</th>
              <th style={{ padding: "14px 16px" }}>Tournament Name</th>
              <th style={{ padding: "14px 16px" }}>Venue / Court</th>
              <th style={{ padding: "14px 16px" }}>Play Format</th>
              <th style={{ padding: "14px 16px" }}>Payment Amount</th>
              <th style={{ padding: "14px 16px" }}>Submission Date</th>
              <th style={{ padding: "14px 16px" }}>Payment Method</th>
              <th style={{ padding: "14px 16px" }}>Payment Proof</th>
              <th style={{ padding: "14px 16px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    color: "#334155",
                  }}
                >
                  <td style={{ padding: "14px 16px", fontWeight: "bold" }}>
                    {row.id}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {row.playerName}
                  </td>
                  <td style={{ padding: "14px 16px" }}>{row.tournamentName}</td>
                  <td style={{ padding: "14px 16px" }}>{row.venue}</td>
                  <td style={{ padding: "14px 16px" }}>{row.format}</td>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight: "bold",
                      color: "#16a34a",
                    }}
                  >
                    {row.amount}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#64748b" }}>
                    {row.date}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        backgroundColor: "#f1f5f9",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      {row.method}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div
                      onClick={() => {
                        setCurrentImageSrc(row.slipImg);
                        setShowImageModal(true);
                      }}
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "6px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "1px solid #cbd5e1",
                      }}
                      title="Click to view payment proof"
                    >
                      <img
                        src={row.slipImg}
                        alt="Slip"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {activeTab === "Pending" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => handleApprove(row.id)}
                          style={{
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openRejectModal(row.id)}
                          style={{
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {activeTab === "Approved" && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#16a34a",
                          fontWeight: "bold",
                          backgroundColor: "#f0fdf4",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        <CheckCircleOutlineOutlinedIcon
                          style={{ fontSize: "14px" }}
                        />{" "}
                        Approved
                      </span>
                    )}

                    {activeTab === "Rejected" && (
                      <button
                        onClick={() => {
                          setCurrentReason(row.reason);
                          setShowReasonModal(true);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                        View Reason
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No enrollments found matching your filter criteria.
                </td>
              </tr>
            )}

            {/* Empty Rows to keep table height consistent */}
            {Array.from({ length: emptyRowsCount }).map((_, idx) => (
              <tr
                key={`empty-${idx}`}
                style={{ borderBottom: "1px solid #f1f5f9", height: "47px" }}
              >
                <td
                  colSpan="10"
                  style={{ padding: "14px 16px", color: "transparent" }}
                >
                  -
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
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
            Showing {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} to{" "}
            {Math.min(indexOfLastRow, filteredData.length)} of{" "}
            {filteredData.length} entries
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
      {/* PAYMENT SLIP PREVIEW MODAL */}
      {showImageModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "600px",
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            {/* Close X Icon at Top Right */}
            <button
              onClick={() => setShowImageModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>

            {/* Image Preview Container */}
            <div
              style={{
                margin: "16px 0 24px 0",
                maxHeight: "400px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={currentImageSrc}
                alt="Payment Slip Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "380px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Bottom Action Bar with Close Preview Button aligned to the Right */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <button
                onClick={() => setShowImageModal(false)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT REASON MODAL */}
      {showRejectModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "480px",
              padding: "28px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowRejectModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "18px" }} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#fef2f2",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#dc2626",
                }}
              >
                <ErrorOutlineIcon style={{ fontSize: "20px" }} />
              </div>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                Reject Reason <span style={{ color: "#dc2626" }}>*</span>
              </h2>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#334155",
                  }}
                >
                  Additional Note / Athlete Feedback
                </label>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                  Max 600 characters
                </span>
              </div>
              <textarea
                rows="4"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter additional note for the athlete... (e.g. Please re-upload a clear screenshot showing transaction time and bank reference number)"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              ></textarea>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowRejectModal(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Confirm & Send Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW REASON MODAL */}
      {showReasonModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "440px",
              padding: "28px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowReasonModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "18px" }} />
            </button>

            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "12px",
              }}
            >
              Rejection Feedback Note
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#475569",
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                lineHeight: "1.5",
                margin: "0 0 20px 0",
              }}
            >
              {currentReason || "No specific feedback provided."}
            </p>

            <button
              onClick={() => setShowReasonModal(false)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
