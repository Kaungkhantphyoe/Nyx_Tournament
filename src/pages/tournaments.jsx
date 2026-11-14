import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarMonthOutlined,
  EmojiEventsOutlined,
  LocationOnOutlined,
  ArrowForward,
  PersonAddAlt1Outlined,
  KeyboardArrowDown,
  VisibilityOutlined,
  GridViewOutlined,
  TableRowsOutlined,
  SportsTennis,
  PaymentsOutlined,
} from "@mui/icons-material";

const tournaments = [
  {
    id: 1,
    title: "Mandalay Open Cup 2026",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80",
    status: "Registration Open",
    tier: "Tier 2 Open",
    discipline: "Men's Singles (MS)",
    date: "Dec 05 – 10, 2026",
    court: "Court A",
    points: "4,000 PTS",
    entryFee: "25,000 MMK",
    description:
      "The Mandalay Open Cup 2026 is an official BWF-standard Tier 1 major operating under direct knockout single elimination. All matches are conducted in best-of-3 sets using the 21-point rally scoring system with sudden death cap at 30 points ",
  },
  {
    id: 2,
    title: "Yangon Badminton Trophy",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1000&q=80",
    status: "Registration Open",
    tier: "Tier 2 Open",
    discipline: "Women's Singles (WS)",
    date: "Dec 18 – 22, 2026",
    court: "Court B",
    points: "3,000 PTS",
    entryFee: "20,000 MMK",
    description:
      "Join the Yangon Badminton Trophy and compete for ranking points.",
  },
  {
    id: 3,
    title: "Taunggyi Winter Masters 2026",
    image:
      "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1000&q=80",
    status: "Ongoing (Live)",
    tier: "Major Tier 1",
    discipline: "Men's Doubles (MD)",
    date: "Nov 12 – 16, 2026",
    court: "Court D",
    points: "2,000 PTS",
    entryFee: "30,000 MMK",
    description: "A competitive winter badminton tournament in Taunggyi.",
  },
  {
    id: 4,
    title: "National Junior Talent Search 2026",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    tier: "Major Tier 1",
    discipline: "Mixed Doubles (XD)",
    date: "Oct 12 – 16, 2026",
    court: "Court D",
    points: "4,500 PTS",
    entryFee: "15,000 MMK",
    description:
      "Discover young badminton talent at the National Junior Talent Search.",
  },
];

const categories = [
  "All Categories",
  "Men's Singles (MS)",
  "Women's Singles (WS)",
  "Men's Doubles (MD)",
  "Mixed Doubles (XD)",
];

function Tournaments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [category, setCategory] = useState("All Categories");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch = [
        item.title,
        item.court,
        item.discipline,
        item.tier,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus = status === "All Statuses" || item.status === status;

      const matchesCategory =
        category === "All Categories" || item.discipline === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, status, category]);

  const handleViewDetails = (item) => {
    navigate(`/tournament-details/${item.id}`, { state: { tournament: item } });
  };

  const handleEnroll = (item) => {
    navigate(`/enroll`, { state: { tournament: item } });
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        .tournament-page {
          min-height: 100vh;
          padding: 36px 24px 64px;
          background: #f7f8fa;
          color: #172033;
          font-family: "Inter", sans-serif;
          font-size: 15px;
        }

        .tournament-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .tournament-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 30px;
        }

        .tournament-header-content {
          min-width: 0;
        }

        .tournament-eyebrow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .tournament-official-badge {
          padding: 5px 10px;
          border-radius: 5px;
          background: #a91435;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .tournament-season-label {
          color: #727987;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .tournament-main-title {
          margin: 0;
          color: #172033;
          font-size: clamp(34px, 4.2vw, 48px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -1.5px;
        }

        .tournament-description {
       
          margin: 14px 0 0;
          color: #737b88;
          font-size: 15px;
          line-height: 1.8;
        }

        .tournament-live-courts {
          flex-shrink: 0;
          min-width: 150px;
          padding: 15px 18px;
          border: 1px solid #edf0f3;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 12px rgb(20 30 50 / 5%);
        }

        .tournament-live-label {
          display: block;
          color: #a91435;
          font-size: 13px;
          font-weight: 800;
        }

        .tournament-live-count {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 5px;
          color: #a91435;
          font-size: 24px;
          font-weight: 800;
        }

        .tournament-live-count .MuiSvgIcon-root {
          font-size: 22px;
        }

        .tournament-filters {
          margin-bottom: 24px;
          padding: 20px;
          border: 1px solid #eef0f3;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 3px 12px rgb(20 30 50 / 3%);
        }

        .tournament-filter-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .tournament-search-box {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
          height: 46px;
          padding: 0 13px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: #f3f4f6;
          transition: border-color 0.2s, background 0.2s;
        }

        .tournament-search-box:focus-within {
          border-color: #b21b3d;
          background: #fff;
        }

        .tournament-search-icon {
          flex-shrink: 0;
          color: #737b88;
          font-size: 22px !important;
        }

        .tournament-search-input {
          width: 100%;
          min-width: 0;
          height: 100%;
          margin-left: 10px;
          border: none;
          outline: none;
          background: transparent;
          color: #172033;
          font-family: inherit;
          font-size: 14px;
        }

        .tournament-search-input::placeholder {
          color: #9298a3;
        }

        .tournament-filter-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tournament-status-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .tournament-status-select {
          min-width: 145px;
          height: 46px;
          padding: 0 34px 0 12px;
          appearance: none;
          border: 1px solid transparent;
          border-radius: 9px;
          outline: none;
          background: #f3f4f6;
          color: #424b59;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .tournament-select-icon {
          position: absolute;
          right: 8px;
          pointer-events: none;
          color: #525b68;
          font-size: 18px !important;
        }

        .tournament-view-switch {
          display: flex;
          gap: 3px;
          padding: 4px;
          border-radius: 8px;
          background: #f3f4f6;
        }

        .tournament-view-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border: none;
          border-radius: 6px;
          background: transparent;
          color: #6f7784;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .tournament-view-button .MuiSvgIcon-root {
          font-size: 20px;
        }

        .tournament-view-button.active {
          background: #172033;
          color: #fff;
        }

        .tournament-category-section {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
        }

        .tournament-category-label {
          padding-top: 12px;
          color: #737b88;
          font-size: 11px;
          font-weight: 800;
        }

        .tournament-category-list {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          gap: 7px;
        }

        .tournament-category-button {
          min-height: 38px;
          padding: 0 14px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: #f3f4f6;
          color: #4b5563;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .tournament-category-button:hover {
          border-color: #dfe2e8;
          background: #e9ebef;
        }

        .tournament-category-button.active {
          background: #08090c;
          color: #fff;
        }

        .tournament-results-heading {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 14px;
        }

        .tournament-results-count {
          color: #7a8290;
          font-size: 13px;
          font-weight: 600;
        }

        /* Desktop တွင် Default အနေဖြင့် ကတ် ၂ ခုပြမည် (Responsive ဖြစ်စေရန်) */
        .tournament-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 28px 24px;
        }

        .tournament-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #eceef2;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 10px rgb(22 30 45 / 5%);
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .tournament-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgb(22 30 45 / 9%);
        }

        .tournament-card-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e4e7ec;
        }

        .tournament-card-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .tournament-card:hover .tournament-card-image {
          transform: scale(1.04);
        }

        .tournament-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgb(9 15 30 / 30%) 0%,
            transparent 35%,
            rgb(9 15 30 / 78%) 100%
          );
          pointer-events: none;
        }

        .tournament-status-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          max-width: 60%;
          padding: 7px 10px;
          border-radius: 30px;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
        }

        .tournament-status-badge.open {
          background: #07966f;
        }

        .tournament-status-badge.live {
          background: #be2346;
        }

        .tournament-status-badge.completed {
          background: #596170;
        }

        .tournament-status-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #fff;
        }

        .tournament-tier-badge {
          position: absolute;
          top: 14px;
          right: 12px;
          max-width: 50%;
          overflow: hidden;
          padding: 7px 10px;
          border: 1px solid rgb(255 255 255 / 15%);
          border-radius: 7px;
          background: rgb(16 25 42 / 75%);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tournament-card-title {
          position: absolute;
          right: 18px;
          bottom: 16px;
          left: 18px;
          margin: 0;
          color: #fff;
          font-size: clamp(19px, 2.2vw, 24px);
          font-weight: 700;
          line-height: 1.35;
          text-shadow: 0 2px 8px rgb(0 0 0 / 25%);
        }

        .tournament-card-body {
          padding: 16px 18px 18px;
        }

        .tournament-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 15px;
        }

        .tournament-meta-item {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #596170;
          font-size: 13px;
          font-weight: 600;
        }

        .tournament-meta-item .MuiSvgIcon-root {
          flex-shrink: 0;
          color: #a91435;
          font-size: 18px;
        }

        .tournament-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 17px;
        }

        .tournament-points-box,
        .tournament-fee-box {
          display: flex;
          flex-direction: column;
          padding: 10px 12px;
          border-radius: 8px;
          background: #f2f4f7;
          color: #313b4a;
        }

        .tournament-info-label {
          font-size: 10px;
          font-weight: 800;
          color: #727987;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }

        .tournament-info-value {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 14px;
          font-weight: 800;
          color: #172033;
        }

        .tournament-points-box .MuiSvgIcon-root,
        .tournament-fee-box .MuiSvgIcon-root {
          font-size: 18px;
          color: #ae1236;
        }

        .tournament-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .tournament-details-button,
        .tournament-enroll-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 0;
          min-height: 44px;
          padding: 8px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        .tournament-details-button {
          background: #f2f4f7;
          color: #354052;
        }

        .tournament-details-button:hover {
          background: #e4e7ed;
        }

        .tournament-details-button .MuiSvgIcon-root {
          font-size: 17px;
        }

        .tournament-enroll-button {
          background: #ae1236;
          color: #fff;
        }

        .tournament-enroll-button:hover {
          background: #8d0d2a;
        }

        .tournament-enroll-button .MuiSvgIcon-root {
          font-size: 18px;
        }

        .tournament-empty-state {
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 70px 20px;
          border: 1px dashed #d7dce4;
          border-radius: 14px;
          background: #fff;
          text-align: center;
        }

        .tournament-empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          margin-bottom: 16px;
          border-radius: 50%;
          background: #f2f4f7;
          color: #7b8492;
        }

        .tournament-empty-title {
          margin: 0;
          color: #172033;
          font-size: 22px;
          font-weight: 800;
        }

        .tournament-empty-description {
          margin: 10px 0;
          color: #7b8492;
          font-size: 14px;
        }

        .tournament-reset-button {
          margin-top: 12px;
          padding: 11px 18px;
          border: none;
          border-radius: 8px;
          background: #ae1236;
          color: #fff;
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .tournament-reset-button:hover {
          background: #8d0d2a;
        }

        .tournament-table-wrapper {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #eceef2;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 10px rgb(22 30 45 / 4%);
        }

        .tournament-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .tournament-table-head {
          background: #f1f3f6;
        }

        .tournament-table-heading {
          padding: 16px 14px;
          color: #596170;
          font-size: 12px;
          font-weight: 800;
        }

        .tournament-table-cell {
          padding: 14px;
          border-bottom: 1px solid #edf0f3;
          color: #4c5564;
          font-size: 13px;
        }

        .tournament-table-row:last-child .tournament-table-cell {
          border-bottom: none;
        }

        .tournament-table-row:hover {
          background: #fafbfc;
        }

        .tournament-table-name {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #172033;
          font-weight: 700;
        }

        .tournament-table-image {
          width: 58px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 6px;
          object-fit: cover;
        }

        .tournament-table-status {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .tournament-table-status.open {
          background: #e4f7ef;
          color: #087b59;
        }

        .tournament-table-status.live {
          background: #fde9ee;
          color: #b31d42;
        }

        .tournament-table-status.completed {
          background: #f1f3f6;
          color: #596170;
        }

        .tournament-table-actions {
          display: flex;
          gap: 7px;
        }

        .tournament-table-action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid #e4e7ed;
          border-radius: 7px;
          background: #fff;
          color: #455063;
          cursor: pointer;
          transition: background 0.2s;
        }

        .tournament-table-action-button:hover {
          background: #f2f4f7;
        }

        .tournament-table-action-button .MuiSvgIcon-root {
          font-size: 18px;
        }

        .tournament-table-action-button.enroll {
          border-color: #ae1236;
          background: #ae1236;
          color: #fff;
        }

        .tournament-table-action-button.enroll:hover {
          background: #8d0d2a;
        }

        .tournament-skeleton-card {
          overflow: hidden;
          border: 1px solid #eceef2;
          border-radius: 14px;
          background: #fff;
        }

        .tournament-skeleton {
          background: linear-gradient(100deg, #eceff3 20%, #f8f9fb 40%, #eceff3 60%);
          background-size: 200% 100%;
          animation: tournament-shimmer 1.4s infinite linear;
        }

        .tournament-skeleton-cover {
          height: 220px;
        }

        .tournament-skeleton-content {
          padding: 18px;
        }

        .tournament-skeleton-line {
          width: 70%;
          height: 14px;
          margin-bottom: 15px;
          border-radius: 5px;
        }

        .tournament-skeleton-line.short {
          width: 45%;
        }

        .tournament-skeleton-points {
          height: 44px;
          margin: 20px 0;
          border-radius: 8px;
        }

        .tournament-skeleton-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .tournament-skeleton-button {
          height: 44px;
          border-radius: 8px;
        }

        .tournament-skeleton-table {
          overflow: hidden;
          border: 1px solid #eceef2;
          border-radius: 12px;
          background: #fff;
        }

        .tournament-skeleton-table-row {
          display: grid;
          grid-template-columns: 60px 2fr 1fr 1fr;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-bottom: 1px solid #edf0f3;
        }

        .tournament-skeleton-image {
          height: 42px;
          border-radius: 6px;
        }

        @keyframes tournament-shimmer {
          from { background-position: 100% 0; }
          to { background-position: -100% 0; }
        }

        @media (min-width: 1500px) {
          .tournament-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 1050px) {
          .tournament-page { padding: 28px 20px 50px; }
          .tournament-grid { gap: 20px; }
          .tournament-card-image-wrapper { height: 200px; }
          .tournament-tier-badge { max-width: 50%; font-size: 10px; }
          .tournament-card-meta { align-items: flex-start; }
          .tournament-table { min-width: 1000px; }
        }

        /* Mobile screen view ဖြစ်သွားလျှင် card တစ်ခုတည်း (1 column) သာ ပြသရန် */
        @media (max-width: 768px) {
          .tournament-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .tournament-page { padding: 24px 16px 40px; }
          .tournament-header { align-items: flex-start; gap: 16px; flex-direction: column; }
          .tournament-main-title { font-size: 32px; }
          .tournament-description { font-size: 14px; }
          .tournament-live-courts {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            min-width: 0;
          }
          .tournament-live-count { margin-top: 0; font-size: 20px; }
          .tournament-filter-top { align-items: stretch; flex-direction: column; }
          .tournament-filter-actions { justify-content: space-between; }
          .tournament-search-box { flex: auto; }
          .tournament-status-wrapper { flex: 1; }
          .tournament-status-select { width: 100%; }
        }

        @media (max-width: 480px) {
          .tournament-page { padding: 20px 12px 32px; }
          .tournament-filters { padding: 13px; }
          .tournament-category-section { flex-direction: column; gap: 9px; }
          .tournament-category-label { padding-top: 0; }
          .tournament-category-list { width: 100%; gap: 7px; }
          .tournament-category-button { min-height: 35px; padding: 0 10px; font-size: 11px; }
          .tournament-card-image-wrapper { height: 190px; }
          .tournament-card-title { font-size: 20px; }
          .tournament-view-button { width: 36px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tournament-skeleton { animation: none; }
          .tournament-card, .tournament-card-image, .tournament-details-button,
          .tournament-enroll-button {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <main className="tournament-page">
        <div className="tournament-container">
          <header className="tournament-header">
            <div className="tournament-header-content">
              <div className="tournament-eyebrow">
                <span className="tournament-official-badge">
                  OFFICIAL CIRCUIT
                </span>

                <span className="tournament-season-label">SEASON SCHEDULE</span>
              </div>

              <h1 className="tournament-main-title">
                Upcoming
                <br />
                Tournaments
              </h1>

              <p className="tournament-description">
                Discover sanctioned events, view live registration quotas, and
                secure seeded entries across Myanmar.
              </p>
            </div>

            <div className="tournament-live-courts">
              <span className="tournament-live-label">LIVE COURTS</span>

              <div className="tournament-live-count">
                <SportsTennis />
                <span>4</span>
              </div>
            </div>
          </header>

          <section className="tournament-filters">
            <div className="tournament-filter-top">
              <div className="tournament-search-box">
                <Search className="tournament-search-icon" />

                <input
                  className="tournament-search-input"
                  type="search"
                  placeholder="Search tournament name, city, or venue..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="tournament-filter-actions">
                <div className="tournament-status-wrapper">
                  <select
                    className="tournament-status-select"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Registration Open">Registration Open</option>
                    <option value="Ongoing (Live)">Ongoing (Live)</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <KeyboardArrowDown className="tournament-select-icon" />
                </div>

                <div className="tournament-view-switch">
                  <button
                    className={`tournament-view-button ${
                      view === "grid" ? "active" : ""
                    }`}
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    title="Grid view"
                  >
                    <GridViewOutlined />
                  </button>

                  <button
                    className={`tournament-view-button ${
                      view === "table" ? "active" : ""
                    }`}
                    onClick={() => setView("table")}
                    aria-label="Table view"
                    title="Table view"
                  >
                    <TableRowsOutlined />
                  </button>
                </div>
              </div>
            </div>

            <div className="tournament-category-section">
              <span className="tournament-category-label">DISCIPLINE:</span>

              <div className="tournament-category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`tournament-category-button ${
                      category === item ? "active" : ""
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="tournament-results-heading">
            <span className="tournament-results-count">
              {loading
                ? "Loading tournaments..."
                : `${filteredTournaments.length} tournaments found`}
            </span>
          </div>

          {loading ? (
            <section
              className={
                view === "grid"
                  ? "tournament-grid"
                  : "tournament-skeleton-table"
              }
            >
              {[1, 2, 3, 4].map((item) =>
                view === "grid" ? (
                  <div className="tournament-skeleton-card" key={item}>
                    <div className="tournament-skeleton tournament-skeleton-cover" />

                    <div className="tournament-skeleton-content">
                      <div className="tournament-skeleton tournament-skeleton-line" />

                      <div className="tournament-skeleton tournament-skeleton-line short" />

                      <div className="tournament-skeleton tournament-skeleton-points" />

                      <div className="tournament-skeleton-actions">
                        <div className="tournament-skeleton tournament-skeleton-button" />
                        <div className="tournament-skeleton tournament-skeleton-button" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="tournament-skeleton-table-row" key={item}>
                    <div className="tournament-skeleton tournament-skeleton-image" />
                    <div className="tournament-skeleton tournament-skeleton-line" />
                    <div className="tournament-skeleton tournament-skeleton-line short" />
                    <div className="tournament-skeleton tournament-skeleton-line short" />
                  </div>
                ),
              )}
            </section>
          ) : filteredTournaments.length === 0 ? (
            <section className="tournament-empty-state">
              <div className="tournament-empty-icon">
                <Search />
              </div>

              <h2 className="tournament-empty-title">No tournaments found</h2>

              <p className="tournament-empty-description">
                Try changing your search or filter options.
              </p>

              <button
                className="tournament-reset-button"
                onClick={() => {
                  setSearch("");
                  setStatus("All Statuses");
                  setCategory("All Categories");
                }}
              >
                Reset Filters
              </button>
            </section>
          ) : view === "grid" ? (
            <section className="tournament-grid">
              {filteredTournaments.map((item) => (
                <article className="tournament-card" key={item.id}>
                  <div className="tournament-card-image-wrapper">
                    <img
                      className="tournament-card-image"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />

                    <div className="tournament-image-overlay" />

                    <span
                      className={`tournament-status-badge ${
                        item.status === "Ongoing (Live)"
                          ? "live"
                          : item.status === "Completed"
                            ? "completed"
                            : "open"
                      }`}
                    >
                      <span className="tournament-status-dot" />
                      {item.status}
                    </span>

                    <span className="tournament-tier-badge">
                      {item.discipline}
                    </span>

                    <h2 className="tournament-card-title">{item.title}</h2>
                  </div>

                  <div className="tournament-card-body">
                    <div className="tournament-card-meta">
                      <div className="tournament-meta-item">
                        <CalendarMonthOutlined />
                        <span>{item.date}</span>
                      </div>

                      <div className="tournament-meta-item">
                        <LocationOnOutlined />
                        <span>{item.court}</span>
                      </div>
                    </div>

                    <div className="tournament-info-grid">
                      <div className="tournament-points-box">
                        <span className="tournament-info-label">
                          POINTS POOL
                        </span>
                        <div className="tournament-info-value">
                          <EmojiEventsOutlined />
                          <span>{item.points}</span>
                        </div>
                      </div>

                      <div className="tournament-fee-box">
                        <span className="tournament-info-label">ENTRY FEE</span>
                        <div className="tournament-info-value">
                          <PaymentsOutlined />
                          <span>{item.entryFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="tournament-card-actions">
                      <button
                        className="tournament-details-button"
                        onClick={() => handleViewDetails(item)}
                      >
                        View Details
                        <ArrowForward />
                      </button>

                      <button
                        className="tournament-enroll-button"
                        onClick={() => handleEnroll(item)}
                      >
                        <PersonAddAlt1Outlined />
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="tournament-table-wrapper">
              <table className="tournament-table">
                <thead className="tournament-table-head">
                  <tr className="tournament-table-header-row">
                    <th className="tournament-table-heading">Tournament</th>
                    <th className="tournament-table-heading">Discipline</th>
                    <th className="tournament-table-heading">Date</th>
                    <th className="tournament-table-heading">Court</th>
                    <th className="tournament-table-heading">Points</th>
                    <th className="tournament-table-heading">Entry Fee</th>
                    <th className="tournament-table-heading">Status</th>
                    <th className="tournament-table-heading">Actions</th>
                  </tr>
                </thead>

                <tbody className="tournament-table-body">
                  {filteredTournaments.map((item) => (
                    <tr className="tournament-table-row" key={item.id}>
                      <td className="tournament-table-cell">
                        <div className="tournament-table-name">
                          <img
                            className="tournament-table-image"
                            src={item.image}
                            alt=""
                          />

                          <span>{item.title}</span>
                        </div>
                      </td>

                      <td className="tournament-table-cell">
                        {item.discipline}
                      </td>

                      <td className="tournament-table-cell">{item.date}</td>

                      <td className="tournament-table-cell">{item.court}</td>

                      <td className="tournament-table-cell">{item.points}</td>

                      <td className="tournament-table-cell">{item.entryFee}</td>

                      <td className="tournament-table-cell">
                        <span
                          className={`tournament-table-status ${
                            item.status === "Ongoing (Live)"
                              ? "live"
                              : item.status === "Completed"
                                ? "completed"
                                : "open"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="tournament-table-cell">
                        <div className="tournament-table-actions">
                          <button
                            className="tournament-table-action-button"
                            onClick={() => handleViewDetails(item)}
                            aria-label="View details"
                          >
                            <VisibilityOutlined />
                          </button>

                          <button
                            className="tournament-table-action-button enroll"
                            onClick={() => handleEnroll(item)}
                            aria-label="Enroll now"
                          >
                            <PersonAddAlt1Outlined />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Tournaments;
