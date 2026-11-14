import { useEffect, useMemo, useState, useRef } from "react";
import {
  EmojiEventsRounded,
  SearchRounded,
  KeyboardArrowDownRounded,
  TrendingUpRounded,
  TrendingDownRounded,
  VerifiedRounded,
  FileDownloadRounded,
} from "@mui/icons-material";

const leaderboardDatabase = [
  {
    rank: 1,
    name: "Min Thant",
    org: "Yangon",
    category: "MS",
    tournament: "Mandalay Open Cup 2026",
    points: 4850,
    winRate: "94%",
    events: 6,
    record: "16W - 1L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 2,
    name: "Zarni Tun",
    org: "Mandalay",
    category: "MS",
    tournament: "Yangon Masters 2026",
    points: 4120,
    winRate: "80%",
    events: 5,
    record: "12W - 3L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 3,
    name: "Aung Kyaw",
    org: "Shan State",
    category: "MS",
    tournament: "Myanmar National Series 2026",
    points: 3900,
    winRate: "71%",
    events: 5,
    record: "10W - 4L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 4,
    name: "Kyaw Swar",
    org: "Mandalay Heroes · MS (Senior)",
    category: "MS",
    tournament: "Mandalay Open Cup 2026",
    points: 3750,
    winRate: "68%",
    events: 5,
    record: "14W - 7L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 5,
    name: "Htet Aung",
    org: "Shan State Badminton · MS (Senior)",
    category: "MS",
    tournament: "Yangon Masters 2026",
    points: 3420,
    winRate: "65%",
    events: 5,
    record: "12W - 4L",
    trend: "flat",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 6,
    name: "Zaw Lin",
    org: "Yangon Badminton Club · MS (Senior)",
    category: "MS",
    tournament: "Myanmar National Series 2026",
    points: 3100,
    winRate: "60%",
    events: 5,
    record: "11W - 5L",
    trend: "down",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 7,
    name: "Aung Myo",
    org: "Mandalay Sports Club · MS (Senior)",
    category: "MS",
    tournament: "Mandalay Open Cup 2026",
    points: 2850,
    winRate: "58%",
    events: 4,
    record: "9W - 4L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 8,
    name: "Thet Naing",
    org: "Bago Regional Squad · MS (Senior)",
    category: "MS",
    tournament: "Yangon Masters 2026",
    points: 2600,
    winRate: "55%",
    events: 4,
    record: "8W - 5L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 9,
    name: "Hein Min",
    org: "Bago Regional Squad · MS (Senior)",
    category: "MS",
    tournament: "Myanmar National Series 2026",
    points: 2500,
    winRate: "53%",
    events: 4,
    record: "8W - 5L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 10,
    name: "Kaung Myat",
    org: "Bago Regional Squad · MS (Senior)",
    category: "MS",
    tournament: "Mandalay Open Cup 2026",
    points: 2450,
    winRate: "50%",
    events: 4,
    record: "8W - 5L",
    trend: "down",
    avatar:
      "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 11,
    name: "Su Su",
    org: "Yangon · WS",
    category: "WS",
    tournament: "Yangon Masters 2026",
    points: 2350,
    winRate: "70%",
    events: 3,
    record: "7W - 3L",
    trend: "up",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    rank: 12,
    name: "May Shin",
    org: "Mandalay · WS",
    category: "WS",
    tournament: "Mandalay Open Cup 2026",
    points: 2200,
    winRate: "60%",
    events: 3,
    record: "6W - 4L",
    trend: "down",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
];

const categories = [
  { id: "ALL", label: "All Categories", code: "All Categories" },
  { id: "MS", label: "MS (Men's Singles)", code: "MS" },
  { id: "WS", label: "WS (Women's Singles)", code: "WS" },
  { id: "MD", label: "MD (Men's Doubles)", code: "MD" },
  { id: "XD", label: "XD (Mixed Doubles)", code: "XD" },
];

const tournamentsList = [
  "All Tournaments",
  "Mandalay Open Cup 2026",
  "Yangon Masters 2026",
  "Myanmar National Series 2026",
];

export default function WebLeaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedTournament, setSelectedTournament] =
    useState("All Tournaments");
  const [showTourneyDropdown, setShowTourneyDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTourneyDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPlayers = useMemo(() => {
    return leaderboardDatabase
      .filter((player) => {
        const matchSearch =
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.org.toLowerCase().includes(searchQuery.toLowerCase());

        const matchCat =
          activeCategory === "ALL" || player.category === activeCategory;

        const matchTourney =
          selectedTournament === "All Tournaments" ||
          player.tournament === selectedTournament;

        return matchSearch && matchCat && matchTourney;
      })
      .sort((a, b) => b.points - a.points);
  }, [searchQuery, activeCategory, selectedTournament]);

  const topThree = leaderboardDatabase.slice(0, 3);
  const remainingPlayers = filteredPlayers;

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap");

        .leaderboard-page {
          min-height: 100vh;
          padding: 32px 24px 64px;
          background: #f7f8fa;
          color: #172033;
          font-family: "DM Sans", "Manrope", sans-serif;
          font-size: 15px;
        }

        .leaderboard-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .leaderboard-top-controls {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          margin-bottom: 24px;
          align-items: center;
        }

        .search-box-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #727987;
          font-size: 20px !important;
        }

        .search-input {
          width: 100%;
          min-height: 48px;
          padding: 0 16px 0 48px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          color: #172033;
          font: inherit;
          font-size: 15px;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #ae1236;
        }

        .tourney-filter-wrap {
          position: relative;
        }

        .tourney-dropdown-btn {
          min-width: 250px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          color: #ae1236;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
        }

        .tourney-dropdown-btn span {
          color: #172033;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tourney-menu-list {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 280px;
          padding: 8px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 15px 40px rgba(20, 30, 50, 0.15);
          z-index: 50;
        }

        .tourney-option-item {
          width: 100%;
          padding: 12px 14px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          text-align: left;
          color: #354052;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .tourney-option-item:hover, .tourney-option-active {
          background: #fde9ee;
          color: #ae1236;
        }

        .category-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cat-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 18px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          color: #596170;
          font: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 3px 10px rgba(20, 30, 50, 0.03);
          transition: all 0.2s;
        }

        .cat-tab-btn:hover {
          border-color: #ae1236;
          color: #ae1236;
        }

        .cat-tab-active {
          border-color: #ae1236;
          background: #ae1236;
          color: #fff;
          box-shadow: 0 4px 14px rgba(174, 18, 54, 0.25);
        }

        .season-header-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .season-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 800;
          color: #172033;
        }

        .season-title-wrap svg {
          color: #ae1236;
          font-size: 22px !important;
        }

        .season-sub {
          font-size: 13px;
          color: #727987;
          font-weight: 600;
        }

        /* Podium Cards with Hierarchy Height & Comfortable Padding */
        .podium-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
          align-items: flex-end;
        }

        .podium-card {
          position: relative;
          padding: 24px 20px;
          border: 1px solid #eef0f3;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 6px 20px rgba(20, 30, 50, 0.04);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .podium-card-first {
          background: linear-gradient(180deg, #fffcf5 0%, #fff 100%);
          border-color: #faebd7;
          padding-bottom: 34px;
          box-shadow: 0 12px 30px rgba(218, 165, 32, 0.12);
          transform: translateY(-8px);
        }

        .rank-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .badge-first { background: #fff4d9; color: #957027; }
        .badge-second, .badge-third { background: #f1f3f6; color: #596170; }

        .avatar-img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 14px;
          border: 2px solid #eef0f3;
        }

        .avatar-img-first {
          width: 76px;
          height: 76px;
          border: 3px solid #b8860b;
        }

        .player-podium-name {
          font-size: 18px;
          font-weight: 800;
          color: #172033;
          margin-bottom: 4px;
        }

        .player-podium-org {
          font-size: 13px;
          color: #727987;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .podium-stats-box {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: #f8f9fb;
          font-size: 12px;
          color: #596170;
          font-weight: 700;
          margin-bottom: 14px;
          line-height: 1.5;
        }

        .podium-stats-box b {
          color: #172033;
        }

        .podium-pts {
          font-size: 24px;
          font-weight: 900;
          color: #ae1236;
        }

        .podium-pts-label {
          font-size: 11px;
          font-weight: 800;
          color: #727987;
          letter-spacing: 0.5px;
        }

        /* Rankings Table */
        .rankings-card-box {
          border: 1px solid #eef0f3;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 16px rgba(20, 30, 50, 0.04);
          overflow: hidden;
        }

        .rankings-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid #eef0f3;
          background: #f8f9fb;
        }

        .rankings-table-title {
          font-size: 20px;
          font-weight: 800;
          color: #172033;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .export-csv-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border: 1px solid #dfe3e9;
          border-radius: 8px;
          background: #fff;
          color: #354052;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .rank-row-item {
          display: grid;
          grid-template-columns: 70px 1.8fr 1.2fr 100px;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #f1f3f6;
          transition: background 0.2s;
        }

        .rank-row-item:last-child {
          border-bottom: 0;
        }

        .rank-row-item:hover {
          background: #fcfcfd;
        }

        .col-rank {
          font-weight: 800;
          color: #354052;
          display: flex;
          align-items: center;
        }

        .col-player {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .table-avatar-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #eef0f3;
        }

        .row-player-details {
          display: flex;
          flex-direction: column;
        }

        .row-player-name {
          font-size: 15px;
          font-weight: 800;
          color: #172033;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .row-player-org {
          font-size: 13px;
          color: #727987;
          font-weight: 600;
        }

        .col-record {
          font-size: 14px;
          color: #596170;
          font-weight: 700;
        }

        .col-pts {
          text-align: right;
          font-size: 16px;
          font-weight: 900;
          color: #172033;
        }

        .col-pts-sub {
          font-size: 10px;
          color: #727987;
          font-weight: 700;
        }

        .empty-ranking {
          padding: 40px;
          text-align: center;
          color: #727987;
          font-weight: 700;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .podium-grid { grid-template-columns: 1fr; align-items: stretch; }
          .podium-card-first { transform: none; }
          .leaderboard-top-controls { grid-template-columns: 1fr; }
          .rank-row-item { grid-template-columns: 50px 1.5fr 80px; }
          .col-record { display: none; }
          .leaderboard-page { padding: 16px 12px; }
        }
      `}</style>

      <main className="leaderboard-page">
        <div className="leaderboard-container">
          {/* Top Controls: Search Bar & Tournament Dropdown Filter */}
          <div className="leaderboard-top-controls">
            <div className="search-box-wrap">
              <SearchRounded className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search player name, club, or rank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="tourney-filter-wrap" ref={dropdownRef}>
              <button
                className="tourney-dropdown-btn"
                onClick={() => setShowTourneyDropdown((v) => !v)}
              >
                <span>
                  <EmojiEventsRounded
                    style={{ fontSize: 18, color: "#ae1236" }}
                  />
                  {selectedTournament}
                </span>
                <KeyboardArrowDownRounded />
              </button>

              {showTourneyDropdown && (
                <div className="tourney-menu-list">
                  {tournamentsList.map((tName) => (
                    <button
                      key={tName}
                      className={`tourney-option-item ${selectedTournament === tName ? "tourney-option-active" : ""}`}
                      onClick={() => {
                        setSelectedTournament(tName);
                        setShowTourneyDropdown(false);
                      }}
                    >
                      {tName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <nav
            className="category-tabs-row"
            aria-label="Leaderboard categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-btn ${activeCategory === cat.id ? "cat-tab-active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Season Header */}
          <div className="season-header-box">
            <div className="season-title-wrap">
              <EmojiEventsRounded />
              2026 Season Top Performers
            </div>
            <span className="season-sub">
              Live Official Standings · Updated Real-time
            </span>
          </div>

          {/* Podium Cards for Top 3 Players with Heights Hierarchy */}
          {topThree.length > 0 && (
            <div className="podium-grid">
              {/* #2 Rank */}
              {topThree[1] && (
                <div className="podium-card">
                  <span className="rank-badge-pill badge-second">
                    🥈 #2 SEED
                  </span>
                  <img
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                    className="avatar-img"
                  />
                  <div className="player-podium-name">{topThree[1].name}</div>
                  <div className="player-podium-org">{topThree[1].org}</div>
                  <div className="podium-stats-box">
                    Tournaments: <b>{topThree[1].events} Events</b>
                    <br />
                    <b>{topThree[1].record}</b>
                  </div>
                  <div className="podium-pts">
                    {topThree[1].points.toLocaleString()}
                  </div>
                  <div className="podium-pts-label">PTS</div>
                </div>
              )}

              {/* #1 Champion */}
              {topThree[0] && (
                <div className="podium-card podium-card-first">
                  <span className="rank-badge-pill badge-first">
                    👑 #1 CHAMPION
                  </span>
                  <img
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="avatar-img avatar-img-first"
                  />
                  <div
                    className="player-podium-name"
                    style={{ fontSize: "20px" }}
                  >
                    {topThree[0].name}
                  </div>
                  <div className="player-podium-org">{topThree[0].org}</div>
                  <div
                    className="podium-stats-box"
                    style={{ background: "#fff9e6" }}
                  >
                    Win Rate: <b>{topThree[0].winRate}</b>
                    <br />
                    {topThree[0].events} Events · <b>{topThree[0].record}</b>
                  </div>
                  <div className="podium-pts" style={{ fontSize: "28px" }}>
                    {topThree[0].points.toLocaleString()}
                  </div>
                  <div className="podium-pts-label">RANKING PTS</div>
                </div>
              )}

              {/* #3 Rank */}
              {topThree[2] && (
                <div className="podium-card">
                  <span className="rank-badge-pill badge-third">
                    🥉 #3 SEED
                  </span>
                  <img
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                    className="avatar-img"
                  />
                  <div className="player-podium-name">{topThree[2].name}</div>
                  <div className="player-podium-org">{topThree[2].org}</div>
                  <div className="podium-stats-box">
                    Tournaments: <b>{topThree[2].events} Events</b>
                    <br />
                    <b>{topThree[2].record}</b>
                  </div>
                  <div className="podium-pts">
                    {topThree[2].points.toLocaleString()}
                  </div>
                  <div className="podium-pts-label">PTS</div>
                </div>
              )}
            </div>
          )}

          {/* Rankings Table with Actual Ranks & Profile Avatars */}
          <div className="rankings-card-box">
            <div className="rankings-table-header">
              <div className="rankings-table-title">Global Season Rankings</div>
              <button
                className="export-csv-btn"
                onClick={() => alert("Exported rankings to CSV successfully!")}
              >
                <FileDownloadRounded style={{ fontSize: 16 }} />
                Export CSV
              </button>
            </div>

            <div>
              {remainingPlayers.length > 0 ? (
                remainingPlayers.map((player) => (
                  <div className="rank-row-item" key={player.rank}>
                    <div className="col-rank">
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "#f1f3f6",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "12px",
                          fontWeight: "800",
                        }}
                      >
                        {player.rank}
                      </span>
                    </div>

                    <div className="col-player">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="table-avatar-img"
                      />
                      <div className="row-player-details">
                        <div className="row-player-name">
                          {player.name}
                          <VerifiedRounded
                            style={{ fontSize: 15, color: "#2979ff" }}
                          />
                        </div>
                        <div className="row-player-org">{player.org}</div>
                      </div>
                    </div>

                    <div className="col-record">
                      {player.record} ({player.events} Tourn.)
                      <div
                        style={{
                          fontSize: "11px",
                          color: player.trend === "up" ? "#087b59" : "#ae1236",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          fontWeight: "800",
                        }}
                      >
                        {player.trend === "up" ? (
                          <TrendingUpRounded style={{ fontSize: 14 }} />
                        ) : (
                          <TrendingDownRounded style={{ fontSize: 14 }} />
                        )}
                        {player.trend === "up" ? "+1 Rank" : "-1 Rank"}
                      </div>
                    </div>

                    <div className="col-pts">
                      {player.points.toLocaleString()}
                      <div className="col-pts-sub">PTS</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-ranking">
                  No ranked players found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
