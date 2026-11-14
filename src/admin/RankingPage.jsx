import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const INITIAL_PLAYERS = [
  {
    id: "PLY-001",
    name: "Aung Aung",
    contact: "+95 9 12345678",
    tournament: "2026 National Badminton",
    previousPoints: 1200,
    currentPoints: 500,
    pointsToAward: 0,
  },
  {
    id: "PLY-002",
    name: "Kyaw Kyaw",
    contact: "+95 9 23456789",
    tournament: "2026 National Badminton",
    previousPoints: 800,
    currentPoints: 200,
    pointsToAward: 0,
  },
  {
    id: "PLY-003",
    name: "Min Min",
    contact: "+95 9 34567890",
    tournament: "2026 National Badminton",
    previousPoints: 620,
    currentPoints: 300,
    pointsToAward: 0,
  },
  {
    id: "PLY-004",
    name: "Zaw Zaw",
    contact: "+95 9 45678901",
    tournament: "2026 National Badminton",
    previousPoints: 590,
    currentPoints: 150,
    pointsToAward: 0,
  },
  {
    id: "PLY-005",
    name: "Nyi Nyi",
    contact: "+95 9 56789012",
    tournament: "2026 National Badminton",
    previousPoints: 510,
    currentPoints: 100,
    pointsToAward: 0,
  },
  {
    id: "PLY-006",
    name: "Tun Tun",
    contact: "+95 9 67890123",
    tournament: "2026 National Badminton",
    previousPoints: 480,
    currentPoints: 50,
    pointsToAward: 0,
  },
  {
    id: "PLY-007",
    name: "Kaung Kaung",
    contact: "+95 9 78901234",
    tournament: "2026 National Badminton",
    previousPoints: 450,
    currentPoints: 120,
    pointsToAward: 0,
  },
  {
    id: "PLY-008",
    name: "Htet Htet",
    contact: "+95 9 89012345",
    tournament: "2026 National Badminton",
    previousPoints: 420,
    currentPoints: 400,
    pointsToAward: 0,
  },
  {
    id: "PLY-009",
    name: "Kyaw Swar",
    contact: "+95 9 90123456",
    tournament: "2026 National Badminton",
    previousPoints: 390,
    currentPoints: 0,
    pointsToAward: 0,
  },
  {
    id: "PLY-010",
    name: "Mg Mg",
    contact: "+95 9 01234567",
    tournament: "2026 National Badminton",
    previousPoints: 350,
    currentPoints: 240,
    pointsToAward: 0,
  },

  {
    id: "PLY-011",
    name: "Thura",
    contact: "+95 9 11112222",
    tournament: "Smash Summer Open 2026",
    previousPoints: 650,
    currentPoints: 120,
    pointsToAward: 0,
  },
  {
    id: "PLY-012",
    name: "Mya Mya",
    contact: "+95 9 22223333",
    tournament: "Smash Summer Open 2026",
    previousPoints: 500,
    currentPoints: 90,
    pointsToAward: 0,
  },
  {
    id: "PLY-013",
    name: "Soe Soe",
    contact: "+95 9 33334444",
    tournament: "Smash Summer Open 2026",
    previousPoints: 450,
    currentPoints: 110,
    pointsToAward: 0,
  },
  {
    id: "PLY-014",
    name: "Bo Bo",
    contact: "+95 9 44445555",
    tournament: "Smash Summer Open 2026",
    previousPoints: 400,
    currentPoints: 70,
    pointsToAward: 0,
  },
  {
    id: "PLY-015",
    name: "Aung Ko",
    contact: "+95 9 55556666",
    tournament: "Smash Summer Open 2026",
    previousPoints: 380,
    currentPoints: 60,
    pointsToAward: 0,
  },
  {
    id: "PLY-016",
    name: "Lwin Lwin",
    contact: "+95 9 66667777",
    tournament: "Smash Summer Open 2026",
    previousPoints: 340,
    currentPoints: 50,
    pointsToAward: 0,
  },
  {
    id: "PLY-017",
    name: "Pyae Sone",
    contact: "+95 9 77778888",
    tournament: "Smash Summer Open 2026",
    previousPoints: 300,
    currentPoints: 40,
    pointsToAward: 0,
  },
  {
    id: "PLY-018",
    name: "Hla Hla",
    contact: "+95 9 88889999",
    tournament: "Smash Summer Open 2026",
    previousPoints: 260,
    currentPoints: 30,
    pointsToAward: 0,
  },
  {
    id: "PLY-019",
    name: "Khin Khin",
    contact: "+95 9 99990000",
    tournament: "Smash Summer Open 2026",
    previousPoints: 210,
    currentPoints: 20,
    pointsToAward: 0,
  },
  {
    id: "PLY-020",
    name: "Naing Naing",
    contact: "+95 9 10101010",
    tournament: "Smash Summer Open 2026",
    previousPoints: 180,
    currentPoints: 10,
    pointsToAward: 0,
  },

  {
    id: "PLY-021",
    name: "Zin Zin",
    contact: "+95 9 12121212",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 720,
    currentPoints: 150,
    pointsToAward: 0,
  },
  {
    id: "PLY-022",
    name: "Wai Yan",
    contact: "+95 9 23232323",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 580,
    currentPoints: 130,
    pointsToAward: 0,
  },
  {
    id: "PLY-023",
    name: "Myo Min",
    contact: "+95 9 34343434",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 490,
    currentPoints: 110,
    pointsToAward: 0,
  },
  {
    id: "PLY-024",
    name: "Phyu Phyu",
    contact: "+95 9 45454545",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 420,
    currentPoints: 90,
    pointsToAward: 0,
  },
  {
    id: "PLY-025",
    name: "Thu Ra",
    contact: "+95 9 56565656",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 390,
    currentPoints: 80,
    pointsToAward: 0,
  },
  {
    id: "PLY-026",
    name: "Kyi Kyi",
    contact: "+95 9 67676767",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 330,
    currentPoints: 70,
    pointsToAward: 0,
  },
  {
    id: "PLY-027",
    name: "Ye Yint",
    contact: "+95 9 78787878",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 290,
    currentPoints: 60,
    pointsToAward: 0,
  },
  {
    id: "PLY-028",
    name: "Sane Sane",
    contact: "+95 9 89898989",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 250,
    currentPoints: 50,
    pointsToAward: 0,
  },
  {
    id: "PLY-029",
    name: "Thae Thae",
    contact: "+95 9 90909090",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 200,
    currentPoints: 40,
    pointsToAward: 0,
  },
  {
    id: "PLY-030",
    name: "Hein Hein",
    contact: "+95 9 01010101",
    tournament: "Weekend Shuttle Masters",
    previousPoints: 150,
    currentPoints: 30,
    pointsToAward: 0,
  },
];

const TOURNAMENTS = [
  "2026 National Badminton",
  "Smash Summer Open 2026",
  "Weekend Shuttle Masters",
];

export default function RankingPage() {
  const outletContext = useOutletContext() || {};
  const { isDark: parentIsDark } = outletContext;
  const isDark = parentIsDark ?? false;

  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS[0]);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredPlayers = useMemo(() => {
    return players.filter(
      (p) =>
        p.tournament === selectedTournament &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.contact.includes(searchTerm)),
    );
  }, [players, selectedTournament, searchTerm]);

  const totalEntries = filteredPlayers.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE) || 1;

  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlayers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPlayers, currentPage]);

  const emptyRowsCount = Math.max(0, ITEMS_PER_PAGE - paginatedPlayers.length);

  const handleAwardChange = (id, val) => {
    const numericVal = parseInt(val, 10) || 0;
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pointsToAward: numericVal } : p)),
    );
  };

  const handleSaveSync = () => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.tournament === selectedTournament && p.pointsToAward > 0) {
          return {
            ...p,
            currentPoints: p.currentPoints + p.pointsToAward,
            pointsToAward: 0,
          };
        }
        return p;
      }),
    );
    setIsEditing(false);
  };

  const handleConfirmRestart = () => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        previousPoints: 0,
        currentPoints: 0,
        pointsToAward: 0,
      })),
    );
    setShowRestartModal(false);
  };

  const top10Leaderboard = useMemo(() => {
    return [...players]
      .map((p) => ({
        ...p,
        totalPoints: p.previousPoints + p.currentPoints + p.pointsToAward,
      }))
      .filter((p) => p.totalPoints > 0)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);
  }, [players]);

  const styles = {
    container: {
      padding: "28px",
      backgroundColor: isDark ? "#121315" : "#f8fafc",
      color: isDark ? "#e1e1e1" : "#333",
      minHeight: "calc(100vh - 75px)",
      fontFamily: "sans-serif",
      boxSizing: "border-box",
      position: "relative",
    },
    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      padding: "16px 24px",
      borderRadius: "10px",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      flexWrap: "wrap",
      gap: "16px",
    },
    topbarRight: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
    },
    header: {
      display: "flex",
      flexDirection: "column",
    },
    selectContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      fontWeight: "bold",
      color: isDark ? "#cbd5e1" : "#334155",
    },
    select: {
      padding: "9px 14px",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      fontSize: "13px",
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#0f172a",
      outline: "none",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 360px",
      gap: "20px",
    },
    card: {
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      borderRadius: "12px",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    searchSection: {
      width: "100%",
      maxWidth: "400px",
    },
    searchInput: {
      width: "100%",
      padding: "11px 16px 11px 40px",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      borderRadius: "8px",
      fontSize: "13px",
      outline: "none",
      backgroundColor: isDark ? "#24272b" : "#ffffff",
      color: isDark ? "#ffffff" : "#333",
      boxSizing: "border-box",
    },
    searchBoxWrapper: {
      position: "relative",
      width: "100%",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#94a3b8",
      fontSize: "18px",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "12px",
    },
    cardHeaderTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
      margin: 0,
    },
    actions: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    btn: {
      padding: "9px 16px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    btnEdit: {
      backgroundColor: isDark ? "#24272b" : "#f1f5f9",
      color: isDark ? "#ffffff" : "#334155",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
    },
    btnEditActive: {
      backgroundColor: "#0284c7",
      color: "#ffffff",
      borderColor: "#0284c7",
    },
    btnSync: {
      backgroundColor: "#10b981",
      color: "#ffffff",
    },
    btnSyncDisabled: {
      backgroundColor: isDark ? "#1a1c1e" : "#cbd5e1",
      color: "#888",
      cursor: "not-allowed",
      border: isDark ? "1px solid #2d3139" : "none",
    },
    btnRestart: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#64748b",
      padding: "16px 14px",
      borderBottom: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      textAlign: "left",
      textTransform: "uppercase",
    },
    td: {
      padding: "16px 14px",
      fontSize: "14px",
      borderBottom: `1px solid ${isDark ? "#24272b" : "#f8fafc"}`,
      verticalAlign: "middle",
      color: isDark ? "#cbd5e1" : "#334155",
    },
    idCell: {
      color: isDark ? "#94a3b8" : "#64748b",
      fontWeight: "bold",
    },
    nameCell: {
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
    },
    pointsCell: {
      fontWeight: "bold",
      color: isDark ? "#cbd5e1" : "#334155",
    },
    awardInput: {
      width: "90px",
      padding: "8px",
      textAlign: "center",
      border: `1px solid ${isDark ? "#3b82f6" : "#cbd5e1"}`,
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "bold",
      outline: "none",
      backgroundColor: isDark ? "#24272b" : "#ffffff",
      color: isDark ? "#ffffff" : "#000000",
    },
    awardInputDisabled: {
      backgroundColor: isDark ? "#1a1c1e" : "#f8fafc",
      borderColor: isDark ? "#2d3139" : "#e2e8f0",
      color: "#888",
    },
    totalCell: {
      textAlign: "right",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      flexWrap: "wrap",
      gap: "10px",
    },
    entriesInfo: {
      fontSize: "12px",
      color: "#64748b",
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    pageNav: {
      background: "none",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      color: isDark ? "#cbd5e1" : "#64748b",
      cursor: "pointer",
    },
    pageNum: {
      width: "32px",
      height: "32px",
      borderRadius: "6px",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      background: isDark ? "#1a1c1e" : "#ffffff",
      fontSize: "12px",
      color: isDark ? "#cbd5e1" : "#64748b",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    },
    pageNumActive: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
      borderColor: "#0f172a",
    },
    lbHeader: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      paddingBottom: "14px",
      borderBottom: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      marginBottom: "16px",
    },
    lbHeaderTitle: {
      fontSize: "14px",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
      margin: 0,
    },
    lbList: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    lbItem: {
      display: "flex",
      alignItems: "center",
      padding: "10px 14px",
      borderRadius: "10px",
      backgroundColor: isDark ? "#24272b" : "#f8fafc",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
    },
    lbItemRank1: {
      backgroundColor: isDark ? "#2e2a14" : "#fefce8",
      border: `1px solid ${isDark ? "#854d0e" : "#fef08a"}`,
    },
    rankBadge: {
      width: "32px",
      display: "flex",
      justifyContent: "center",
    },
    rankNum: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#64748b",
    },
    playerInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      marginLeft: "8px",
    },
    lbName: {
      fontSize: "13px",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
    },
    lbId: {
      fontSize: "11px",
      color: "#94a3b8",
    },
    lbPoints: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#d97706",
    },
    noDataText: {
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "13px",
      padding: "20px 0",
      fontStyle: "italic",
    },
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(2px)",
    },
    modalContent: {
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      padding: "24px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "400px",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    modalIconWrapper: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: isDark ? "rgba(239, 68, 68, 0.2)" : "#fee2e2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto 16px auto",
      color: "#ef4444",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
      margin: "0 0 8px 0",
    },
    modalText: {
      fontSize: "14px",
      color: "#64748b",
      margin: "0 0 24px 0",
      lineHeight: "1.5",
    },
    modalActions: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
    },
    modalBtnCancel: {
      flex: 1,
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      backgroundColor: isDark ? "#24272b" : "#f1f5f9",
      color: isDark ? "#e1e1e1" : "#334155",
      cursor: "pointer",
    },
    modalBtnConfirm: {
      flex: 1,
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      border: "none",
      backgroundColor: "#ef4444",
      color: "#ffffff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* TOPBAR */}
      <div style={styles.topbar}>
        <div style={styles.searchSection}>
          <div style={styles.searchBoxWrapper}>
            <SearchIcon style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.topbarRight}>
          <div style={styles.selectContainer}>
            Tournament:
            <select
              style={styles.select}
              value={selectedTournament}
              onChange={(e) => {
                setSelectedTournament(e.target.value);
                setCurrentPage(1);
              }}
            >
              {TOURNAMENTS.map((t) => (
                <option
                  key={t}
                  value={t}
                  style={{ backgroundColor: isDark ? "#1a1c1e" : "#fff" }}
                >
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            style={{
              ...styles.btn,
              ...styles.btnRestart,
            }}
            onClick={() => setShowRestartModal(true)}
            title="Reset all player points to 0"
          >
            <RestartAltIcon style={{ fontSize: "16px" }} />
            Restart
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={styles.grid}>
        {/* LEFT BOX */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardHeaderTitle}>
              Approved Player Points Allocation
            </h3>

            <div style={styles.actions}>
              <button
                style={{
                  ...styles.btn,
                  ...styles.btnEdit,
                  ...(isEditing ? styles.btnEditActive : {}),
                }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <EditOutlinedIcon style={{ fontSize: "16px" }} />
                Edit Points
              </button>

              <button
                style={{
                  ...styles.btn,
                  ...styles.btnSync,
                  ...(!isEditing ? styles.btnSyncDisabled : {}),
                }}
                disabled={!isEditing}
                onClick={handleSaveSync}
              >
                <SyncOutlinedIcon style={{ fontSize: "16px" }} />
                Save & Sync
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Player Name</th>
                  <th style={styles.th}>Current Points</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>
                    Points To Award
                  </th>
                  <th style={{ ...styles.th, textAlign: "right" }}>
                    New Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlayers.map((row) => {
                  const newTotal =
                    row.previousPoints +
                    row.currentPoints +
                    (row.pointsToAward || 0);

                  return (
                    <tr key={row.id}>
                      <td style={{ ...styles.td, ...styles.idCell }}>
                        {row.id}
                      </td>
                      <td style={{ ...styles.td, ...styles.nameCell }}>
                        {row.name}
                      </td>
                      <td style={{ ...styles.td, ...styles.pointsCell }}>
                        {row.currentPoints.toLocaleString()}
                      </td>
                      <td style={{ ...styles.td, textAlign: "center" }}>
                        <input
                          type="number"
                          style={{
                            ...styles.awardInput,
                            ...(!isEditing ? styles.awardInputDisabled : {}),
                          }}
                          disabled={!isEditing}
                          value={
                            row.pointsToAward === 0 ? "" : row.pointsToAward
                          }
                          onChange={(e) =>
                            handleAwardChange(row.id, e.target.value)
                          }
                          placeholder="0"
                        />
                      </td>
                      <td style={{ ...styles.td, ...styles.totalCell }}>
                        {newTotal.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}

                {Array.from({ length: emptyRowsCount }).map((_, idx) => (
                  <tr key={`empty-${idx}`} style={{ height: "55px" }}>
                    <td colSpan={5} style={styles.td}>
                       
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER & PAGINATION */}
          <div style={styles.footer}>
            <span style={styles.entriesInfo}>
              Showing{" "}
              {totalEntries === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, totalEntries)} of{" "}
              {totalEntries} approved players
            </span>

            <div style={styles.pagination}>
              <button
                style={{
                  ...styles.pageNav,
                  opacity: currentPage === 1 ? 0.4 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    style={{
                      ...styles.pageNum,
                      ...(currentPage === page ? styles.pageNumActive : {}),
                    }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                style={{
                  ...styles.pageNav,
                  opacity:
                    currentPage === totalPages || totalPages === 0 ? 0.4 : 1,
                  cursor:
                    currentPage === totalPages || totalPages === 0
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT BOX: Leaderboard */}
        <div style={styles.card}>
          <div style={styles.lbHeader}>
            <EmojiEventsOutlinedIcon
              style={{ color: "#eab308", fontSize: "22px" }}
            />
            <h3 style={styles.lbHeaderTitle}>
              Overall Top 10 Players Leaderboard
            </h3>
          </div>

          <div style={styles.lbList}>
            {top10Leaderboard.length > 0 ? (
              top10Leaderboard.map((item, index) => {
                const rank = index + 1;
                const isTop3 = rank <= 3;
                return (
                  <div
                    key={item.id}
                    style={{
                      ...styles.lbItem,
                      ...(rank === 1 ? styles.lbItemRank1 : {}),
                    }}
                  >
                    <div style={styles.rankBadge}>
                      {isTop3 ? (
                        <span style={{ fontSize: "16px" }}>
                          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                        </span>
                      ) : (
                        <span style={styles.rankNum}>{rank}</span>
                      )}
                    </div>

                    <div style={styles.playerInfo}>
                      <span style={styles.lbName}>{item.name}</span>
                      <span style={styles.lbId}>{item.id}</span>
                    </div>

                    <div style={styles.lbPoints}>
                      {item.totalPoints.toLocaleString()} Pts
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={styles.noDataText}>No players on the leaderboard</div>
            )}
          </div>
        </div>
      </div>

      {/* RESTART MODAL */}
      {showRestartModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalIconWrapper}>
              <WarningAmberRoundedIcon style={{ fontSize: "24px" }} />
            </div>
            <h3 style={styles.modalTitle}>Reset All Points?</h3>
            <p style={styles.modalText}>
              Are you sure you want to reset all players' points to 0? This
              action cannot be undone.
            </p>
            <div style={styles.modalActions}>
              <button
                style={styles.modalBtnCancel}
                onClick={() => setShowRestartModal(false)}
              >
                Cancel
              </button>
              <button
                style={styles.modalBtnConfirm}
                onClick={handleConfirmRestart}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
