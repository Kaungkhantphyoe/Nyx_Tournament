import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditModeIcon from "@mui/icons-material/Edit";

export default function TournamentDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock Tournaments Data
  const tournamentsData = {
    "trn-1": {
      id: "trn-1",
      name: "Yangon Masters Badminton Championship 2026",
      status: "Registration Open",
      date: "03/14/2026 - 03/18/2026",
      court: "Court 1",
      address: "73 rd St, Between 102nd & 103rd, Chanmyathazi, Mandalay",
      points: "5,000 PTS",
      fee: "25,000 MMK",
      description:
        "The Yangon Masters 2026 is an official BWF-standard Tier 1 major operating under direct knockout single elimination across elite singles and doubles brackets. Sanctioned by the Myanmar Badminton Federation with official world ranking points distribution.",
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
    },
    "trn-2": {
      id: "trn-2",
      name: "Mandalay Open Cup 2026",
      status: "Upcoming",
      date: "12/14/2026 - 12/18/2026",
      court: "Court 2",
      address: "Inya Road, Kamayut Township, Yangon",
      points: "3,500 PTS",
      fee: "20,000 MMK",
      description:
        "Mandalay Open Cup 2026 brings together top regional talents in an exciting multi-bracket championship format.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
    },
    "trn-3": {
      id: "trn-3",
      name: "Inya Lake Junior Smash 2026",
      status: "Completed",
      date: "10/14/2026 - 10/18/2026",
      court: "Court 4",
      address: "National Stadium, Thuwunna, Yangon",
      points: "2,000 PTS",
      fee: "15,000 MMK",
      description:
        "Junior development tournament designed for youth players to gain competitive ranking exposure.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
    },
  };

  const currentTournament = tournamentsData[id] || tournamentsData["trn-1"];

  // Form States
  const [title, setTitle] = useState(currentTournament.name);
  const [fee, setFee] = useState(currentTournament.fee.replace(" MMK", ""));
  const [startDate, setStartDate] = useState("2026-03-14");
  const [endDate, setEndDate] = useState("2026-03-18");
  const [regStatus, setRegStatus] = useState(currentTournament.status);
  const [pointsPool, setPointsPool] = useState(currentTournament.points);
  const [description, setDescription] = useState(currentTournament.description);
  const [courtName, setCourtName] = useState(currentTournament.court);
  const [address, setAddress] = useState(currentTournament.address);
  const [bannerImage, setBannerImage] = useState(currentTournament.image);

  // Edit Mode State (Default: Read-Only)
  const [isEditing, setIsEditing] = useState(false);

  // Form Validation State
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Official Rules State
  const [rules, setRules] = useState([
    {
      title: "Tournament Format & Knockout System",
      description:
        "Single elimination knockout system across all designated categories (MS, WS, MD, XD). Official seeding based on latest NYX platform rankings and MBF federation sanction logs.",
    },
    {
      title: "Match Scoring Rules",
      description:
        "Best of 3 sets to 21 rally points. Golden point tie-breaker rule applies at 29-all capped at 30 points strictly following BWF General Competition Regulations.",
    },
  ]);

  // Categories State
  const [categories, setCategories] = useState([
    {
      code: "MS",
      name: "Men's Singles",
      seeds: "8 Seeded Positions",
      format: "Best of 3 Sets to 21",
      status: "Open (Fast Closing)",
      criteria: "National Top 150 / Open Club Ranking",
      pointsPool: "1,500 PTS",
      shuttle: "Yonex Aerosensa 50 (Speed 2)",
    },
  ]);

  // Leaderboard Points Tiers State
  const [pointTiers, setPointTiers] = useState([
    { place: "1st Place / Champion", points: "1,000 PTS" },
    { place: "2nd Place / Runner-Up", points: "700 PTS" },
    { place: "3rd Place (Top 3)", points: "400 PTS" },
    { place: "4th Place (Top 4)", points: "150 PTS" },
  ]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageChange = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleAddRule = () => {
    if (!isEditing) return;
    setRules([...rules, { title: "", description: "" }]);
  };

  const handleRemoveRule = (index) => {
    if (!isEditing || index === 0) return; // Prevent deleting first rule
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (!isEditing) return;
    setCategories([
      ...categories,
      {
        code: "",
        name: "",
        seeds: "8 Seeded Positions",
        format: "Best of 3 Sets to 21",
        status: "Open (Fast Closing)",
        criteria: "",
        pointsPool: "",
        shuttle: "",
      },
    ]);
  };

  const handleRemoveCategory = (index) => {
    if (!isEditing || index === 0) return; // Prevent deleting first category
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddPointTier = () => {
    if (!isEditing) return;
    const nextRank = pointTiers.length + 1;
    setPointTiers([
      ...pointTiers,
      { place: `${nextRank}th Place (Top ${nextRank})`, points: "150 PTS" },
    ]);
  };

  const handleRemovePointTier = (index) => {
    if (!isEditing) return;
    setPointTiers(pointTiers.filter((_, i) => i !== index));
  };

  // Comprehensive Validation on Update
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!isEditing) return;

    setAttemptedSubmit(true);

    // 1. Validate Banner Image
    if (!bannerImage) return;

    // 2. Validate Basic Details
    if (!title || !fee || !startDate || !endDate || !pointsPool || !description)
      return;

    // 3. Validate Venue & Location
    if (!courtName || !address) return;

    // 4. Validate Official Rules
    for (let r of rules) {
      if (!r.title || !r.description) return;
    }

    // 5. Validate Event Categories
    for (let c of categories) {
      if (!c.code || !c.name || !c.criteria || !c.pointsPool || !c.shuttle)
        return;
    }

    // 6. Validate Leaderboard Points Tiers
    for (let p of pointTiers) {
      if (!p.place || !p.points) return;
    }

    // All valid
    setShowSuccessModal(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        paddingBottom: "80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top Header with Back Button & Edit Mode Toggle Button */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            height: "10px",
          }}
        >
          <button
            onClick={() => navigate("/admin/tournament")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            <ArrowBackIosNewIcon style={{ fontSize: "18px" }} />
          </button>
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 4px 0",
              }}
            >
              Tournament Details & Configuration
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0" }}>
              Review, update, and manage official tournament rules, categories,
              and schedule.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Toggle Edit Mode Button */}
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setAttemptedSubmit(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: isEditing ? "#fee2e2" : "#f1f5f9",
              color: isEditing ? "#dc2626" : "#475569",
              border: isEditing ? "1px solid #fecaca" : "1px solid #cbd5e1",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <EditModeIcon style={{ fontSize: "16px" }} />
            {isEditing ? "Edit Mode Active" : "Enable Edit Mode"}
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1120px",
          margin: "36px auto",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* SECTION 1: Basic Tournament Details */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                1
              </span>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                Basic Tournament Details
              </h2>
            </div>
            <span
              style={{ fontSize: "11px", fontWeight: "bold", color: "#dc2626" }}
            >
              * MANDATORY FIELDS
            </span>
          </div>

          <p
            style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0" }}
          >
            General identity, schedule timeline, registration fee and sanction
            status.
          </p>

          {/* Banner Image Preview */}
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <img
              src={bannerImage}
              alt="Tournament Banner"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                opacity: isEditing ? 1 : 0.95,
              }}
            />
            {isEditing && (
              <label
                style={{
                  position: "absolute",
                  bottom: "14px",
                  right: "14px",
                  backgroundColor: "rgba(15,23,42,0.85)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CloudUploadOutlinedIcon style={{ fontSize: "16px" }} /> Change
                Banner
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          {/* Form Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Tournament Title *
              </label>
              <input
                type="text"
                value={title}
                disabled={!isEditing}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !title
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontWeight: "600",
                  color: "#0f172a",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !title && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Tournament title is required
                </span>
              )}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Tournament Entry Fee (MMK) *
              </label>
              <input
                type="text"
                value={fee}
                disabled={!isEditing}
                onChange={(e) => setFee(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !fee
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontWeight: "600",
                  color: "#0f172a",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !fee && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Entry fee is required
                </span>
              )}
            </div>
          </div>

          {/* Date Pickers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                disabled={!isEditing}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !startDate
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !startDate && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Start date is required
                </span>
              )}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                End Date *
              </label>
              <input
                type="date"
                value={endDate}
                disabled={!isEditing}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !endDate
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !endDate && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  End date is required
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Registration Status
              </label>
              <select
                value={regStatus}
                disabled={!isEditing}
                onChange={(e) => setRegStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  fontSize: "13px",
                  outline: "none",
                  cursor: isEditing ? "pointer" : "not-allowed",
                }}
              >
                <option value="Registration Open">
                  Registration Open (Accepting Players)
                </option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Registration Closed">Registration Closed</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Tournament Ranking Points Pool *
              </label>
              <input
                type="text"
                value={pointsPool}
                disabled={!isEditing}
                onChange={(e) => setPointsPool(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !pointsPool
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !pointsPool && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Points pool is required
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Tournament Overview Description *
            </label>
            <textarea
              rows="3"
              value={description}
              disabled={!isEditing}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "8px",
                border:
                  attemptedSubmit && !description
                    ? "1px solid #dc2626"
                    : "1px solid #cbd5e1",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: isEditing ? "#fff" : "#f8fafc",
                cursor: isEditing ? "text" : "not-allowed",
              }}
            ></textarea>
            {attemptedSubmit && !description && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#dc2626",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                Overview description is required
              </span>
            )}
          </div>
        </div>

        {/* SECTION 2: Venue & Operational Location */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                2
              </span>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                Venue & Operational Location
              </h2>
            </div>
          </div>
          <p
            style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0" }}
          >
            Court layout center, official coordinates, and transit reference.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Venue / Court Name *
              </label>
              <input
                type="text"
                value={courtName}
                disabled={!isEditing}
                onChange={(e) => setCourtName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !courtName
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !courtName && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Court name is required
                </span>
              )}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Full Location Address *
              </label>
              <input
                type="text"
                value={address}
                disabled={!isEditing}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border:
                    attemptedSubmit && !address
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
              {attemptedSubmit && !address && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#dc2626",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Address is required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: OFFICIAL TOURNAMENT RULES */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                3
              </span>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                OFFICIAL TOURNAMENT RULES
              </h2>
            </div>
            {isEditing && (
              <button
                onClick={handleAddRule}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <AddIcon style={{ fontSize: "16px" }} /> Add Rules
              </button>
            )}
          </div>
          <p
            style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0" }}
          >
            Define tournament gameplay governance, shuttlecock standards, and
            dress codes.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {rules.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#64748b",
                    }}
                  >
                    RULE NODE #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  {/* Hide delete button for the first item (idx === 0) */}
                  {isEditing && idx > 0 && (
                    <button
                      onClick={() => handleRemoveRule(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        gap: "2px",
                      }}
                    >
                      <DeleteOutlineIcon style={{ fontSize: "16px" }} /> Remove
                    </button>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    Rule Title *
                  </label>
                  <input
                    type="text"
                    value={rule.title}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[idx].title = e.target.value;
                      setRules(newRules);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !rule.title
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !rule.title && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Rule title is required
                    </span>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    Rule Description *
                  </label>
                  <textarea
                    rows="3"
                    value={rule.description}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[idx].description = e.target.value;
                      setRules(newRules);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !rule.description
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  ></textarea>
                  {attemptedSubmit && !rule.description && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Rule description is required
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Event Categories & Match Requirements */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                4
              </span>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                Event Categories & Match Requirements
              </h2>
            </div>
            {isEditing && (
              <button
                onClick={handleAddCategory}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <AddIcon style={{ fontSize: "16px" }} /> Add Category Event
              </button>
            )}
          </div>
          <p
            style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0" }}
          >
            Configure age groups, draws, seed allocations, shuttlecock specs and
            match structures.
          </p>

          {categories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    Category #{idx + 1} Configuration
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    Active Roster
                  </span>
                </div>
                {/* Hide delete button for the first category item (idx === 0) */}
                {isEditing && idx > 0 && (
                  <button
                    onClick={() => handleRemoveCategory(idx)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <DeleteOutlineIcon style={{ fontSize: "16px" }} /> Delete
                    Category
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "20px",
                  marginBottom: "16px",
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
                    Category Code *
                  </label>
                  <input
                    type="text"
                    value={cat.code}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].code = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !cat.code
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !cat.code && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Code is required
                    </span>
                  )}
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
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={cat.name}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].name = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !cat.name
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !cat.name && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Name is required
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
                  marginBottom: "16px",
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
                    Seeds / Pairing Type
                  </label>
                  <select
                    value={cat.seeds}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].seeds = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      fontSize: "12px",
                      outline: "none",
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  >
                    <option>Single Elimination</option>
                    <option>Double Elimination</option>
                    <option>Round Robin</option>
                    <option>8 Seeded Positions</option>
                    <option>16 Seeded Positions</option>
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
                    Match Format
                  </label>
                  <select
                    value={cat.format}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].format = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      fontSize: "12px",
                      outline: "none",
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  >
                    <option>Best of 3 Sets to 21</option>
                    <option>Best of 5 Sets to 11</option>
                    <option>Single Set to 30 Points</option>
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
                    Entry Status Tag
                  </label>
                  <select
                    value={cat.status}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].status = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      fontSize: "12px",
                      outline: "none",
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  >
                    <option>Open (Fast Closing)</option>
                    <option>Enrollment Open</option>
                    <option>Enrollment Closed</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
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
                    Eligibility Criteria *
                  </label>
                  <input
                    type="text"
                    value={cat.criteria}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].criteria = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !cat.criteria
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !cat.criteria && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Criteria is required
                    </span>
                  )}
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
                    Category Points Pool *
                  </label>
                  <input
                    type="text"
                    value={cat.pointsPool}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].pointsPool = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !cat.pointsPool
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !cat.pointsPool && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Points pool is required
                    </span>
                  )}
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
                    Official Shuttle *
                  </label>
                  <input
                    type="text"
                    value={cat.shuttle}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].shuttle = e.target.value;
                      setCategories(c);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !cat.shuttle
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                  {attemptedSubmit && !cat.shuttle && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#dc2626",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Shuttle is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 5: Leaderboard Points Allocation */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                5
              </span>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                Leaderboard Points Allocation
              </h2>
            </div>
            {isEditing && (
              <button
                onClick={handleAddPointTier}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <AddIcon style={{ fontSize: "16px" }} /> Add Point Tier
              </button>
            )}
          </div>
          <p
            style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0" }}
          >
            Define point distributions awarded toward the official NYX National
            Master Ranking.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {pointTiers.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🏆</span>
                  <input
                    type="text"
                    value={tier.place}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const p = [...pointTiers];
                      p[idx].place = e.target.value;
                      setPointTiers(p);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !tier.place
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      fontWeight: "bold",
                      color: "#0f172a",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "160px",
                  }}
                >
                  <input
                    type="text"
                    value={tier.points}
                    disabled={!isEditing}
                    onChange={(e) => {
                      const p = [...pointTiers];
                      p[idx].points = e.target.value;
                      setPointTiers(p);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border:
                        attemptedSubmit && !tier.points
                          ? "1px solid #dc2626"
                          : "1px solid #cbd5e1",
                      fontSize: "12px",
                      outline: "none",
                      fontWeight: "bold",
                      boxSizing: "border-box",
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      cursor: isEditing ? "text" : "not-allowed",
                    }}
                  />
                </div>
                {isEditing && idx >= 3 && (
                  <button
                    onClick={() =>
                      setPointTiers(pointTiers.filter((_, i) => i !== idx))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc2626",
                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlineIcon style={{ fontSize: "18px" }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => navigate("/admin/tournament")}
            style={{
              padding: "14px 32px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#334155",
            }}
          >
            Cancel & Discards
          </button>

          <button
            onClick={handleUpdate}
            disabled={!isEditing}
            style={{
              padding: "14px 36px",
              backgroundColor: isEditing ? "#dc2626" : "#cbd5e1",
              color: isEditing ? "#fff" : "#64748b",
              border: "none",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: isEditing ? "pointer" : "not-allowed",
              boxShadow: isEditing ? "0 4px 12px rgba(220,38,38,0.3)" : "none",
              opacity: isEditing ? 1 : 0.6,
              transition: "all 0.2s",
            }}
          >
            💾 SAVE CHANGES & UPDATE
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL ON UPDATE */}
      {showSuccessModal && (
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
              padding: "36px",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <CheckCircleIcon style={{ fontSize: "58px", color: "#16a34a" }} />
            </div>
            <h2
              style={{
                fontSize: "19px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Tournament Updated!
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "26px",
              }}
            >
              Your changes have been successfully saved and updated across the
              platform.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/admin/tournament");
              }}
              style={{
                width: "100%",
                padding: "13px",
                backgroundColor: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Back to Tournaments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
