import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";

export default function MatchesManagementPage() {
  const [selectedTournament, setSelectedTournament] = useState(
    "Yangon Masters 2026",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    "U-13 Boys Singles (MS)",
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMatchId, setEditingMatchId] = useState(null);

  const [showUpdateScoreModal, setShowUpdateScoreModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [activeMatch, setActiveMatch] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [isRefreshingBracket, setIsRefreshingBracket] = useState(false);
  const [isRefreshingTable, setIsRefreshingTable] = useState(false);

  const approvedPlayersPool = [
    "Min Thant",
    "Kyaw Swar",
    "Zarni Tun",
    "Aung Myo",
    "Zaw Lin",
    "Su Su",
    "Thiri San",
    "Thet Htar",
    "May Oo",
    "Htet Aung",
    "Su Lwin",
  ];

  const [stage, setStage] = useState("");
  const [court, setCourt] = useState("");
  const [athlete1, setAthlete1] = useState("");
  const [athlete2, setAthlete2] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");

  const [matchSets, setMatchSets] = useState({
    "#ID-2401": [
      { setNum: 1, s1: "21", s2: "18" },
      { setNum: 2, s1: "18", s2: "21" },
      { setNum: 3, s1: "14", s2: "12" },
    ],
    "#ID-2403": [
      { setNum: 1, s1: "21", s2: "16" },
      { setNum: 2, s1: "21", s2: "14" },
    ],
    "#ID-2404": [
      { setNum: 1, s1: "21", s2: "12" },
      { setNum: 2, s1: "21", s2: "19" },
    ],
  });

  const [completedSetsInModal, setCompletedSetsInModal] = useState([]);
  const [activeSetInput, setActiveSetInput] = useState(null);

  // Exactly 7 Mock Matches distributed across stages
  const [matches, setMatches] = useState([
    {
      id: "#ID-2401",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Quarter-Finals\nCourt 01",
      courtName: "Court 01",
      roundName: "Quarter-Finals",
      athlete1: "Min Thant",
      athlete2: "Zarni Tun",
      time: "Today, 02:30 PM",
      status: "LIVE IN-PLAY",
    },
    {
      id: "#ID-2402",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Semi-Finals\nCourt 02",
      courtName: "Court 02",
      roundName: "Semi-Finals",
      athlete1: "Kyaw Swar",
      athlete2: "Htet Aung",
      time: "Dec 06, 03:30 PM",
      status: "SCHEDULED",
    },
    {
      id: "#ID-2403",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Round of 16\nCourt 03",
      courtName: "Court 03",
      roundName: "Round of 16",
      athlete1: "Aung Myo",
      athlete2: "Zaw Lin",
      time: "Completed (11:45 AM)",
      status: "COMPLETED",
    },
    {
      id: "#ID-2404",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Round of 16\nCourt 04",
      courtName: "Court 04",
      roundName: "Round of 16",
      athlete1: "Su Su",
      athlete2: "Thiri San",
      time: "Completed (10:15 AM)",
      status: "COMPLETED",
    },
    {
      id: "#ID-2405",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Quarter-Finals\nCourt 02",
      courtName: "Court 02",
      roundName: "Quarter-Finals",
      athlete1: "Thet Htar",
      athlete2: "May Oo",
      time: "Dec 07, 01:00 PM",
      status: "SCHEDULED",
    },
    {
      id: "#ID-2406",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Semi-Finals\nCourt 01",
      courtName: "Court 01",
      roundName: "Semi-Finals",
      athlete1: "Aung Myo",
      athlete2: "Su Su",
      time: "Dec 07, 04:00 PM",
      status: "SCHEDULED",
    },
    {
      id: "#ID-2407",
      tournament: "Yangon Masters 2026",
      category: "U-13 Boys Singles (MS)",
      stage: "Championship Final\nCourt 01",
      courtName: "Court 01",
      roundName: "Championship Final",
      athlete1: "Min Thant",
      athlete2: "Aung Myo",
      time: "Dec 08, 02:00 PM",
      status: "SCHEDULED",
    },
  ]);

  const filteredMatches = matches.filter(
    (m) =>
      m.tournament === selectedTournament && m.category === selectedCategory,
  );

  const totalPages = Math.ceil(filteredMatches.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMatches.slice(indexOfFirstRow, indexOfLastRow);

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setEditingMatchId(null);
    setStage("");
    setCourt("");
    setAthlete1("");
    setAthlete2("");
    setMatchDate("");
    setMatchTime("");
    setShowCreateModal(true);
  };

  const handleOpenEdit = (match) => {
    setIsEditMode(true);
    setEditingMatchId(match.id);
    setStage(match.roundName || "Quarter-Finals");
    setCourt(match.courtName || "Court 01");
    setAthlete1(match.athlete1);
    setAthlete2(match.athlete2);
    setMatchDate("2026-12-12");
    setMatchTime("14:30");
    setShowCreateModal(true);
  };

  const handleSaveMatchPairing = () => {
    if (!stage || !court || !athlete1 || !athlete2) {
      alert("Please complete all required fields!");
      return;
    }
    if (athlete1 === athlete2) {
      alert("Athlete 1 and Athlete 2 cannot be the same person!");
      return;
    }

    if (isEditMode && editingMatchId) {
      setMatches(
        matches.map((m) =>
          m.id === editingMatchId
            ? {
                ...m,
                stage: `${stage}\n${court}`,
                courtName: court,
                roundName: stage,
                athlete1,
                athlete2,
              }
            : m,
        ),
      );
    } else {
      const newMatch = {
        id: `#ID-${Math.floor(1000 + Math.random() * 9000)}`,
        tournament: selectedTournament,
        category: selectedCategory,
        stage: `${stage}\n${court}`,
        courtName: court,
        roundName: stage,
        athlete1,
        athlete2,
        time:
          matchDate && matchTime
            ? `${matchDate}, ${matchTime}`
            : "Today, Scheduled",
        status: "SCHEDULED",
      };
      setMatches([newMatch, ...matches]);
    }
    setShowCreateModal(false);
  };

  const handleStartLive = (matchId) => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, status: "LIVE IN-PLAY" } : m,
      ),
    );
    setMatchSets({ ...matchSets, [matchId]: [] });
  };

  const handleFinalizeWinner = (matchId) => {
    setMatches(
      matches.map((m) =>
        m.id === matchId ? { ...m, status: "COMPLETED" } : m,
      ),
    );
  };

  const handleOpenUpdateScore = (match) => {
    setActiveMatch(match);
    const existing = matchSets[match.id] || [];
    setCompletedSetsInModal(existing);
    setActiveSetInput(null);
    setShowUpdateScoreModal(true);
  };

  const handleRefreshBracket = () => {
    setIsRefreshingBracket(true);
    setTimeout(() => setIsRefreshingBracket(false), 600);
  };

  const handleRefreshTable = () => {
    setIsRefreshingTable(true);
    setTimeout(() => setIsRefreshingTable(false), 600);
  };

  const determineWinner = (matchId, athlete1Name, athlete2Name) => {
    const sets = matchSets[matchId] || [];
    let p1Wins = 0;
    let p2Wins = 0;
    sets.forEach((s) => {
      const score1 = parseInt(s.s1) || 0;
      const score2 = parseInt(s.s2) || 0;
      if (score1 > score2) p1Wins++;
      else if (score2 > score1) p2Wins++;
    });
    if (p1Wins > p2Wins) return { winner: athlete1Name, loser: athlete2Name };
    if (p2Wins > p1Wins) return { winner: athlete2Name, loser: athlete1Name };
    return { winner: athlete1Name, loser: athlete2Name };
  };

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
      {/* Header Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          backgroundColor: "#ffffff",
          padding: "16px 24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
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
            Tournament:
            <select
              value={selectedTournament}
              onChange={(e) => {
                setSelectedTournament(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                fontSize: "12px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="Yangon Masters 2026">Yangon Masters 2026</option>
              <option value="Mandalay Open Cup">Mandalay Open Cup</option>
              <option value="Mandalay Open Cup">Inya Lake Junior Smash</option>
            </select>
          </div>

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
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                fontSize: "12px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="U-13 Boys Singles (MS)">
                U-13 Boys Singles (MS)
              </option>
              <option value="Men's Singles">Men's Singles</option>
              <option value="Mixed Doubles">Mixed Doubles</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220,38,38,0.3)",
          }}
        >
          <AddIcon style={{ fontSize: "16px" }} /> Create New Match Pairing
        </button>
      </div>

      {/* SECTION A: Knockout Bracket Tree Progression (Mapped by Stage) */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "24px",
          marginBottom: "32px",
          opacity: isRefreshingBracket ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #f1f5f9",
            paddingBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "15px" }}>🔀</span>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0",
              }}
            >
              A. Knockout Bracket Tree Progression ({selectedTournament})
            </h2>
          </div>
          <button
            onClick={handleRefreshBracket}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            <RefreshIcon
              style={{
                fontSize: "14px",
                transform: isRefreshingBracket ? "rotate(180deg)" : "none",
                transition: "transform 0.5s",
              }}
            />{" "}
            Auto-Generate Brackets
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "10px",
          }}
        >
          {/* 1. Round of 16 */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Round of 16
            </div>
            {filteredMatches
              .filter((m) => m.roundName?.includes("Round of 16"))
              .map((m) => {
                const isLive = m.status === "LIVE IN-PLAY";
                const isCompleted = m.status === "COMPLETED";
                const sets = matchSets[m.id] || [];
                return (
                  <div
                    key={m.id}
                    style={{
                      backgroundColor: isLive
                        ? "#fdf2f2"
                        : isCompleted
                          ? "#f8fafc"
                          : "#f8fafc",
                      border: isLive
                        ? "1px solid #fecaca"
                        : "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: isLive ? "#dc2626" : "#64748b",
                        marginBottom: "6px",
                      }}
                    >
                      <span>
                        {m.courtName} {isLive && "• LIVE"}{" "}
                        {isCompleted && "• ✔ FINISHED"}
                      </span>{" "}
                      <span>{m.id}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        marginBottom: "4px",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#dc2626",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>{" "}
                        {m.athlete1}
                      </span>{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {sets.map((s) => s.s1).join("  ")}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#1e3a8a",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>{" "}
                        {m.athlete2}
                      </span>{" "}
                      <span>{sets.map((s) => s.s2).join("  ")}</span>
                    </div>
                    {!isLive && !isCompleted && (
                      <button
                        onClick={() => handleOpenEdit(m)}
                        style={{
                          width: "100%",
                          padding: "5px",
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        ✏️ Edit Pairing / Court
                      </button>
                    )}
                  </div>
                );
              })}
          </div>

          {/* 2. Quarter-Finals */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Quarter-Finals
            </div>
            {filteredMatches
              .filter((m) => m.roundName?.includes("Quarter-Final"))
              .map((m) => {
                const isLive = m.status === "LIVE IN-PLAY";
                const isCompleted = m.status === "COMPLETED";
                const sets = matchSets[m.id] || [];
                return (
                  <div
                    key={m.id}
                    style={{
                      backgroundColor: isLive
                        ? "#fdf2f2"
                        : isCompleted
                          ? "#f8fafc"
                          : "#f8fafc",
                      border: isLive
                        ? "1px solid #fecaca"
                        : "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: isLive ? "#dc2626" : "#64748b",
                        marginBottom: "6px",
                      }}
                    >
                      <span>
                        {m.courtName} {isLive && "• LIVE"}{" "}
                        {isCompleted && "• ✔ FINISHED"}
                      </span>{" "}
                      <span>{m.id}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        marginBottom: "4px",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#dc2626",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>{" "}
                        {m.athlete1}
                      </span>{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {sets.map((s) => s.s1).join("  ")}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#1e3a8a",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>{" "}
                        {m.athlete2}
                      </span>{" "}
                      <span>{sets.map((s) => s.s2).join("  ")}</span>
                    </div>
                    {!isLive && !isCompleted && (
                      <button
                        onClick={() => handleOpenEdit(m)}
                        style={{
                          width: "100%",
                          padding: "5px",
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        ✏️ Edit Pairing / Court
                      </button>
                    )}
                  </div>
                );
              })}
          </div>

          {/* 3. Semi-Finals */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Semi-Finals
            </div>
            {filteredMatches.filter((m) => m.roundName?.includes("Semi-Final"))
              .length > 0 ? (
              filteredMatches
                .filter((m) => m.roundName?.includes("Semi-Final"))
                .map((m) => {
                  const isLive = m.status === "LIVE IN-PLAY";
                  const isCompleted = m.status === "COMPLETED";
                  const sets = matchSets[m.id] || [];
                  return (
                    <div
                      key={m.id}
                      style={{
                        backgroundColor: isLive ? "#fdf2f2" : "#f8fafc",
                        border: isLive
                          ? "1px solid #fecaca"
                          : "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: isLive ? "#dc2626" : "#64748b",
                          marginBottom: "6px",
                        }}
                      >
                        <span>
                          {m.courtName} {isLive && "• LIVE"}{" "}
                          {isCompleted && "• ✔ FINISHED"}
                        </span>{" "}
                        <span>{m.id}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          marginBottom: "4px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#dc2626",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>{" "}
                          {m.athlete1}
                        </span>{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {sets.map((s) => s.s1).join("  ")}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "8px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#1e3a8a",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>{" "}
                          {m.athlete2}
                        </span>{" "}
                        <span>{sets.map((s) => s.s2).join("  ")}</span>
                      </div>
                      {!isLive && !isCompleted && (
                        <button
                          onClick={() => handleOpenEdit(m)}
                          style={{
                            width: "100%",
                            padding: "5px",
                            backgroundColor: "#f1f5f9",
                            color: "#334155",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          ✏️ Edit Pairing / Court
                        </button>
                      )}
                    </div>
                  );
                })
            ) : (
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Court 01 • Dec 07
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  SF-01 (Awaiting QF)
                </span>
              </div>
            )}
          </div>

          {/* 4. Championship Final */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Championship Final
            </div>
            {filteredMatches.filter((m) =>
              m.roundName?.includes("Championship Final"),
            ).length > 0 ? (
              filteredMatches
                .filter((m) => m.roundName?.includes("Championship Final"))
                .map((m) => {
                  const isLive = m.status === "LIVE IN-PLAY";
                  const isCompleted = m.status === "COMPLETED";
                  const sets = matchSets[m.id] || [];
                  return (
                    <div
                      key={m.id}
                      style={{
                        backgroundColor: isLive ? "#fdf2f2" : "#f8fafc",
                        border: isLive
                          ? "1px solid #fecaca"
                          : "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: isLive ? "#dc2626" : "#64748b",
                          marginBottom: "6px",
                        }}
                      >
                        <span>
                          {m.courtName} {isLive && "• LIVE"}{" "}
                          {isCompleted && "• ✔ FINISHED"}
                        </span>{" "}
                        <span>{m.id}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          marginBottom: "4px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#dc2626",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>{" "}
                          {m.athlete1}
                        </span>{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {sets.map((s) => s.s1).join("  ")}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "8px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#1e3a8a",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "4px",
                            }}
                          ></span>{" "}
                          {m.athlete2}
                        </span>{" "}
                        <span>{sets.map((s) => s.s2).join("  ")}</span>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div
                style={{
                  backgroundColor: "#fefce8",
                  border: "1px solid #fef08a",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#ca8a04",
                  }}
                >
                  Gold Medal Match
                </span>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    margin: "6px 0",
                  }}
                >
                  Final • Court 01
                </div>
                <div style={{ fontSize: "10px", color: "#64748b" }}>
                  Yangon National Arena
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION B: Active Match Schedule & Score Input Queue */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          opacity: isRefreshingTable ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 2px 0",
              }}
            >
              B. Active Match Schedule & Score Input Queue
            </h2>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "0" }}>
              Real-time court allocation and umpire scoreboard synchronization
              for {selectedTournament}.
            </p>
          </div>
          <button
            onClick={handleRefreshTable}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 12px",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            <RefreshIcon
              style={{
                fontSize: "14px",
                transform: isRefreshingTable ? "rotate(180deg)" : "none",
                transition: "transform 0.5s",
              }}
            />{" "}
            Refresh Feed
          </button>
        </div>

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
              <th style={{ padding: "14px 20px" }}>Match ID</th>
              <th style={{ padding: "14px 20px" }}>Stage & Court</th>
              <th style={{ padding: "14px 20px" }}>Athlete / Pairing</th>
              <th style={{ padding: "14px 20px" }}>Scheduled Time</th>
              <th style={{ padding: "14px 20px" }}>Live Status</th>
              <th style={{ padding: "14px 20px" }}>Set Scores Input</th>
              <th style={{ padding: "14px 20px", textAlign: "center" }}>
                Action Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((match) => {
                const sets = matchSets[match.id] || [];
                const scoresString =
                  sets.length > 0
                    ? sets.map((s) => `${s.s1 || 0} - ${s.s2 || 0}`).join("   ")
                    : "-- : --";
                return (
                  <tr
                    key={match.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      color: "#334155",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontWeight: "bold" }}>
                      {match.id}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        whiteSpace: "pre-line",
                        fontSize: "11px",
                        color: "#64748b",
                      }}
                    >
                      {match.stage}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: "600", color: "#0f172a" }}>
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#dc2626",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "6px",
                          }}
                        ></span>{" "}
                        {match.athlete1}
                      </div>
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "11px",
                          marginTop: "2px",
                        }}
                      >
                        <span
                          style={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: "#1e3a8a",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "6px",
                          }}
                        ></span>{" "}
                        {match.athlete2}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        whiteSpace: "pre-line",
                        fontSize: "11px",
                      }}
                    >
                      {match.time}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      {match.status === "LIVE IN-PLAY" && (
                        <span
                          style={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          ● LIVE IN-PLAY
                        </span>
                      )}
                      {match.status === "SCHEDULED" && (
                        <span
                          style={{
                            backgroundColor: "#fefce8",
                            color: "#ca8a04",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          🕒 SCHEDULED
                        </span>
                      )}
                      {match.status === "COMPLETED" && (
                        <span
                          style={{
                            backgroundColor: "#f0fdf4",
                            color: "#16a34a",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          ✔ COMPLETED
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontWeight: "bold",
                        fontFamily: "monospace",
                      }}
                    >
                      {scoresString}
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        {match.status === "SCHEDULED" && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(match)}
                              style={{
                                backgroundColor: "#f1f5f9",
                                color: "#334155",
                                border: "1px solid #cbd5e1",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Edit Pairing
                            </button>
                            <button
                              onClick={() => handleStartLive(match.id)}
                              style={{
                                backgroundColor: "#dc2626",
                                color: "#fff",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <PlayArrowIcon style={{ fontSize: "14px" }} />{" "}
                              Start Live
                            </button>
                          </>
                        )}
                        {match.status === "LIVE IN-PLAY" && (
                          <>
                            <button
                              onClick={() => handleOpenUpdateScore(match)}
                              style={{
                                backgroundColor: "#0f172a",
                                color: "#fff",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleFinalizeWinner(match.id)}
                              style={{
                                backgroundColor: "#16a34a",
                                color: "#fff",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <CheckCircleIcon style={{ fontSize: "14px" }} />{" "}
                              Finalize Winner
                            </button>
                          </>
                        )}
                        {match.status === "COMPLETED" && (
                          <button
                            onClick={() => {
                              setActiveMatch(match);
                              setShowResultModal(true);
                            }}
                            style={{
                              backgroundColor: "#f1f5f9",
                              color: "#0f172a",
                              border: "1px solid #cbd5e1",
                              padding: "6px 14px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <VisibilityOutlinedIcon
                              style={{ fontSize: "14px" }}
                            />{" "}
                            View Result
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No matches found for {selectedTournament} ({selectedCategory}
                  ).
                </td>
              </tr>
            )}
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
            Showing {filteredMatches.length > 0 ? indexOfFirstRow + 1 : 0} to{" "}
            {Math.min(indexOfLastRow, filteredMatches.length)} of{" "}
            {filteredMatches.length} entries
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

      {/* MODAL 1: CREATE OR EDIT MATCH PAIRING */}
      {showCreateModal && (
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
            zIndex: 1200,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "560px",
              padding: "32px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowCreateModal(false)}
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
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>

            <h2
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 4px 0",
              }}
            >
              {isEditMode
                ? "Edit Match Pairing & Bracket"
                : "Create Match Pairing & Assign Bracket"}
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "0 0 24px 0",
              }}
            >
              Manually configure athlete matchup and assign court.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "18px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  TOURNAMENT STAGE / ROUND *
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    outline: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">-- Select Stage --</option>
                  <option value="Quarter-Finals">Quarter-Finals (QF)</option>
                  <option value="Semi-Finals">Semi-Finals (SF)</option>
                  <option value="Round of 16">Round of 16 (R16)</option>
                  <option value="Championship Final">Championship Final</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  ASSIGNED COURT *
                </label>
                <select
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    outline: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">-- Select Court --</option>
                  <option value="Court 01">Court 01 (Live Arena A)</option>
                  <option value="Court 02">Court 02</option>
                  <option value="Court 03">Court 03</option>
                  <option value="Court 04">Court 04</option>
                  <option value="Court 05">Court 05</option>
                  <option value="Court 06">Court 06</option>
                </select>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#dc2626",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: "#dc2626",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "6px",
                  }}
                ></span>{" "}
                SELECT ATHLETE 1 (PLAYER A - RED CORNER) *
              </label>
              <select
                value={athlete1}
                onChange={(e) => setAthlete1(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  outline: "none",
                }}
              >
                <option value="">-- Choose Athlete 1 --</option>
                {approvedPlayersPool.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                textAlign: "center",
                margin: "-6px 0",
                zIndex: 2,
                position: "relative",
              }}
            >
              <span
                style={{
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                VS
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "18px",
              }}
            >
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: "#1e3a8a",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "6px",
                  }}
                ></span>{" "}
                SELECT ATHLETE 2 (PLAYER B - NAVY BLUE CORNER) *
              </label>
              <select
                value={athlete2}
                onChange={(e) => setAthlete2(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  outline: "none",
                }}
              >
                <option value="">-- Choose Athlete 2 --</option>
                {approvedPlayersPool
                  .filter((p) => p !== athlete1)
                  .map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  MATCH DATE *
                </label>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  MATCH TIME *
                </label>
                <input
                  type="time"
                  value={matchTime}
                  onChange={(e) => setMatchTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#f8fafc",
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
                onClick={handleSaveMatchPairing}
                style={{
                  padding: "12px 28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {isEditMode ? "💾 SAVE CHANGES" : "💾 SAVE & PUSH"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: UPDATE LIVE MATCH SCORE (Clear Player Names & Scores UI) */}
      {showUpdateScoreModal && activeMatch && (
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
            zIndex: 1200,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "580px",
              padding: "32px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setShowUpdateScoreModal(false)}
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
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>

            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 16px 0",
              }}
            >
              Update Live Match Score — {activeMatch.id}
            </h2>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#dc2626",
                  }}
                >
                  <span
                    style={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#dc2626",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "6px",
                    }}
                  ></span>{" "}
                  {activeMatch.athlete1}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  • Red Corner
                </div>
              </div>
              <span
                style={{
                  backgroundColor: "#e2e8f0",
                  padding: "4px 8px",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                vs
              </span>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#1e3a8a",
                  }}
                >
                  {activeMatch.athlete2}{" "}
                  <span
                    style={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#1e3a8a",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginLeft: "6px",
                    }}
                  ></span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  • Navy Blue Corner
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              SET BY SET SCORE ENTRY (DIRECT NUMBER INPUT)
            </div>

            {/* Display Completed Recorded Sets with Clear Player Names */}
            {completedSetsInModal.map((s, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    Set {s.setNum} Scores (Completed)
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    ✔ Recorded
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  <span>
                    {activeMatch.athlete1}:{" "}
                    <strong style={{ color: "#dc2626", fontSize: "14px" }}>
                      {s.s1 || 0}
                    </strong>
                  </span>
                  <span>:</span>
                  <span>
                    {activeMatch.athlete2}:{" "}
                    <strong style={{ color: "#1e3a8a", fontSize: "14px" }}>
                      {s.s2 || 0}
                    </strong>
                  </span>
                </div>
              </div>
            ))}

            {/* Active Current Set Input */}
            {activeSetInput && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#dc2626",
                    }}
                  >
                    ● Set {activeSetInput.setNum} (Active Set) *
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#dc2626",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {activeMatch.athlete1}
                    </label>
                    <input
                      type="number"
                      placeholder="Score"
                      value={activeSetInput.s1}
                      onChange={(e) =>
                        setActiveSetInput({
                          ...activeSetInput,
                          s1: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginTop: "16px",
                    }}
                  >
                    :
                  </span>
                  <div>
                    <label
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#1e3a8a",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {activeMatch.athlete2}
                    </label>
                    <input
                      type="number"
                      placeholder="Score"
                      value={activeSetInput.s2}
                      onChange={(e) =>
                        setActiveSetInput({
                          ...activeSetInput,
                          s2: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Scores Button */}
            {activeSetInput && (
              <button
                onClick={() => {
                  if (!activeSetInput.s1 && !activeSetInput.s2) {
                    alert("Please enter scores for the active set!");
                    return;
                  }
                  const updatedCompleted = [
                    ...completedSetsInModal,
                    activeSetInput,
                  ];
                  setCompletedSetsInModal(updatedCompleted);
                  setMatchSets({
                    ...matchSets,
                    [activeMatch.id]: updatedCompleted,
                  });
                  setActiveSetInput(null);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "semi-bold",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                💾 Save Scores
              </button>
            )}

            {/* Add Another Set Button with styled icon */}
            {!activeSetInput && (
              <button
                onClick={() => {
                  setActiveSetInput({
                    setNum: completedSetsInModal.length + 1,
                    s1: "",
                    s2: "",
                  });
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#f1f5f9",
                  border: "1px dashed #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#2563eb",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <AddCircleOutlineIcon style={{ fontSize: "18px" }} /> Add
                Another Set
              </button>
            )}

            {/* Final Close / Save & Finalize Scores */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "17px",
              }}
            >
              <button
                onClick={() => setShowUpdateScoreModal(false)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (
                    activeSetInput &&
                    (activeSetInput.s1 || activeSetInput.s2)
                  ) {
                    const updatedCompleted = [
                      ...completedSetsInModal,
                      activeSetInput,
                    ];
                    setMatchSets({
                      ...matchSets,
                      [activeMatch.id]: updatedCompleted,
                    });
                  }
                  setShowUpdateScoreModal(false);
                }}
                style={{
                  padding: "12px 28px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ✔ Save & Finalize Scores
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: OFFICIAL MATCH RESULT DOSSIER */}
      {showResultModal &&
        activeMatch &&
        (() => {
          const sets = matchSets[activeMatch.id] || [];
          const { winner } = determineWinner(
            activeMatch.id,
            activeMatch.athlete1,
            activeMatch.athlete2,
          );
          const isP1Winner = winner === activeMatch.athlete1;

          return (
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
                zIndex: 1200,
                padding: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  width: "100%",
                  maxWidth: "640px",
                  padding: "32px",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setShowResultModal(false)}
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
                  <CloseIcon style={{ fontSize: "20px" }} />
                </button>

                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    margin: "0 0 16px 0",
                  }}
                >
                  Official Match Result Dossier — {activeMatch.id}
                </h2>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    display: "flex",
                    gap: "10px",
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <span>{selectedTournament}</span> •
                  <span style={{ fontWeight: "bold", color: "#0f172a" }}>
                    {selectedCategory}
                  </span>{" "}
                  •
                  <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                    {activeMatch.courtName}
                  </span>
                </div>

                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "12px",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f8fafc",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        <th style={{ padding: "10px 14px" }}>
                          ATHLETE NAME / ASSOCIATION
                        </th>
                        {sets.map((s, idx) => (
                          <th
                            key={idx}
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                            }}
                          >
                            SET {s.setNum}
                          </th>
                        ))}
                        <th
                          style={{ padding: "10px 14px", textAlign: "center" }}
                        >
                          MATCH STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={{
                          borderBottom: "1px solid #f1f5f9",
                          backgroundColor: isP1Winner ? "#fff5f5" : "#fff",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: "bold",
                            color: "#0f172a",
                          }}
                        >
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#dc2626",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "6px",
                            }}
                          ></span>{" "}
                          {activeMatch.athlete1}{" "}
                          {isP1Winner && (
                            <span style={{ color: "#dc2626" }}>✔</span>
                          )}
                        </td>
                        {sets.map((s, idx) => (
                          <td
                            key={idx}
                            style={{
                              padding: "12px 14px",
                              fontWeight: isP1Winner ? "bold" : "normal",
                              textAlign: "center",
                            }}
                          >
                            {s.s1 || 0}
                          </td>
                        ))}
                        <td
                          style={{ padding: "12px 14px", textAlign: "center" }}
                        >
                          {isP1Winner ? (
                            <span
                              style={{
                                backgroundColor: "#fef2f2",
                                color: "#dc2626",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              🏆 WINNER
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#f1f5f9",
                                color: "#64748b",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              DEFEATED
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr
                        style={{
                          backgroundColor: !isP1Winner ? "#fff5f5" : "#fff",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: "bold",
                            color: "#334155",
                          }}
                        >
                          <span
                            style={{
                              height: "8px",
                              width: "8px",
                              backgroundColor: "#1e3a8a",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "6px",
                            }}
                          ></span>{" "}
                          {activeMatch.athlete2}{" "}
                          {!isP1Winner && (
                            <span style={{ color: "#dc2626" }}>✔</span>
                          )}
                        </td>
                        {sets.map((s, idx) => (
                          <td
                            key={idx}
                            style={{
                              padding: "12px 14px",
                              fontWeight: !isP1Winner ? "bold" : "normal",
                              textAlign: "center",
                            }}
                          >
                            {s.s2 || 0}
                          </td>
                        ))}
                        <td
                          style={{ padding: "12px 14px", textAlign: "center" }}
                        >
                          {!isP1Winner ? (
                            <span
                              style={{
                                backgroundColor: "#fef2f2",
                                color: "#dc2626",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              🏆 WINNER
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "#f1f5f9",
                                color: "#64748b",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              DEFEATED
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => setShowResultModal(false)}
                    style={{
                      padding: "12px 32px",
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
            </div>
          );
        })()}
    </div>
  );
}
