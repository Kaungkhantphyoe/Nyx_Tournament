import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function TournamentPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Tournaments Mock Data (တူညီသော status များဖြင့်)
  const tournaments = [
    {
      id: "trn-1",
      name: "Yangon Masters Badminton Championship 2026",
      status: "Registration Open",
      statusColor: "#16a34a",
      bgBadge: "#f0fdf4",
      date: "Nov 14 - 18, 2026",
      court: "Court A",
      points: "5,000 PTS",
      fee: "25,000 MMK",
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
    },
    {
      id: "trn-2",
      name: "Mandalay Open Cup 2026",
      status: "Upcoming",
      statusColor: "#d97706",
      bgBadge: "#fef3c7",
      date: "Dec 14 - 18, 2026",
      court: "Court B",
      points: "3,500 PTS",
      fee: "20,000 MMK",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    },
    {
      id: "trn-3",
      name: "Inya Lake Junior Smash 2026",
      status: "Completed",
      statusColor: "#64748b",
      bgBadge: "#f1f5f9",
      date: "Oct 14 - 18, 2026",
      court: "Court D",
      points: "2,000 PTS",
      fee: "15,000 MMK",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
    },
  ];

  // Filtering Logic
  const filteredTournaments = tournaments.filter((trn) => {
    const matchesSearch = trn.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      trn.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 75px)",
        boxSizing: "border-box",
      }}
    >
      {/* Top Search & Filter & Create Action Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flex: "1",
            maxWidth: "450px",
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
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "13px",
              fontWeight: "600",
              color: "#334155",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">
              Status: All (Active, Upcoming, Completed)
            </option>
            <option value="Registration Open">Status: Registration Open</option>
            <option value="Upcoming">Status: Upcoming</option>
            <option value="Completed">Status: Completed</option>
          </select>

          {/* Create New Tournament Button */}
          <button
            onClick={() => navigate("/admin/tournament/create")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
            }}
          >
            <AddIcon style={{ fontSize: "20px" }} /> Create New Tournament
          </button>
        </div>
      </div>

      {/* Tournaments Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((trn) => (
            <div
              key={trn.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Card Image with Badge */}
              <div
                style={{
                  position: "relative",
                  height: "150px",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <img
                  src={trn.image}
                  alt={trn.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: trn.bgBadge,
                    color: trn.statusColor,
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    fontSize: "10px",
                    fontWeight: "800",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  ● {trn.status.toUpperCase()}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "18px",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#0f172a",
                      margin: "0 0 12px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {trn.name}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      marginBottom: "16px",
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <CalendarTodayOutlinedIcon
                        style={{ fontSize: "14px", color: "#dc2626" }}
                      />
                      <span>{trn.date}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <LocationOnOutlinedIcon
                        style={{ fontSize: "14px", color: "#2563eb" }}
                      />
                      <span>{trn.court}</span>
                    </div>
                  </div>

                  {/* Points & Entry Fee Section */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      backgroundColor: "#f8fafc",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #f1f5f9",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          fontWeight: "700",
                          color: "#64748b",
                          textTransform: "uppercase",
                        }}
                      >
                        Points Pool
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          color: "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <EmojiEventsOutlinedIcon
                          style={{ fontSize: "13px", color: "#d97706" }}
                        />{" "}
                        {trn.points}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          fontWeight: "700",
                          color: "#64748b",
                          textTransform: "uppercase",
                        }}
                      >
                        Entry Fee
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          color: "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <PaymentsOutlinedIcon
                          style={{ fontSize: "13px", color: "#16a34a" }}
                        />{" "}
                        {trn.fee}
                      </div>
                    </div>
                  </div>
                </div>

                {/* View & Manage Button */}
                <button
                  onClick={() => navigate(`/admin/tournament/${trn.id}`)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "background 0.2s",
                  }}
                >
                  View & Manage{" "}
                  <ArrowForwardIcon style={{ fontSize: "14px" }} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "span 3",
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            No tournaments found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
