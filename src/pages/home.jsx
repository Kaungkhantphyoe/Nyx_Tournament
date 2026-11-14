import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowForward,
  Bolt,
  CalendarMonth,
  EmojiEvents,
  LocationOn,
  Visibility,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  SportsTennis,
  AccessTime,
  MilitaryTech,
} from "@mui/icons-material";

const tournaments = [
  {
    id: 1,
    title: "Yangon Masters 2026",
    category: "MAJOR TIER 1",
    date: "Dec 14 – 18, 2026",
    location: "National Indoor Stadium 1, Yangon",
    prize: "15,000 MMK",
    description:
      "Compete with the best badminton players and showcase your skills at the Yangon Masters championship.",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title: "Mandalay Open 2026",
    category: "OPEN TIER 2",
    date: "Nov 20 – 23, 2026",
    location: "Mandalay Indoor Stadium",
    prize: "10,000 MMK",
    description:
      "Join competitive matches, meet talented athletes, and compete for the Mandalay Open championship.",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title: "Champions Cup 2026",
    category: "CHAMPIONSHIP",
    date: "Oct 25 – 28, 2026",
    location: "Yangon Sports Arena",
    prize: "20,000 MMK",
    description:
      "Challenge top-ranked players and compete for the ultimate NYX badminton title.",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=85",
  },
];

const initialMatches = [
  {
    id: 1,
    court: "CRT 1",
    category: "MS • QF",
    status: "SET 3",
    player1: "Aung Aung",
    player2: "Kyaw Kyaw",
    score1: 14,
    score2: 11,
    previous: "21-18, 18-21",
    time: "LIVE NOW",
    live: true,
  },
  {
    id: 2,
    court: "CRT 3",
    category: "XD • R16",
    status: "SET 2",
    player1: "Thura / Lin Lin",
    player2: "Min Min / Su Su",
    score1: 15,
    score2: 9,
    previous: "21-16",
    time: "LIVE NOW",
    live: true,
  },
  {
    id: 3,
    court: "CRT 2",
    category: "WS • SF",
    status: "UPCOMING",
    player1: "May Myat",
    player2: "Thinzar Moe",
    score1: "Seed 1",
    score2: "Seed 4",
    previous: "",
    time: "Today 04:30 PM",
    live: false,
  },
  {
    id: 4,
    court: "CRT 4",
    category: "MD • QF",
    status: "UPCOMING",
    player1: "Zaw Zaw / Nyi Nyi",
    player2: "Hein Htet / Kaung",
    score1: "Seed 2",
    score2: "Q-Spot",
    previous: "",
    time: "Today 05:15 PM",
    live: false,
  },
];

const initialPlayers = [
  {
    id: 1,
    name: "Ko Phyoe",
    club: "Phoenix Shuttle Club",
    seed: 2,
    points: 2450,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    form: ["W", "W", "W", "W"],
  },
  {
    id: 2,
    name: "Kyaw Kyaw",
    club: "Yangon Badminton Academy",
    seed: 2,
    points: 1980,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    form: ["W", "W", "L", "W"],
  },
  {
    id: 3,
    name: "Ma Pwint",
    club: "Elite Smashers Club",
    seed: 3,
    points: 1620,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    form: ["L", "W", "W", "W"],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTournament, setActiveTournament] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto animation slider for featured tournament card (every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTournament((current) => (current + 1) % tournaments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tournament = tournaments[activeTournament];
  const liveCount = initialMatches.filter((match) => match.live).length;

  const changeTournament = (direction) => {
    setActiveTournament(
      (current) =>
        (current + direction + tournaments.length) % tournaments.length,
    );
  };

  if (loading) {
    return (
      <div className="nyx-page">
        <div className="nyx-container">
          <div className="nyx-skeleton-card">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="nyx-page">
      <style>{inlineStyles}</style>
      <div className="nyx-container">
        {/* Hero Section */}
        <section className="nyx-hero nyx-reveal">
          <div className="nyx-hero-content">
            <div className="nyx-eyebrow">
              <span className="nyx-live-dot" />
              REGISTRATION OPEN FOR SEASON 2026
            </div>

            <h1 className="nyx-hero-title">
              Elevate Your Badminton Game with{" "}
              <span style={{ fontSize: "60px" }}>nyx</span>
            </h1>

            <p className="nyx-hero-description">
              Enroll in premier tournaments, track live match brackets in
              real-time, and climb the verified player leaderboard.
            </p>

            <div className="nyx-hero-actions">
              <button
                className="nyx-button nyx-button-dark"
                onClick={() =>
                  document
                    .getElementById("nyx-tournament")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Tournaments <ArrowForward />
              </button>

              <button
                className="nyx-button nyx-button-light"
                onClick={() => navigate("/register")}
              >
                Register Player
              </button>
            </div>
          </div>

          <div className="nyx-hero-decoration">
            <div className="nyx-court-grid" />
            <div className="nyx-floating-ball">
              <SportsTennis />
            </div>
            <div className="nyx-decoration-ring" />
          </div>
        </section>

        {/* Featured Tournament Card */}
        <section className="nyx-feature-card nyx-reveal" id="nyx-tournament">
          <div className="nyx-feature-top">
            <span className="nyx-label">FEATURED EVENT</span>

            <span className="nyx-prize">
              <EmojiEvents /> {tournament.prize}
            </span>
          </div>

          <div className="nyx-feature-image-wrap">
            <img
              className="nyx-feature-image"
              src={tournament.image}
              alt={tournament.title}
            />

            <div className="nyx-image-overlay" />

            {/* Replaced category with tournament date as requested */}
            <span className="nyx-image-category">{tournament.date}</span>

            <button
              className="nyx-carousel-button nyx-carousel-left"
              onClick={() => changeTournament(-1)}
              aria-label="Previous tournament"
            >
              <KeyboardArrowLeft />
            </button>

            <button
              className="nyx-carousel-button nyx-carousel-right"
              onClick={() => changeTournament(1)}
              aria-label="Next tournament"
            >
              <KeyboardArrowRight />
            </button>
          </div>

          <div className="nyx-feature-info">
            <h2>{tournament.title}</h2>

            <p className="nyx-feature-description">{tournament.description}</p>

            <div className="nyx-feature-meta">
              <span>
                <LocationOn /> {tournament.location}
              </span>

              <span>
                <CalendarMonth /> {tournament.date}
              </span>
            </div>

            <div className="nyx-feature-actions">
              <button
                style={{ fontSize: "20px" }}
                className="nyx-button nyx-button-red"
                onClick={() => navigate("/enroll")}
              >
                <Bolt /> Enroll Now
              </button>
              <button
                className="nyx-button nyx-button-light"
                onClick={() => navigate("/tournaments")}
              >
                <Visibility /> View Details
              </button>
            </div>
          </div>
        </section>

        {/* Today's Matches Section */}
        <section className="nyx-section nyx-reveal" id="nyx-matches">
          <div className="nyx-section-heading">
            <div className="nyx-heading-left">
              <h2>
                <span className="nyx-heading-dot" />
                Today&apos;s Matches
              </h2>

              <span className="nyx-section-count">
                {liveCount} Events Active
              </span>
            </div>

            <button
              className="nyx-text-link"
              onClick={() => navigate("/matches")}
            >
              View All Matches
              <ArrowForward />
            </button>
          </div>

          <div className="nyx-match-grid">
            {initialMatches.map((match) => (
              <article
                className={`nyx-match-card ${match.live ? "nyx-match-live" : ""}`}
                key={match.id}
              >
                <div className="nyx-match-top">
                  <div className="nyx-match-type">
                    <span className="nyx-court-badge">{match.court}</span>
                    <span>{match.category}</span>
                  </div>

                  <span
                    className={`nyx-match-status ${
                      match.live ? "nyx-status-live" : ""
                    }`}
                  >
                    {match.live && <span className="nyx-live-dot" />}
                    {match.status}
                  </span>
                </div>

                <div className="nyx-match-player">
                  <span className="nyx-player-name">{match.player1}</span>
                  <strong className="nyx-player-score">{match.score1}</strong>
                </div>

                <div className="nyx-match-player">
                  <span className="nyx-player-name nyx-player-muted">
                    {match.player2}
                  </span>
                  <strong className="nyx-player-score">{match.score2}</strong>
                </div>

                <div className="nyx-match-footer">
                  <span>{match.live ? "Past Sets" : <AccessTime />}</span>
                  <strong>{match.previous || match.time}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Top Players Leaderboard Section */}
        <section className="nyx-section nyx-leaderboard-section nyx-reveal">
          <div className="nyx-section-heading">
            <div>
              <h2 className="nyx-leaderboard-title">
                <MilitaryTech /> Top Players Leaderboard
              </h2>

              <p className="nyx-section-subtitle">
                Official player rankings based on NYX points
              </p>
            </div>
            <button
              className="nyx-text-link"
              onClick={() => navigate("/leaderboard")}
            >
              Full Rankings
              <ArrowForward />
            </button>
          </div>

          <div className="nyx-player-list">
            {initialPlayers.map((player, index) => (
              <article
                className={`nyx-player-card ${index === 0 ? "nyx-player-card-first" : ""}`}
                key={player.id}
              >
                <div className="nyx-player-main">
                  <div
                    className={`nyx-rank ${index === 0 ? "nyx-rank-first" : ""}`}
                  >
                    {index + 1}
                  </div>

                  <img
                    className="nyx-player-avatar"
                    src={player.avatar}
                    alt={player.name}
                  />

                  <div className="nyx-player-info">
                    <div className="nyx-player-name-line">
                      <h3>{player.name}</h3>
                      <span className="nyx-seed-badge">Seed {player.seed}</span>
                    </div>

                    <p>{player.club}</p>
                  </div>
                </div>

                <div className="nyx-player-stats">
                  <span className="nyx-points-label">NYX Points</span>

                  <strong>
                    {player.points.toLocaleString()} <span>PTS</span>
                  </strong>

                  <div className="nyx-form-label">Form</div>

                  <div className="nyx-form-list">
                    {player.form.map((result, formIndex) => (
                      <span
                        className={`nyx-form-badge ${
                          result === "W" ? "nyx-form-win" : "nyx-form-loss"
                        }`}
                        key={`${player.id}-${formIndex}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const inlineStyles = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap");

.nyx-page {
  --nyx-primary: #e63950;
  --nyx-primary-dark: #c9233b;
  --nyx-primary-light: #fff0f2;
  --nyx-navy: #14202e;
  --nyx-text: #19212d;
  --nyx-muted: #89919e;
  --nyx-border: #edf0f4;
  --nyx-surface: #ffffff;
  --nyx-background: #f5f7fa;
  --nyx-success: #16a875;
  --nyx-shadow: 0 12px 36px rgba(25, 33, 45, 0.055);
  min-height: 100vh;
  padding: 24px 20px 44px;
  overflow-x: hidden;
  background: var(--nyx-background);
  color: var(--nyx-text);
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.nyx-page *, .nyx-page *::before, .nyx-page *::after {
  box-sizing: border-box;
}

.nyx-page .nyx-container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}

.nyx-page .nyx-hero {
  position: relative;
  display: flex;
  min-height: 370px;
  margin-bottom: 32px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-left: 5px solid #a83b4d;
  border-radius: 19px;
  background: #ffffff;
  box-shadow: var(--nyx-shadow);
  isolation: isolate;
}

.nyx-page .nyx-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 65%;
  padding: 40px 38px;
}

.nyx-page .nyx-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  margin-bottom: 20px;
  border: 1px solid #f8e1e5;
  border-radius: 30px;
  background: #fff0f2;
  color: #a72b40;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
}

.nyx-page .nyx-live-dot {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--nyx-primary);
}

.nyx-page .nyx-live-dot::after {
  position: absolute;
  inset: -4px;
  border: 1px solid rgba(230, 57, 80, 0.4);
  border-radius: 50%;
  content: "";
  animation: nyxPulse 1.7s ease-out infinite;
}

.nyx-page .nyx-hero-title {
  max-width: 660px;
  margin: 0;
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: clamp(32px, 4.2vw, 50px);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -1.7px;
}

.nyx-page .nyx-hero-title span {
  display: inline-block;
  color: var(--nyx-primary);
  animation: nyxBrandGlow 4s ease-in-out infinite;
}

.nyx-page .nyx-hero-description {
  max-width: 510px;
  margin: 18px 0 28px;
  color: #646d7b;
  font-size: 15px;
  line-height: 1.85;
}

.nyx-page .nyx-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.nyx-page .nyx-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 22px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 11px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.nyx-page .nyx-button:hover {
  transform: translateY(-3px);
}

.nyx-page .nyx-button svg {
  width: 18px;
  height: 18px;
}

.nyx-page .nyx-button-dark {
  border-color: var(--nyx-navy);
  background: var(--nyx-navy);
  color: #ffffff;
  box-shadow: 0 7px 18px rgba(20, 32, 46, 0.13);
}

.nyx-page .nyx-button-dark:hover {
  background: #27384d;
}

.nyx-page .nyx-button-light {
  border-color: #eceef2;
  background: #f5f6f8;
  color: #394252;
}

.nyx-page .nyx-button-light:hover {
  border-color: #f0cbd1;
  background: #fff0f2;
  color: var(--nyx-primary-dark);
}

.nyx-page .nyx-button-red {
  border-color: var(--nyx-primary);
  background: var(--nyx-primary);
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(230, 57, 80, 0.17);
}

.nyx-page .nyx-button-red:hover {
  background: var(--nyx-primary-dark);
}

.nyx-page .nyx-hero-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 34%;
  overflow: hidden;
  border-left: 1px solid rgba(225, 229, 235, 0.6);
  background: radial-gradient(circle at 65% 30%, rgba(230, 57, 80, 0.08), transparent 40%), linear-gradient(135deg, #fff 0%, #fbf8f9 100%);
}

.nyx-page .nyx-court-grid {
  position: absolute;
  inset: 18% -15% -15% 0;
  background-image: linear-gradient(to right, transparent calc(50% - 1px), #e9eaf0 calc(50% - 1px), #e9eaf0 calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to bottom, transparent calc(50% - 1px), #e9eaf0 calc(50% - 1px), #e9eaf0 calc(50% + 1px), transparent calc(50% + 1px));
  background-size: 100% 100%;
  opacity: 0.8;
}

.nyx-page .nyx-floating-ball {
  position: absolute;
  top: 25%;
  left: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  border: 1px solid rgba(230, 57, 80, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--nyx-primary);
  box-shadow: 0 15px 40px rgba(230, 57, 80, 0.1);
  animation: nyxFloat 5s ease-in-out infinite;
}

.nyx-page .nyx-floating-ball svg {
  width: 43px;
  height: 43px;
  transform: rotate(-35deg);
}

.nyx-page .nyx-decoration-ring {
  position: absolute;
  right: -45px;
  bottom: -65px;
  width: 210px;
  height: 210px;
  border: 1px solid rgba(230, 57, 80, 0.17);
  border-radius: 50%;
  animation: nyxRotate 25s linear infinite;
}

.nyx-page .nyx-feature-card {
  padding: 18px;
  margin-bottom: 48px;
  overflow: hidden;
  border: 1px solid #ffffff;
  border-left: 5px solid #a83b4d;
  border-radius: 19px;
  background: #ffffff;
  box-shadow: var(--nyx-shadow);
}

.nyx-page .nyx-feature-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.nyx-page .nyx-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 7px;
  background: #f1f3f6;
  color: #5d6572;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.9px;
}

.nyx-page .nyx-prize {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #e6ecf6;
  border-radius: 8px;
  background: #f1f6ff;
  color: #2b4b7c;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.nyx-page .nyx-prize svg {
  width: 16px;
  height: 16px;
}

.nyx-page .nyx-feature-image-wrap {
  position: relative;
  height: clamp(210px, 31vw, 360px);
  overflow: hidden;
  border-radius: 12px;
  background: #e8ebf0;
}

.nyx-page .nyx-feature-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 45%;
}

.nyx-page .nyx-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 17, 28, 0.3) 0%, transparent 40%, rgba(10, 17, 28, 0.12) 100%);
  pointer-events: none;
}

.nyx-page .nyx-image-category {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 13px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  background: rgba(168, 35, 54, 0.93);
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  backdrop-filter: blur(8px);
}

.nyx-page .nyx-carousel-button {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--nyx-navy);
  cursor: pointer;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.13);
  transform: translateY(-50%);
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.nyx-page .nyx-carousel-button:hover {
  background: var(--nyx-primary);
  color: #ffffff;
  transform: translateY(-50%) scale(1.08);
}

.nyx-page .nyx-carousel-button svg {
  width: 24px;
  height: 24px;
}

.nyx-page .nyx-carousel-left {
  left: 16px;
}

.nyx-page .nyx-carousel-right {
  right: 16px;
}

.nyx-page .nyx-feature-info {
  padding: 19px 18px 8px;
}

.nyx-page .nyx-feature-info h2 {
  margin: 0;
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.nyx-page .nyx-feature-description {
  max-width: 780px;
  margin: 10px 0 14px;
  color: #636d7d;
  font-size: 13.5px;
  line-height: 1.8;
}

.nyx-page .nyx-feature-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 10px;
}

.nyx-page .nyx-feature-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #727a87;
  font-size: 12px;
  font-weight: 600;
}

.nyx-page .nyx-feature-meta svg {
  width: 16px;
  height: 16px;
  color: #d56b79;
}

.nyx-page .nyx-feature-actions {
  display: flex;
  gap: 14px;
  margin-top: 21px;
}

.nyx-page .nyx-feature-actions .nyx-button-red {
  flex: 1;
}

.nyx-page .nyx-section {
  margin-bottom: 52px;
}

.nyx-page .nyx-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 21px;
}

.nyx-page .nyx-heading-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.nyx-page .nyx-section-heading h2,
.nyx-page .nyx-leaderboard-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.55px;
}

.nyx-page .nyx-heading-dot {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--nyx-primary);
  box-shadow: 0 0 0 5px rgba(230, 57, 80, 0.09);
}

.nyx-page .nyx-section-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 20px;
  background: #edf0f4;
  color: #586374;
  font-size: 11px;
  font-weight: 700;
}

.nyx-page .nyx-text-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 0 8px 8px;
  border: 0;
  background: transparent;
  color: #a73c4e;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  transition: color 0.25s ease, gap 0.25s ease;
}

.nyx-page .nyx-text-link:hover {
  gap: 10px;
  color: var(--nyx-primary);
}

.nyx-page .nyx-text-link svg {
  width: 17px;
  height: 17px;
}

.nyx-page .nyx-match-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.nyx-page .nyx-match-card {
  position: relative;
  min-width: 0;
  padding: 18px 18px 14px;
  overflow: hidden;
  border: 1px solid #ffffff;
  border-left: 4px solid transparent;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(25, 33, 45, 0.025);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.nyx-page .nyx-match-card:hover {
  border-color: #f3dfe3;
  border-left-color: var(--nyx-primary);
  box-shadow: 0 12px 27px rgba(25, 33, 45, 0.07);
  transform: translateY(-4px);
}

.nyx-page .nyx-match-card.nyx-match-live {
  border-left-color: #a83b4d;
}

.nyx-page .nyx-match-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
}

.nyx-page .nyx-match-type {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #767e8c;
  font-size: 11px;
  font-weight: 700;
}

.nyx-page .nyx-court-badge {
  padding: 6px 9px;
  border-radius: 6px;
  background: var(--nyx-navy);
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.nyx-page .nyx-match-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #f0f2f5;
  color: #6f7885;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.nyx-page .nyx-match-status.nyx-status-live {
  background: #fff0f2;
  color: var(--nyx-primary-dark);
}

.nyx-page .nyx-match-status .nyx-live-dot {
  width: 6px;
  height: 6px;
}

.nyx-page .nyx-match-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 34px;
}

.nyx-page .nyx-player-name {
  min-width: 0;
  overflow-wrap: anywhere;
  color: #262e3a;
  font-size: 13.5px;
  font-weight: 700;
}

.nyx-page .nyx-player-name.nyx-player-muted {
  color: #7b8390;
  font-weight: 500;
}

.nyx-page .nyx-player-score {
  flex-shrink: 0;
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  font-weight: 800;
}

.nyx-page .nyx-match-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 11px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.nyx-page .nyx-match-footer span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #6e7684;
  font-size: 11px;
}

.nyx-page .nyx-match-footer span svg {
  width: 14px;
  height: 14px;
}

.nyx-page .nyx-match-footer strong {
  color: #5a6372;
  font-size: 11px;
  font-weight: 700;
  text-align: right;
}

.nyx-page .nyx-leaderboard-title > svg {
  width: 27px;
  height: 27px;
  color: #c58a35;
}

.nyx-page .nyx-section-subtitle {
  margin: 7px 0 0;
  color: #7c8593;
  font-size: 12px;
}

.nyx-page .nyx-player-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nyx-page .nyx-player-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 112px;
  padding: 19px 22px;
  border: 1px solid #ffffff;
  border-left: 4px solid transparent;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 5px 22px rgba(25, 33, 45, 0.025);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.nyx-page .nyx-player-card.nyx-player-card-first {
  border-left-color: var(--nyx-primary);
}

.nyx-page .nyx-player-card:hover {
  border-left-color: var(--nyx-primary);
  box-shadow: 0 12px 28px rgba(25, 33, 45, 0.07);
  transform: translateX(3px);
}

.nyx-page .nyx-player-main {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.nyx-page .nyx-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border: 1px solid #eceef2;
  border-radius: 50%;
  background: #f2f4f7;
  color: #4e5765;
  font-family: "Outfit", sans-serif;
  font-size: 15px;
  font-weight: 800;
}

.nyx-page .nyx-rank.nyx-rank-first {
  border-color: #f3e1c4;
  background: #fff4df;
  color: #b9852c;
  box-shadow: 0 0 0 4px rgba(185, 133, 44, 0.06);
}

.nyx-page .nyx-player-avatar {
  display: block;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border: 3px solid #f2f3f6;
  border-radius: 50%;
  background: #e9edf2;
  object-fit: cover;
}

.nyx-page .nyx-player-info {
  min-width: 0;
}

.nyx-page .nyx-player-name-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.nyx-page .nyx-player-info h3 {
  margin: 0;
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: 16.5px;
  font-weight: 800;
}

.nyx-page .nyx-seed-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  background: #edf0f5;
  color: #3f4957;
  font-size: 10px;
  font-weight: 800;
}

.nyx-page .nyx-player-info p {
  margin: 5px 0 0;
  color: #7d8592;
  font-size: 12px;
  line-height: 1.6;
}

.nyx-page .nyx-player-stats {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.nyx-page .nyx-points-label {
  color: #9299a3;
  font-size: 10px;
  font-weight: 600;
}

.nyx-page .nyx-player-stats > strong {
  color: var(--nyx-text);
  font-family: "Outfit", sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.nyx-page .nyx-player-stats > strong span {
  font-size: 13px;
  letter-spacing: 0;
}

.nyx-page .nyx-form-label {
  margin-top: 4px;
  color: #9198a2;
  font-size: 10px;
  font-weight: 600;
}

.nyx-page .nyx-form-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;
}

.nyx-page .nyx-form-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
}

.nyx-page .nyx-form-badge.nyx-form-win {
  background: var(--nyx-navy);
  color: #ffffff;
}

.nyx-page .nyx-form-badge.nyx-form-loss {
  background: #e8ebf0;
  color: #6f7885;
}

@keyframes nyxFloat {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-16px) rotate(7deg); }
}

@keyframes nyxRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes nyxPulse {
  0% { opacity: 0.8; transform: scale(0.65); }
  100% { opacity: 0; transform: scale(1.8); }
}

@keyframes nyxBrandGlow {
  0%, 100% { text-shadow: 0 0 0 rgba(230, 57, 80, 0); }
  50% { text-shadow: 0 5px 25px rgba(230, 57, 80, 0.18); }
}

@media (max-width: 900px) {
  .nyx-page .nyx-hero {
    min-height: 335px;
  }
  .nyx-page .nyx-hero-content {
    width: 100%;
    padding: 30px 26px;
  }
  .nyx-page .nyx-hero-decoration {
    display: none;
  }
}

@media (max-width: 600px) {
  .nyx-page {
    padding: 14px 12px 28px;
  }
  .nyx-page .nyx-match-grid {
    grid-template-columns: 1fr;
  }
}
`;
