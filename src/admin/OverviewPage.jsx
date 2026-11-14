import React, { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PaymentsIcon from "@mui/icons-material/Payments";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

export default function OverviewPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTournament, setSelectedTournament] =
    useState("All Tournaments");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [fullImageView, setFullImageView] = useState(null); // { title, url }

  const yearDataMap = {
    2026: {
      athletes: "348",
      athletesGrowth: "+12.4%",
      pending: "18",
      tournaments: "3",
      revenue: "200,000 MMK",
      revenueGrowth: "+8.1%",
      peakMonth: "Oct (342 Players)",
      avgFee: "25,000 MMK / athlete",
      chartHeights: [
        "35%",
        "42%",
        "50%",
        "55%",
        "48%",
        "58%",
        "62%",
        "65%",
        "70%",
        "88%",
        "82%",
        "75%",
      ],
    },
    2025: {
      athletes: "290",
      athletesGrowth: "+9.1%",
      pending: "12",
      tournaments: "2",
      revenue: "165,000 MMK",
      revenueGrowth: "+5.4%",
      peakMonth: "Nov (280 Players)",
      avgFee: "22,000 MMK / athlete",
      chartHeights: [
        "30%",
        "38%",
        "45%",
        "48%",
        "42%",
        "52%",
        "56%",
        "60%",
        "65%",
        "75%",
        "80%",
        "70%",
      ],
    },
    2024: {
      athletes: "210",
      athletesGrowth: "+6.0%",
      pending: "8",
      tournaments: "2",
      revenue: "120,000 MMK",
      revenueGrowth: "+3.2%",
      peakMonth: "Sep (195 Players)",
      avgFee: "20,000 MMK / athlete",
      chartHeights: [
        "25%",
        "30%",
        "35%",
        "40%",
        "38%",
        "45%",
        "48%",
        "50%",
        "55%",
        "62%",
        "68%",
        "60%",
      ],
    },
  };

  const currentStats = yearDataMap[selectedYear];

  const allPlayersData = [
    {
      id: "#NYX-8842",
      name: "Min Thant",
      team: "Yangon Badminton Club",
      proofImg:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      proofName: "KPay_Slip_8842.png",
      phone: "+95 9 450 123 789",
      email: "minthant@example.com",
      address: "No. 45, Pyay Road, Kamayut Township, Yangon",
      date: "Oct 20, 2026 • 10:30 AM",
      tournament: "Mandalay Open 2026",
      category: "U-13 Boys Singles",
      birthFront:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
      birthBack:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    },
    {
      id: "#NYX-8843",
      name: "Aung Myo",
      team: "Mandalay Heroes Club",
      proofImg:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      proofName: "Receipt_8843.png",
      phone: "+95 9 791 444 555",
      email: "aungmyo@example.com",
      address: "No. 12, 78th Street, Chanayethazan, Mandalay",
      date: "Oct 19, 2026 • 04:15 PM",
      tournament: "Mandalay Open 2026",
      category: "U-13 Boys Singles",
      birthFront:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
      birthBack:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    },
    {
      id: "#NYX-8844",
      name: "Kyaw Swar",
      team: "Bago Smashers",
      proofImg:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      proofName: "Receipt_8844.png",
      phone: "+95 9 250 987 654",
      email: "kyawswar@example.com",
      address: "Bahan Road, Yangon",
      date: "Oct 19, 2026 • 01:20 PM",
      tournament: "Yangon Championship 2026",
      category: "Open Men Singles",
      birthFront:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
      birthBack:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    },
    {
      id: "#NYX-8845",
      name: "Htet Aung",
      team: "Mawlamyine Club",
      proofImg:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      proofName: "Receipt_8845.png",
      phone: "+95 9 421 112 233",
      email: "htetaung@example.com",
      address: "Main Road, Mawlamyine",
      date: "Oct 18, 2026 • 11:45 AM",
      tournament: "Mandalay Open 2026",
      category: "U-13 Boys Singles",
      birthFront:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
      birthBack:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    },
    {
      id: "#NYX-8846",
      name: "Zin Min",
      team: "Taunggyi Shuttlers",
      proofImg:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      proofName: "Receipt_8846.png",
      phone: "+95 9 970 333 444",
      email: "zinmin@example.com",
      address: "Circular Road, Taunggyi",
      date: "Oct 18, 2026 • 09:10 AM",
      tournament: "Inle Cup 2026",
      category: "Mixed Doubles",
      birthFront:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
      birthBack:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    },
  ];

  const filteredPlayers = allPlayersData.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTournament =
      selectedTournament === "All Tournaments" ||
      player.tournament === selectedTournament;
    const matchesCategory =
      selectedCategory === "All Categories" ||
      player.category === selectedCategory;
    return matchesSearch && matchesTournament && matchesCategory;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage) || 1;
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Player ID,Player Name,Team,Tournament,Category,Date"].join(",") +
      "\n" +
      filteredPlayers
        .map(
          (e) =>
            `${e.id},"${e.name}","${e.team}","${e.tournament}","${e.category}","${e.date}"`,
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `athletes_export_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 75px)",
        boxSizing: "border-box",
      }}
    >
      {/* Print-specific style to hide dashboard and show only modal when printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-modal, #printable-modal * {
            visibility: visible;
          }
          #printable-modal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            background: #fff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* 4 Cards Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
            >
              TOTAL REGISTERED ATHLETES
            </span>
            <GroupIcon style={{ fontSize: "18px", color: "#334155" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}
            >
              {currentStats.athletes}
            </span>
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#16a34a" }}
            >
              {currentStats.athletesGrowth}
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
            >
              PENDING ENROLLMENTS
            </span>
            <ErrorOutlineIcon style={{ fontSize: "18px", color: "#dc2626" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}
            >
              {currentStats.pending}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                padding: "2px 8px",
                borderRadius: "9999px",
              }}
            >
              Action Required
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
            >
              ACTIVE TOURNAMENTS
            </span>
            <EmojiEventsIcon style={{ fontSize: "18px", color: "#2563eb" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}
            >
              {currentStats.tournaments}
            </span>
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#2563eb" }}
            >
              Live On-Going
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
            >
              TOTAL ENTRY REVENUE
            </span>
            <PaymentsIcon style={{ fontSize: "18px", color: "#16a34a" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}
            >
              {currentStats.revenue}
            </span>
            <span
              style={{ fontSize: "11px", fontWeight: "600", color: "#16a34a" }}
            >
              {currentStats.revenueGrowth}
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Graph Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 4px 0",
              }}
            >
              Tournament Enrollments & Revenue Analytics
            </h2>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "0" }}>
              Monthly registered players vs collected fee breakdown (MMK)
            </p>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              fontSize: "12px",
              fontWeight: "600",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="2026">2026 Season ▾</option>
            <option value="2025">2025 Season ▾</option>
            <option value="2024">2024 Season ▾</option>
          </select>
        </div>

        <div
          style={{
            height: "170px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #e2e8f0",
            gap: "8px",
          }}
        >
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, idx) => (
            <div
              key={month}
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "24px",
                  height: currentStats.chartHeights[idx],
                  backgroundColor: idx === 9 ? "#dc2626" : "#e2e8f0",
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <span
                style={{ fontSize: "10px", color: "#64748b", marginTop: "6px" }}
              >
                {month}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #f1f5f9",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <ErrorOutlineIcon style={{ color: "#dc2626", fontSize: "18px" }} />
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#64748b",
                }}
              >
                PEAK MONTH
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                {currentStats.peakMonth}
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #f1f5f9",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <PaymentsIcon style={{ color: "#2563eb", fontSize: "18px" }} />
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#64748b",
                }}
              >
                AVERAGE REGISTRATION FEE
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                {currentStats.avgFee}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Approved Players Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "24px",
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#0f172a",
            margin: "0 0 16px 0",
          }}
        >
          Recently Approved Players
        </h3>

        {/* Filters & Actions Bar (Longer Search bar & Aligned Row) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              flex: "1",
            }}
          >
            <input
              type="text"
              placeholder="Search player name, ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "9px 14px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "12px",
                width: "320px",
                outline: "none",
              }}
            />
            <select
              value={selectedTournament}
              onChange={(e) => {
                setSelectedTournament(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "9px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                fontSize: "12px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="All Tournaments">All Tournaments</option>
              <option value="Mandalay Open 2026">
                Tournament: Mandalay Open 2026
              </option>
              <option value="Yangon Championship 2026">
                Tournament: Yangon Championship 2026
              </option>
              <option value="Inle Cup 2026">Tournament: Inle Cup 2026</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "9px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                fontSize: "12px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="All Categories">All Categories</option>
              <option value="U-13 Boys Singles">
                Category: U-13 Boys Singles
              </option>
              <option value="Open Men Singles">
                Category: Open Men Singles
              </option>
              <option value="Mixed Doubles">Category: Mixed Doubles</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 16px",
              backgroundColor: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              flexShrink: "0",
            }}
          >
            <DownloadIcon style={{ fontSize: "15px" }} /> Export
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
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
                  borderBottom: "1px solid #e2e8f0",
                  color: "#64748b",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <th style={{ padding: "10px 12px", fontWeight: "700" }}>
                  PLAYER ID
                </th>
                <th style={{ padding: "10px 12px", fontWeight: "700" }}>
                  PLAYER NAME
                </th>
                <th style={{ padding: "10px 12px", fontWeight: "700" }}>
                  TEAM / CLUB
                </th>
                <th style={{ padding: "10px 12px", fontWeight: "700" }}>
                  PAYMENT PROOF
                </th>
                <th style={{ padding: "10px 12px", fontWeight: "700" }}>
                  VERIFIED DATE
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPlayers.length > 0 ? (
                paginatedPlayers.map((player, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      color: "#334155",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {player.id}
                    </td>
                    <td style={{ padding: "12px", fontWeight: "600" }}>
                      {player.name}
                    </td>
                    <td style={{ padding: "12px", color: "#64748b" }}>
                      {player.team}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div
                        onClick={() =>
                          setFullImageView({
                            title: player.proofName,
                            url: player.proofImg,
                          })
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor: "#f1f5f9",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "1px solid #cbd5e1",
                        }}
                      >
                        <img
                          src={player.proofImg}
                          alt="proof"
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#0f172a",
                          }}
                        >
                          {player.proofName}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", color: "#64748b" }}>
                      {player.date}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <button
                        onClick={() => setSelectedPlayer(player)}
                        style={{
                          background: "none",
                          border: "1px solid #cbd5e1",
                          padding: "5px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#334155",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ fontSize: "13px" }} />{" "}
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "24px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <div>
            Showing{" "}
            {filteredPlayers.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredPlayers.length)} of{" "}
            {filteredPlayers.length} entries
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "4px 8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              ⟨ Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: "4px 10px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: currentPage === i + 1 ? "#0f172a" : "#fff",
                  color: currentPage === i + 1 ? "#fff" : "#334155",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                padding: "4px 8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              Next ⟩
            </button>
          </div>
        </div>
      </div>

      {/* ===================== VIEW PROFILE MODAL ===================== */}
      {selectedPlayer && !fullImageView && (
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
            zIndex: 1000,
            padding: "10px",
          }}
        >
          {/* Print specific CSS rules to fit everything into 1 single page */}
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-modal, #printable-modal * {
                visibility: visible;
              }
              #printable-modal {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                max-height: none !important;
                overflow: visible !important;
                box-shadow: none !important;
                border: none !important;
                padding: 10px !important;
                background: #fff !important;
              }
              .no-print {
                display: none !important;
              }
              .print-footer-info {
                display: block !important;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #000;
                font-size: 12px;
                font-weight: bold;
              }
            }
          `}</style>

          <div
            id="printable-modal"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "720px",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  {selectedPlayer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#0f172a",
                      margin: "0",
                    }}
                  >
                    Player {selectedPlayer.name} Details
                  </h2>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>
                    ID: {selectedPlayer.id}
                  </span>
                </div>
              </div>
              <button
                className="no-print"
                onClick={() => setSelectedPlayer(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* 1. Personal & Contact Details */}
            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                1. Personal & Contact Details
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  backgroundColor: "#f8fafc",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #f1f5f9",
                  fontSize: "11px",
                }}
              >
                <div>
                  <strong>Phone Number:</strong>{" "}
                  <span style={{ color: "#64748b" }}>
                    {selectedPlayer.phone}
                  </span>
                </div>
                <div>
                  <strong>Email Address:</strong>{" "}
                  <span style={{ color: "#64748b" }}>
                    {selectedPlayer.email}
                  </span>
                </div>
                <div>
                  <strong>Team / Club Name:</strong>{" "}
                  <span style={{ color: "#64748b" }}>
                    {selectedPlayer.team}
                  </span>
                </div>
                <div>
                  <strong>Verification Date:</strong>{" "}
                  <span style={{ color: "#64748b" }}>
                    {selectedPlayer.date}
                  </span>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <strong>Residential Address:</strong>{" "}
                  <span style={{ color: "#64748b" }}>
                    {selectedPlayer.address}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Selected Tournament Categories */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h4
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    textTransform: "uppercase",
                    margin: "0",
                  }}
                >
                  2. Selected Tournament Categories
                </h4>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  3/3 Enrolled
                </span>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#0f172a",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  🏸 U-13 Boys Singles ✓
                </span>
                <span
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#0f172a",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  🏸 U-13 Boys Doubles
                </span>
                <span
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#0f172a",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  🏸 U-15 Boys Singles
                </span>
              </div>
            </div>

            {/* 3. Identity Verification Documents */}
            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                3. Identity Verification Documents (Age Check)
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#0f172a",
                      }}
                    >
                      Birth Certificate (Front)
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        color: "#16a34a",
                        backgroundColor: "#f0fdf4",
                        padding: "1px 4px",
                        borderRadius: "4px",
                      }}
                    >
                      Verified
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      setFullImageView({
                        title: "Birth Certificate - Front",
                        url: selectedPlayer.birthFront,
                      })
                    }
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      padding: "4px",
                      cursor: "pointer",
                      textAlign: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <img
                      src={selectedPlayer.birthFront}
                      alt="Front"
                      style={{
                        width: "100%",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "9px", color: "#64748b" }}>
                      1.8 MB • JPG
                    </span>
                    <button
                      className="no-print"
                      onClick={() =>
                        setFullImageView({
                          title: "Birth Certificate - Front",
                          url: selectedPlayer.birthFront,
                        })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontSize: "10px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      View Full ↗
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#0f172a",
                      }}
                    >
                      Birth Certificate (Back)
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        color: "#16a34a",
                        backgroundColor: "#f0fdf4",
                        padding: "1px 4px",
                        borderRadius: "4px",
                      }}
                    >
                      Verified
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      setFullImageView({
                        title: "Birth Certificate - Back",
                        url: selectedPlayer.birthBack,
                      })
                    }
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      padding: "4px",
                      cursor: "pointer",
                      textAlign: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <img
                      src={selectedPlayer.birthBack}
                      alt="Back"
                      style={{
                        width: "100%",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "9px", color: "#64748b" }}>
                      1.8 MB • JPG
                    </span>
                    <button
                      className="no-print"
                      onClick={() =>
                        setFullImageView({
                          title: "Birth Certificate - Back",
                          url: selectedPlayer.birthBack,
                        })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontSize: "10px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      View Full ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Payment Proof Verification (Styled just like Birth Certificate cards) */}
            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                4. Payment Proof Verification
              </h4>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: "11px",
                  }}
                >
                  <div>
                    <strong>Payment Method:</strong> KBZPay
                  </div>
                  <div>
                    <strong>Paid Amount:</strong> 25,000 MMK
                  </div>
                </div>

                {/* Image card preview similar to Birth Certificate */}
                <div
                  onClick={() =>
                    setFullImageView({
                      title: "Payment Proof Receipt",
                      url: selectedPlayer.proofImg,
                    })
                  }
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    padding: "4px",
                    cursor: "pointer",
                    textAlign: "center",
                    marginBottom: "6px",
                  }}
                >
                  <img
                    src={selectedPlayer.proofImg}
                    alt="Payment Receipt"
                    style={{
                      width: "100%",
                      height: "85px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    ✓ Confirmed & Verified ({selectedPlayer.proofName})
                  </span>
                  <button
                    className="no-print"
                    onClick={() =>
                      setFullImageView({
                        title: "Payment Proof Receipt",
                        url: selectedPlayer.proofImg,
                      })
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc2626",
                      fontSize: "10px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    View Full ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Print-only footer info showing Player Name & ID clearly */}
            <div className="print-footer-info" style={{ display: "none" }}>
              Verified Player Profile: {selectedPlayer.name} (
              {selectedPlayer.id}) — NYX Badminton Admin Management System
            </div>

            {/* Modal Footer Actions */}
            <div
              className="no-print"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "14px",
              }}
            >
              <button
                onClick={() => setSelectedPlayer(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#fff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                Close Modal
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <PrintIcon style={{ fontSize: "15px" }} /> Print Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== FULL IMAGE ZOOM MODAL ===================== */}
      {fullImageView && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "680px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "#0f172a",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "0.02em",
                }}
              >
                {fullImageView.title}
              </div>
              <button
                onClick={() => setFullImageView(null)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                padding: "24px",
                backgroundColor: "#f8fafc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "65vh",
                overflow: "hidden",
              }}
            >
              <img
                src={fullImageView.url}
                alt="Zoomed Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "60vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            <div
              style={{
                padding: "14px 20px",
                backgroundColor: "#ffffff",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setFullImageView(null)}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
