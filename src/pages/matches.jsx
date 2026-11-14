import { useEffect, useMemo, useState, useRef } from "react";
import {
  AccessTimeRounded,
  CalendarMonthRounded,
  CheckCircleRounded,
  EmojiEventsRounded,
  RefreshRounded,
  SportsTennisRounded,
  AccountTreeRounded,
  CloseRounded,
  FiberManualRecordRounded,
  ScheduleRounded,
  VerifiedRounded,
  SyncRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";

const tournamentDatabase = {
  "Mandalay Open Cup 2026": {
    desc: "The Mandalay Open Cup 2026 is an official Tier 1 major operating under direct knockout single elimination. All matches are conducted in best-of-3 sets using the 21-point rally scoring system.",
    live: [
      {
        id: "moc-live-1",
        court: "COURT 1",
        tournament: "Mandalay Open Cup",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Quarter-final",
        setLabel: "SET 3",
        players: [
          {
            name: "Min Thant",
            region: "YGN",
            seed: "#1",
            scores: [21, 18],
            current: 14,
          },
          {
            name: "Zarni Tun",
            region: "MDY",
            seed: "#4",
            scores: [18, 21],
            current: 12,
          },
        ],
      },
      {
        id: "moc-live-2",
        court: "COURT 2",
        tournament: "Mandalay Open Cup",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Semi-final",
        setLabel: "SET 2",
        players: [
          {
            name: "Phone Pyae",
            region: "YGN",
            seed: "#2",
            scores: [21],
            current: 19,
          },
          {
            name: "Thura Zaw",
            region: "MDY",
            seed: "#3",
            scores: [17],
            current: 16,
          },
        ],
      },
    ],
    schedule: [
      {
        id: "moc-up-1",
        time: "02:30 PM MMT",
        court: "Court 2",
        tournament: "Mandalay Open Cup",
        category: "MEN'S SINGLES (MS) · SEMI-FINAL",
        teamA: "Aung Myo",
        teamACode: "YGN",
        teamB: "Zaw Lin",
        teamBCode: "SHN",
        estimate: "Scheduled (Est. 45 min)",
      },
      {
        id: "moc-up-2",
        time: "04:00 PM MMT",
        court: "Court 1",
        tournament: "Mandalay Open Cup",
        category: "MEN'S SINGLES (MS) · FINAL",
        teamA: "Winner SF 1",
        teamACode: "TBD",
        teamB: "Winner SF 2",
        teamBCode: "TBD",
        estimate: "Scheduled",
      },
    ],
    finished: [
      {
        id: "moc-fin-1",
        tournament: "Mandalay Open Cup",
        court: "Court 3",
        time: "Finished (11:45 AM)",
        category: "Men's Singles",
        winner: "Aung Myo",
        winnerCode: "YGN",
        runnerUp: "Zaw Lin",
        runnerUpCode: "SHN",
        scores: [
          [21, 21],
          [16, 14],
        ],
        matchId: "#MOC-2408",
      },
      {
        id: "moc-fin-2",
        tournament: "Mandalay Open Cup",
        court: "Court 1",
        time: "Finished (10:00 AM)",
        category: "Men's Singles",
        winner: "Min Thant",
        winnerCode: "YGN",
        runnerUp: "Kyaw Swar",
        runnerUpCode: "MDY",
        scores: [
          [21, 19, 21],
          [18, 21, 14],
        ],
        matchId: "#MOC-2405",
      },
    ],
  },
  "Yangon Masters 2026": {
    desc: "The Yangon Masters 2026 brings together elite regional champions in a high-intensity indoor tournament format across singles and doubles divisions.",
    live: [
      {
        id: "ym-live-1",
        court: "COURT 1",
        tournament: "Yangon Masters",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Quarter-final",
        setLabel: "SET 2",
        players: [
          {
            name: "Hein Htet",
            region: "MDY",
            seed: "#1",
            scores: [21],
            current: 18,
          },
          {
            name: "Sai Lu",
            region: "YGN",
            seed: "#5",
            scores: [14],
            current: 15,
          },
        ],
      },
      {
        id: "ym-live-2",
        court: "COURT 2",
        tournament: "Yangon Masters",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Round of 16",
        setLabel: "SET 3",
        players: [
          {
            name: "Nay Lin",
            region: "NPT",
            seed: "#3",
            scores: [19, 21],
            current: 15,
          },
          {
            name: "Kyaw Zin",
            region: "YGN",
            seed: "Unseeded",
            scores: [21, 17],
            current: 13,
          },
        ],
      },
    ],
    schedule: [
      {
        id: "ym-up-1",
        time: "01:00 PM MMT",
        court: "Court 1",
        tournament: "Yangon Masters",
        category: "MEN'S SINGLES (MS) · QUARTER-FINAL",
        teamA: "Lin Htut",
        teamACode: "BGO",
        teamB: "Myo Min",
        teamBCode: "MDY",
        estimate: "Scheduled",
      },
      {
        id: "ym-up-2",
        time: "03:30 PM MMT",
        court: "Court 2",
        tournament: "Yangon Masters",
        category: "MEN'S SINGLES (MS) · SEMI-FINAL",
        teamA: "Hein Htet",
        teamACode: "MDY",
        teamB: "Nay Lin",
        teamBCode: "NPT",
        estimate: "Rescheduled",
      },
    ],
    finished: [
      {
        id: "ym-fin-1",
        tournament: "Yangon Masters",
        court: "Court 2",
        time: "Finished (10:15 AM)",
        category: "Men's Singles",
        winner: "Hein Htet",
        winnerCode: "MDY",
        runnerUp: "Sai Lu",
        runnerUpCode: "YGN",
        scores: [
          [21, 19, 21],
          [18, 21, 15],
        ],
        matchId: "#YGM-1092",
      },
      {
        id: "ym-fin-2",
        tournament: "Yangon Masters",
        court: "Court 1",
        time: "Finished (09:00 AM)",
        category: "Men's Singles",
        winner: "Lin Htut",
        winnerCode: "BGO",
        runnerUp: "Aung Kyaw",
        runnerUpCode: "YGN",
        scores: [
          [21, 21],
          [15, 12],
        ],
        matchId: "#YGM-1085",
      },
    ],
  },
  "Myanmar National Series 2026": {
    desc: "The premier nationwide ranking circuit determining national team qualifications and championship standings for professional athletes.",
    live: [
      {
        id: "mns-live-1",
        court: "COURT 3",
        tournament: "Myanmar National Series",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Finals",
        setLabel: "SET 1",
        players: [
          {
            name: "Phone Pyae",
            region: "YGN",
            seed: "#1",
            scores: [],
            current: 11,
          },
          {
            name: "Thura Zaw",
            region: "MDY",
            seed: "#2",
            scores: [],
            current: 9,
          },
        ],
      },
      {
        id: "mns-live-2",
        court: "COURT 1",
        tournament: "Myanmar National Series",
        category: "MS",
        categoryFull: "Men's Singles",
        round: "Semi-final",
        setLabel: "SET 2",
        players: [
          {
            name: "Min Thant",
            region: "YGN",
            seed: "#3",
            scores: [21],
            current: 14,
          },
          {
            name: "Zarni Tun",
            region: "MDY",
            seed: "#4",
            scores: [16],
            current: 12,
          },
        ],
      },
    ],
    schedule: [
      {
        id: "mns-up-1",
        time: "02:00 PM MMT",
        court: "Court 1",
        tournament: "Myanmar National Series",
        category: "MEN'S SINGLES (MS) · FINAL",
        teamA: "Phone Pyae",
        teamACode: "YGN",
        teamB: "Min Thant",
        teamBCode: "YGN",
        estimate: "Scheduled",
      },
      {
        id: "mns-up-2",
        time: "04:30 PM MMT",
        court: "Court 2",
        tournament: "Myanmar National Series",
        category: "MEN'S SINGLES (MS) · 3RD PLACE",
        teamA: "Thura Zaw",
        teamACode: "MDY",
        teamB: "Zarni Tun",
        teamBCode: "MDY",
        estimate: "Scheduled",
      },
    ],
    finished: [
      {
        id: "mns-fin-1",
        tournament: "Myanmar National Series",
        court: "Court 1",
        time: "Finished (09:30 AM)",
        category: "Men's Singles",
        winner: "Phone Pyae",
        winnerCode: "YGN",
        runnerUp: "Kyaw Swar",
        runnerUpCode: "MDY",
        scores: [
          [21, 21],
          [14, 18],
        ],
        matchId: "#MNS-001",
      },
      {
        id: "mns-fin-2",
        tournament: "Myanmar National Series",
        court: "Court 2",
        time: "Finished (08:30 AM)",
        category: "Men's Singles",
        winner: "Thura Zaw",
        winnerCode: "MDY",
        runnerUp: "Aung Myo",
        runnerUpCode: "YGN",
        scores: [
          [19, 21, 21],
          [21, 17, 16],
        ],
        matchId: "#MNS-002",
      },
    ],
  },
};

const categories = [
  { id: "MS", label: "MS", full: "Men's Singles" },
  { id: "WS", label: "WS", full: "Women's Singles" },
  { id: "MD", label: "MD", full: "Men's Doubles" },
  { id: "XD", label: "XD", full: "Mixed Doubles" },
];

function SkeletonCard({ type = "match" }) {
  return (
    <div className={`skeleton-card skeleton-${type}`} aria-hidden="true">
      <div className="skeleton-line skeleton-line-wide" />
      <div className="skeleton-body">
        <div className="skeleton-stack">
          <div className="skeleton-line skeleton-line-medium" />
          <div className="skeleton-line skeleton-line-short" />
        </div>
        <div className="skeleton-score" />
        <div className="skeleton-score skeleton-score-small" />
      </div>
    </div>
  );
}

function MatchCard({ match, onSync, synced }) {
  return (
    <section className="live-card">
      <div className="live-card-top">
        <div className="match-meta">
          <span className="court-badge">{match.court}</span>
          <span className="match-meta-text">
            {match.tournament} · {match.categoryFull || match.category} ·{" "}
            {match.round}
          </span>
        </div>
        <button
          className={`sync-button ${synced ? "sync-button-active" : ""}`}
          onClick={() => onSync(match.id)}
        >
          <SyncRounded className="button-icon" />
          {synced ? "Synced" : "Court Sync"}
        </button>
      </div>

      <div className="live-score-panel">
        <div className="players-column">
          {match.players.map((player) => (
            <div className="player-row" key={player.name}>
              <FiberManualRecordRounded className="player-dot" />
              <div className="player-name-wrap">
                <span className="player-name">{player.name}</span>
                <span className="player-sub">
                  {player.region} · {player.seed}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="racket-mark">
          <SportsTennisRounded />
        </div>

        <div className="past-sets">
          {[0, 1].map((setIndex) => (
            <div className="set-column" key={setIndex}>
              <span className="set-heading">S{setIndex + 1}</span>
              {match.players.map((player) => (
                <span className="past-score" key={player.name}>
                  {player.scores[setIndex] ?? "–"}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="current-set">
          <span className="current-set-label">{match.setLabel}</span>
          {match.players.map((player) => (
            <span className="current-score" key={player.name}>
              {String(player.current).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleCard({ match }) {
  return (
    <section className="schedule-card">
      <div className="schedule-main">
        <div className="schedule-topline">
          <span className="time-badge">{match.time}</span>
          <span className="schedule-location">
            {match.court} · {match.tournament}
          </span>
          <span
            className={`schedule-status ${
              match.estimate === "Rescheduled" ? "status-muted" : ""
            }`}
          >
            {match.estimate}
          </span>
        </div>
        <div className="schedule-category">{match.category}</div>
        <div className="team-name">
          {match.teamA} <span className="team-code">({match.teamACode})</span>
        </div>
        <div className="versus">VS</div>
        <div className="team-name">
          {match.teamB} <span className="team-code">({match.teamBCode})</span>
        </div>
      </div>
    </section>
  );
}

function FinishedCard({ match }) {
  return (
    <section className="finished-card">
      <div className="finished-card-top">
        <div className="finished-meta">
          {match.tournament} · {match.court} · {match.time}
        </div>
        <span className="match-id">Match ID: {match.matchId}</span>
      </div>
      <div className="finished-content">
        <div className="finished-players">
          <div className="finished-player winner-player">
            <CheckCircleRounded className="winner-icon" />
            <span className="finished-player-name">{match.winner}</span>
            <span className="team-code">({match.winnerCode})</span>
          </div>
          <div className="finished-player runner-player">
            <span className="winner-icon-placeholder" />
            <span className="finished-player-name">{match.runnerUp}</span>
            <span className="team-code">({match.runnerUpCode})</span>
          </div>
        </div>

        <div className="finished-scores">
          {match.scores[0].map((score, index) => (
            <div className="finished-set" key={index}>
              <span className="finished-score winner-score">{score}</span>
              <span className="finished-score">
                {match.scores[1][index] ?? "–"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BracketModal({ onClose, tournamentName }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="bracket-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bracket-title"
      >
        <div className="modal-header">
          <div>
            <span className="eyebrow">TOURNAMENT OVERVIEW</span>
            <h2 className="modal-title" id="bracket-title">
              {tournamentName}
            </h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close bracket"
          >
            <CloseRounded />
          </button>
        </div>

        <div className="bracket-grid">
          <div className="bracket-round">
            <span className="bracket-round-title">QUARTER-FINAL</span>
            <div className="bracket-team">
              Min Thant <b>2</b>
            </div>
            <div className="bracket-team">
              Zarni Tun <b>1</b>
            </div>
            <div className="bracket-team bracket-pending">
              Match 2 <b>—</b>
            </div>
          </div>
          <div className="bracket-round">
            <span className="bracket-round-title">SEMI-FINAL</span>
            <div className="bracket-team bracket-pending">
              Winner QF 1 <b>—</b>
            </div>
            <div className="bracket-team bracket-pending">
              Winner QF 2 <b>—</b>
            </div>
          </div>
          <div className="bracket-round">
            <span className="bracket-round-title">FINAL</span>
            <div className="bracket-champion">
              <EmojiEventsRounded />
              Champion
              <b>TBD</b>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function WebMatches() {
  const [activeDay, setActiveDay] = useState("TODAY");
  const [activeCategory, setActiveCategory] = useState("MS");
  const [selectedTournament, setSelectedTournament] = useState(
    "Mandalay Open Cup 2026",
  );
  const [loading, setLoading] = useState(true);
  const [syncedMatches, setSyncedMatches] = useState([]);
  const [showBracket, setShowBracket] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTourneyDropdown, setShowTourneyDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-12-06");
  const [notice, setNotice] = useState("");

  const datePickerRef = useRef(null);
  const tourneyDropdownRef = useRef(null);

  const tournaments = Object.keys(tournamentDatabase);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        tourneyDropdownRef.current &&
        !tourneyDropdownRef.current.contains(event.target)
      ) {
        setShowTourneyDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [selectedTournament, activeDay, activeCategory, selectedDate]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => {
      setNotice("");
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const dayLabel = useMemo(() => {
    if (activeDay === "YESTERDAY") return "DEC 05";
    if (activeDay === "TOMORROW") return "DEC 07";
    if (selectedDate === "2026-12-06") return "DEC 06";
    return new Date(`${selectedDate}T12:00:00`)
      .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      .toUpperCase();
  }, [activeDay, selectedDate]);

  const currentData =
    tournamentDatabase[selectedTournament] ||
    tournamentDatabase["Mandalay Open Cup 2026"];

  const filteredLive = useMemo(() => {
    return currentData.live.filter((m) => m.category === activeCategory);
  }, [currentData, activeCategory]);

  const filteredSchedule = useMemo(() => {
    return currentData.schedule.filter((m) =>
      m.category.includes(activeCategory),
    );
  }, [currentData, activeCategory]);

  const filteredFinished = useMemo(() => {
    return currentData.finished.filter((m) =>
      m.category.toLowerCase().includes(activeCategory.toLowerCase()),
    );
  }, [currentData, activeCategory]);

  const handleSync = (id) => {
    setSyncedMatches((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setNotice("Court sync status updated.");
  };

  const changeDay = (day) => {
    setLoading(true);
    setActiveDay(day);
    if (day === "YESTERDAY") setSelectedDate("2026-12-05");
    if (day === "TODAY") setSelectedDate("2026-12-06");
    if (day === "TOMORROW") setSelectedDate("2026-12-07");
    setNotice(`Switched view to ${day.toLowerCase()}`);
  };

  const refreshBoard = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setNotice("Match board refreshed successfully.");
    }, 700);
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap");

        .tournament-page {
          min-height: 100vh;
          padding: 36px 24px 64px;
          background: #f7f8fa;
          color: #172033;
          font-family: "DM Sans", "Manrope", sans-serif;
          font-size: 16px;
        }

        .tournament-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .day-switcher {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          border: 1px solid #eef0f3;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
        }

        .day-button {
          min-height: 40px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 10px;
          color: #727987;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .day-button:hover {
          color: #172033;
          background: #f3f4f6;
        }

        .day-button-active {
          color: #fff;
          background: #172033;
          box-shadow: 0 4px 12px rgba(23, 32, 51, 0.2);
        }

        .today-dot {
          font-size: 9px !important;
          color: #ae1236;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          flex-wrap: wrap;
        }

        .select-date-button {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 18px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          color: #354052;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
          transition: all 0.2s ease;
        }

        .select-date-button:hover,
        .control-active {
          border-color: #ae1236;
          color: #ae1236;
        }

        .date-picker-wrap, .tourney-dropdown-wrap {
          position: relative;
        }

        .date-popover {
          position: absolute;
          z-index: 100;
          top: calc(100% + 8px);
          right: 0;
          width: 260px;
          padding: 18px;
          border: 1px solid #eef0f3;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 15px 40px rgba(20, 30, 50, 0.15);
        }

        .date-label {
          display: block;
          margin-bottom: 8px;
          color: #596170;
          font-size: 12px;
          font-weight: 800;
        }

        .date-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #dfe3e9;
          border-radius: 8px;
          color: #172033;
          background: #fff;
          font: inherit;
          font-size: 14px;
        }

        .date-apply {
          width: 100%;
          margin-top: 12px;
          padding: 11px;
          border: 0;
          border-radius: 8px;
          color: #fff;
          background: #ae1236;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .tournament-select-custom {
          min-width: 270px;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 16px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
          color: #ae1236;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
        }

        .tournament-select-custom span {
          color: #172033;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tourney-menu {
          position: absolute;
          z-index: 100;
          top: calc(100% + 8px);
          right: 0;
          width: 300px;
          padding: 8px;
          border: 1px solid #eef0f3;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 15px 40px rgba(20, 30, 50, 0.15);
        }

        .tourney-option {
          width: 100%;
          padding: 12px 14px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #354052;
          text-align: left;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tourney-option:hover, .tourney-option-active {
          background: #fde9ee;
          color: #ae1236;
        }

        .category-tabs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .category-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex: 0 0 auto;
          min-height: 44px;
          padding: 0 18px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          color: #596170;
          background: #fff;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.03);
          cursor: pointer;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .category-tab:hover {
          border-color: #ae1236;
          color: #ae1236;
        }

        .category-tab-active {
          border-color: #ae1236;
          color: #fff;
          background: #ae1236;
          box-shadow: 0 4px 14px rgba(174, 18, 54, 0.25);
        }

        .tournament-info {
          display: flex;
          position: relative;
          margin-bottom: 30px;
          padding: 24px 28px;
          border: 1px solid #eef0f3;
          border-left: 6px solid #ae1236;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 16px rgba(20, 30, 50, 0.04);
        }

        .info-copy {
          flex: 1;
          min-width: 0;
        }

        .info-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .tournament-title {
          margin: 0;
          color: #172033;
          font-family: "Manrope", sans-serif;
          font-size: 26px;
          font-weight: 800;
        }

        .bracket-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 16px;
          border: 1px solid #dfe3e9;
          border-radius: 10px;
          color: #354052;
          background: #f8f9fb;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .bracket-button:hover {
          color: #ae1236;
          border-color: #ae1236;
          background: #fff;
        }

        .tournament-description {
          max-width: 1000px;
          margin: 14px 0 0;
          color: #596170;
          font-size: 15px;
          line-height: 1.8;
        }

        .section-block {
          margin-bottom: 30px;
        }

        .section-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .section-heading {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          color: #172033;
          font-size: 18px;
          font-weight: 800;
        }

        .live-pulse {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ae1236;
          box-shadow: 0 0 0 4px rgba(174, 18, 54, 0.15);
          animation: pulse-ring 1.8s infinite;
        }

        .live-status,
        .upcoming-status,
        .verified-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .live-status {
          color: #ae1236;
          background: #fde9ee;
        }

        .upcoming-status {
          color: #957027;
          background: #fff4d9;
          margin-left: auto;
        }

        .verified-status {
          color: #087b59;
          background: #e4f7ef;
        }

        .live-list,
        .schedule-list,
        .finished-list {
          display: grid;
          gap: 16px;
        }

        .live-card {
          position: relative;
          padding: 18px 20px;
          border: 1px solid #eef0f3;
          border-left: 5px solid #ae1236;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 14px rgba(20, 30, 50, 0.04);
        }

        .live-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .match-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .court-badge,
        .time-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 24px;
          padding: 0 10px;
          border-radius: 6px;
          color: #fff;
          background: #172033;
          font-size: 11px;
          font-weight: 800;
        }

        .match-meta-text {
          color: #596170;
          font-size: 13px;
          font-weight: 600;
        }

        .sync-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 0 14px;
          border: 1px solid #172033;
          border-radius: 8px;
          color: #fff;
          background: #172033;
          font: inherit;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .sync-button-active {
          background: #087b59;
          border-color: #087b59;
        }

        .live-score-panel {
          display: grid;
          grid-template-columns: minmax(180px, 1.4fr) 40px minmax(90px, 0.7fr) minmax(85px, 0.55fr);
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          background: #f8f9fb;
        }

        .players-column {
          display: grid;
          gap: 14px;
          min-width: 0;
        }

        .player-row {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .player-dot {
          color: #ae1236;
          font-size: 10px !important;
          flex-shrink: 0;
        }

        .player-name-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
          min-width: 0;
        }

        .player-name {
          color: #172033;
          font-size: 15px;
          font-weight: 800;
        }

        .player-sub {
          color: #727987;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .racket-mark {
          display: flex;
          justify-content: center;
          color: #727987;
        }

        .past-sets {
          display: flex;
          justify-content: space-around;
        }

        .set-column {
          display: grid;
          justify-items: center;
          gap: 6px;
        }

        .set-heading {
          color: #727987;
          font-size: 11px;
          font-weight: 800;
        }

        .past-score {
          color: #354052;
          font-size: 14px;
          font-weight: 700;
        }

        .current-set {
          display: grid;
          justify-items: center;
          gap: 4px;
          padding: 10px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(20, 30, 50, 0.05);
        }

        .current-set-label {
          color: #ae1236;
          font-size: 10px;
          font-weight: 900;
        }

        .current-score {
          color: #172033;
          font-size: 22px;
          font-weight: 800;
        }

        .schedule-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          border: 1px solid #eef0f3;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 14px rgba(20, 30, 50, 0.04);
        }

        .schedule-main {
          flex: 1;
          min-width: 0;
        }

        .schedule-topline {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .schedule-location {
          color: #596170;
          font-size: 12px;
          font-weight: 700;
        }

        .schedule-status {
          margin-left: auto;
          padding: 4px 10px;
          border-radius: 6px;
          color: #596170;
          background: #f3f4f6;
          font-size: 11px;
          font-weight: 800;
        }

        .status-muted {
          color: #727987;
        }

        .schedule-category {
          margin-bottom: 8px;
          color: #ae1236;
          font-size: 12px;
          font-weight: 800;
        }

        .team-name {
          color: #172033;
          font-size: 16px;
          font-weight: 800;
        }

        .team-code {
          color: #727987;
          font-size: 12px;
          font-weight: 700;
        }

        .versus {
          margin: 4px 0;
          color: #727987;
          font-size: 12px;
          font-weight: 800;
        }

        .finished-card {
          padding: 20px;
          border: 1px solid #eef0f3;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 14px rgba(20, 30, 50, 0.04);
        }

        .finished-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .finished-meta,
        .match-id {
          color: #727987;
          font-size: 12px;
          font-weight: 700;
        }

        .finished-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
        }

        .finished-players {
          display: grid;
          gap: 10px;
        }

        .finished-player {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .finished-player-name {
          font-size: 16px;
          font-weight: 800;
        }

        .winner-icon {
          color: #ae1236;
          font-size: 18px !important;
        }

        .winner-icon-placeholder {
          width: 18px;
        }

        .runner-player .finished-player-name {
          color: #727987;
          font-weight: 600;
        }

        .finished-scores {
          display: flex;
          gap: 16px;
        }

        .finished-set {
          display: grid;
          justify-items: center;
          gap: 4px;
        }

        .finished-score {
          color: #727987;
          font-size: 14px;
          font-weight: 600;
        }

        .winner-score {
          color: #172033;
          font-size: 18px;
          font-weight: 900;
        }

        .empty-state {
          padding: 30px;
          text-align: center;
          color: #727987;
          background: #fff;
          border-radius: 12px;
          border: 1px dashed #eef0f3;
          font-weight: 700;
        }

        .dashboard-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eef0f3;
          color: #727987;
          font-size: 12px;
          font-weight: 600;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-mark {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #354052;
          font-weight: 900;
        }

        .footer-refresh {
          background: transparent;
          border: 0;
          color: #727987;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .footer-refresh:hover {
          color: #ae1236;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(11, 18, 32, 0.6);
          backdrop-filter: blur(4px);
        }

        .bracket-modal {
          width: min(900px, 100%);
          padding: 24px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .eyebrow {
          color: #ae1236;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .modal-title {
          margin: 4px 0 0;
          color: #172033;
          font-size: 22px;
          font-weight: 800;
        }

        .icon-button {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 8px;
          background: #f1f3f6;
          color: #354052;
          cursor: pointer;
        }

        .bracket-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .bracket-round {
          display: grid;
          gap: 10px;
          padding: 14px;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          background: #f8f9fb;
        }

        .bracket-round-title {
          color: #727987;
          font-size: 10px;
          font-weight: 900;
        }

        .bracket-team,
        .bracket-champion {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid #eef0f3;
          border-radius: 8px;
          background: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .bracket-team b {
          color: #ae1236;
        }

        .bracket-pending {
          color: #727987;
          border-style: dashed;
        }

        .bracket-champion {
          color: #b8860b;
          background: #fffdf4;
          border-color: #faebd7;
        }

        .toast-message {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 10px;
          color: #087b59;
          background: #e4f7ef;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          font-size: 13px;
          font-weight: 700;
        }

        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 3px rgba(174, 18, 54, 0.1); }
          50% { box-shadow: 0 0 0 7px rgba(174, 18, 54, 0.2); }
        }

        @media (max-width: 900px) {
          .live-score-panel { grid-template-columns: 1fr; gap: 12px; }
          .bracket-grid { grid-template-columns: 1fr; }
          .schedule-card { flex-direction: column; align-items: flex-start; }
          .tournament-page { padding: 16px 10px; }
        }
      `}</style>

      <main className="tournament-page">
        <div className="tournament-container">
          <header className="topbar">
            <div className="day-switcher" aria-label="Choose day">
              {["YESTERDAY", "TODAY", "TOMORROW"].map((day) => (
                <button
                  className={`day-button ${activeDay === day ? "day-button-active" : ""}`}
                  key={day}
                  onClick={() => changeDay(day)}
                >
                  {day === "TODAY" && (
                    <FiberManualRecordRounded className="today-dot" />
                  )}
                  {day === "YESTERDAY"
                    ? "Yesterday"
                    : day === "TODAY"
                      ? "TODAY"
                      : "Tomorrow"}
                </button>
              ))}
            </div>

            <div className="topbar-actions">
              <div className="date-picker-wrap" ref={datePickerRef}>
                <button
                  className={`select-date-button ${showDatePicker ? "control-active" : ""}`}
                  onClick={() => {
                    setShowDatePicker((v) => !v);
                    setShowTourneyDropdown(false);
                  }}
                >
                  <CalendarMonthRounded className="button-icon" />
                  Select Date
                </button>

                {showDatePicker && (
                  <div className="date-popover">
                    <label className="date-label" htmlFor="match-date">
                      Choose match date
                    </label>
                    <input
                      id="match-date"
                      className="date-input"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setActiveDay("CUSTOM");
                      }}
                    />
                    <button
                      className="date-apply"
                      onClick={() => {
                        setShowDatePicker(false);
                        setNotice(`Showing schedule for ${selectedDate}.`);
                      }}
                    >
                      Apply date
                    </button>
                  </div>
                )}
              </div>

              <div className="tourney-dropdown-wrap" ref={tourneyDropdownRef}>
                <div
                  className={`tournament-select-custom ${showTourneyDropdown ? "control-active" : ""}`}
                  onClick={() => {
                    setShowTourneyDropdown((v) => !v);
                    setShowDatePicker(false);
                  }}
                >
                  <span>
                    <EmojiEventsRounded
                      style={{ fontSize: 18, color: "#ae1236" }}
                    />
                    {selectedTournament}
                  </span>
                  <KeyboardArrowDownRounded />
                </div>

                {showTourneyDropdown && (
                  <div className="tourney-menu">
                    {tournaments.map((tName) => (
                      <button
                        key={tName}
                        className={`tourney-option ${selectedTournament === tName ? "tourney-option-active" : ""}`}
                        onClick={() => {
                          setSelectedTournament(tName);
                          setShowTourneyDropdown(false);
                          setNotice(`Switched to ${tName}`);
                        }}
                      >
                        {tName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          <nav className="category-tabs" aria-label="Match category">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? "category-tab-active" : ""}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setNotice(`Filtered by ${category.full}`);
                }}
              >
                <span className="category-code">{category.label}</span>
                <span className="category-full">{category.full}</span>
              </button>
            ))}
          </nav>

          <section className="tournament-info">
            <div className="info-copy">
              <div className="info-heading-row">
                <h1 className="tournament-title">{selectedTournament}</h1>
                <button
                  className="bracket-button"
                  onClick={() => setShowBracket(true)}
                >
                  <AccountTreeRounded className="button-icon" />
                  View Tournament Bracket Tree
                </button>
              </div>
              <p className="tournament-description">{currentData.desc}</p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading-row">
              <h2 className="section-heading">
                <span className="live-pulse" />
                LIVE MATCHES NOW
              </h2>
              <span className="live-status">
                <span className="live-status-dot" />
                LIVE SCORE · COURT SET 3
              </span>
            </div>

            <div className="live-list">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : filteredLive.length > 0 ? (
                filteredLive.map((match) => (
                  <MatchCard
                    match={match}
                    onSync={handleSync}
                    synced={syncedMatches.includes(match.id)}
                    key={match.id}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No live matches found in this category.
                </div>
              )}
            </div>
          </section>

          <section className="section-block schedule-section">
            <div className="section-heading-row">
              <h2 className="section-heading">
                <ScheduleRounded className="heading-icon" />
                UPCOMING SCHEDULE ({dayLabel})
              </h2>
              <span className="upcoming-status">
                <AccessTimeRounded className="status-icon" />
                Scheduled (Up Next)
              </span>
            </div>

            <div className="schedule-list">
              {loading ? (
                <>
                  <SkeletonCard type="schedule" />
                  <SkeletonCard type="schedule" />
                </>
              ) : filteredSchedule.length > 0 ? (
                filteredSchedule.map((match) => (
                  <ScheduleCard match={match} key={match.id} />
                ))
              ) : (
                <div className="empty-state">
                  No upcoming matches scheduled in this category.
                </div>
              )}
            </div>
          </section>

          <section className="section-block finished-section">
            <div className="section-heading-row">
              <h2 className="section-heading">
                <CheckCircleRounded className="heading-icon finished-heading-icon" />
                FINISHED MATCHES TODAY ({dayLabel})
              </h2>
              <span className="verified-status">
                <VerifiedRounded className="status-icon" />
                Official Admin Verified Result
              </span>
            </div>

            <div className="finished-list">
              {loading ? (
                <>
                  <SkeletonCard type="finished" />
                  <SkeletonCard type="finished" />
                </>
              ) : filteredFinished.length > 0 ? (
                filteredFinished.map((match) => (
                  <FinishedCard match={match} key={match.id} />
                ))
              ) : (
                <div className="empty-state">
                  No finished match results available for this category today.
                </div>
              )}
            </div>
          </section>
        </div>

        {notice && (
          <div className="toast-message" role="status">
            <CheckCircleRounded />
            {notice}
          </div>
        )}

        {showBracket && (
          <BracketModal
            onClose={() => setShowBracket(false)}
            tournamentName={selectedTournament}
          />
        )}
      </main>
    </>
  );
}
