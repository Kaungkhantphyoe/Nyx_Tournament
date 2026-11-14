import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CreateTournamentPage() {
  const navigate = useNavigate();

  // Banner Image Preview State & Validation Error
  const [bannerImage, setBannerImage] = useState(null);

  // Form Field States for Basic Details & Venue
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [regStatus, setRegStatus] = useState(
    "Registration Open (Accepting Players)",
  );
  const [pointsPool, setPointsPool] = useState("");
  const [description, setDescription] = useState("");
  const [courtName, setCourtName] = useState("");
  const [address, setAddress] = useState("");

  // Official Rules State
  const [rules, setRules] = useState([{ title: "", description: "" }]);

  // Categories State (Includes eligibility, points pool, and official shuttle)
  const [categories, setCategories] = useState([
    {
      code: "",
      name: "",
      seeds: "8 Seeded Positions",
      format: "Best of 3 Sets to 21 Points",
      status: "Open (Fast Closing)",
      criteria: "",
      pointsPool: "",
      shuttle: "",
    },
  ]);

  // Leaderboard Points Tiers State
  const [pointTiers, setPointTiers] = useState([
    { place: "", points: "" },
    { place: "", points: "" },
    { place: "", points: "" },
  ]);

  // Validation Error Trigger State
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle banner image selection and live preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleAddRule = () => {
    setRules([...rules, { title: "", description: "" }]);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      {
        code: "",
        name: "",
        seeds: "8 Seeded Positions",
        format: "Best of 3 Sets to 21 Points",
        status: "Open (Fast Closing)",
        criteria: "",
        pointsPool: "",
        shuttle: "",
      },
    ]);
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddPointTier = () => {
    const nextRank = pointTiers.length + 1;
    let placeLabel = `${nextRank}th Place (Top ${nextRank})`;
    if (nextRank === 4) placeLabel = "4th Place (Top 4)";
    else if (nextRank === 5) placeLabel = "5th Place (Top 5)";
    else if (nextRank === 6) placeLabel = "6th Place (Top 6)";

    setPointTiers([...pointTiers, { place: placeLabel, points: "" }]);
  };

  const handleRemovePointTier = (index) => {
    setPointTiers(pointTiers.filter((_, i) => i !== index));
  };

  // Comprehensive validation across all required fields including image, overview, points pool, and category extra fields
  const handlePublish = (e) => {
    e.preventDefault();
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

    // 5. Validate Event Categories (including criteria, points pool, and shuttle)
    for (let c of categories) {
      if (!c.code || !c.name || !c.criteria || !c.pointsPool || !c.shuttle)
        return;
    }

    // 6. Validate Leaderboard Points Tiers
    for (let p of pointTiers) {
      if (!p.place || !p.points) return;
    }

    // If all validations pass
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
      {/* Custom Top Header with Back Button */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "24px 30px",
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
              Create New Tournament
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0" }}>
              Setup tournament details, official rules, event categories, and
              points system for public registration.
            </p>
          </div>
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#64748b",
            backgroundColor: "#f1f5f9",
            padding: "10px 16px",
            borderRadius: "8px",
          }}
        >
          🛡 Official Master Sanction
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

          {/* Banner Upload Area with Error Border */}
          <div
            style={{
              border:
                attemptedSubmit && !bannerImage
                  ? "2px dashed #dc2626"
                  : "2px dashed #cbd5e1",
              borderRadius: "10px",
              padding: "28px",
              textAlign: "center",
              backgroundColor: "#f8fafc",
              marginBottom: "24px",
            }}
          >
            {bannerImage ? (
              <div style={{ position: "relative" }}>
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => setBannerImage(null)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div>
                <CloudUploadOutlinedIcon
                  style={{
                    fontSize: "40px",
                    color: "#94a3b8",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Drag & Drop Cover Banner Image or Browse File *
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "16px",
                  }}
                >
                  Recommended dimension: 1200 × 400 px (PNG, JPG up to 5MB; 16:9
                  ratio compatible)
                </div>
                <label
                  style={{
                    display: "inline-block",
                    padding: "10px 18px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    color: "#334155",
                  }}
                >
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                {attemptedSubmit && !bannerImage && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#dc2626",
                      marginTop: "8px",
                      display: "block",
                    }}
                  >
                    Cover banner image is required
                  </span>
                )}
              </div>
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Yangon Masters Badminton Championship 2026"
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
                onChange={(e) => setFee(e.target.value)}
                placeholder="e.g., 25,000"
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
                  backgroundColor: "#fff",
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
                  backgroundColor: "#fff",
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
                onChange={(e) => setRegStatus(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                <option>Registration Open (Accepting Players)</option>
                <option>Registration Closed</option>
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
                onChange={(e) => setPointsPool(e.target.value)}
                placeholder="e.g., 6,500 PTS"
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short, engaging summary about this tournament..."
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
                onChange={(e) => setCourtName(e.target.value)}
                placeholder="e.g., Court 1"
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
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., Waizayandar Road, Thingangyun Township, Yangon"
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
                  {idx > 0 && (
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
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[idx].title = e.target.value;
                      setRules(newRules);
                    }}
                    placeholder="e.g., Tournament Format & Knockout System"
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
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[idx].description = e.target.value;
                      setRules(newRules);
                    }}
                    placeholder="Enter specific rule details..."
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
                {idx > 0 && (
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
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].code = e.target.value;
                      setCategories(c);
                    }}
                    placeholder="e.g., MS, WD, XD"
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
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].name = e.target.value;
                      setCategories(c);
                    }}
                    placeholder="e.g., Men's Singles (Open Division)"
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
                      backgroundColor: "#fff",
                      fontSize: "12px",
                      outline: "none",
                    }}
                  >
                    <option>Single Elimination</option>
                    <option>Double Elimination</option>
                    <option>Round Robin</option>
                    <option>8 Seeded Positions</option>
                    <option>16 Seeded Positions</option>
                    <option>Unseeded Knockout</option>
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
                      backgroundColor: "#fff",
                      fontSize: "12px",
                      outline: "none",
                    }}
                  >
                    <option>Best of 3 Sets to 21 Points</option>
                    <option>Best of 5 Sets to 11 Points</option>
                    <option>Single Set to 30 Points</option>
                    <option>Best of 3 Sets to 11 Points</option>
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
                      backgroundColor: "#fff",
                      fontSize: "12px",
                      outline: "none",
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
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].criteria = e.target.value;
                      setCategories(c);
                    }}
                    placeholder="e.g., National Top 150"
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
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].pointsPool = e.target.value;
                      setCategories(c);
                    }}
                    placeholder="e.g., 1,500 PTS"
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
                    onChange={(e) => {
                      const c = [...categories];
                      c[idx].shuttle = e.target.value;
                      setCategories(c);
                    }}
                    placeholder="e.g., Yonex Aerosensa 50"
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
                    onChange={(e) => {
                      const p = [...pointTiers];
                      p[idx].place = e.target.value;
                      setPointTiers(p);
                    }}
                    placeholder="e.g., 1st Place / Champion"
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
                    onChange={(e) => {
                      const p = [...pointTiers];
                      p[idx].points = e.target.value;
                      setPointTiers(p);
                    }}
                    placeholder="e.g., 1,000 PTS"
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
                    }}
                  />
                </div>
                {idx >= 3 && (
                  <button
                    onClick={() => handleRemovePointTier(idx)}
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
            Cancel & Save Draft
          </button>
          <button
            onClick={handlePublish}
            style={{
              padding: "14px 36px",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(220,38,38,0.3)",
            }}
          >
            🚀 PUBLISH TOURNAMENT
          </button>
        </div>
      </div>

      {/* CUSTOM SUCCESS CARD MODAL */}
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
              Tournament Published!
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "26px",
              }}
            >
              Your tournament has been successfully created and published for
              public registration.
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
