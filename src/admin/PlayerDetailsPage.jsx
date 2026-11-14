import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BlockIcon from "@mui/icons-material/Block";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function PlayerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve player data passed via navigate state, or fallback to mock data based on ID
  const passedPlayer = location.state?.player;

  const defaultPlayer = {
    id: `#${id || "NYX-8842"}`,
    name:
      id === "NYX-8843"
        ? "Aung Myo"
        : id === "NYX-8846"
          ? "Zin Min"
          : id === "NYX-8850"
            ? "Kyaw Swar"
            : "Min Thant",
    team: "Yangon Badminton Club",
    email: `${id === "NYX-8843" ? "aungmyo" : "minthant"}@example.com`,
    phone: "+95 9 450 123 789",
    stats: "2,150 PTS",
    status:
      id === "NYX-8846" ? "Warning" : id === "NYX-8850" ? "Banned" : "Active",
  };

  const player = passedPlayer || defaultPlayer;

  // Status states bound to the selected player
  const [isWarned, setIsWarned] = useState(player.status === "Warning");
  const [isBanned, setIsBanned] = useState(player.status === "Banned");
  const [showBanModal, setShowBanModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleToggleWarning = () => {
    setIsWarned(!isWarned);
  };

  const handleConfirmBan = () => {
    setIsBanned(true);
    setShowBanModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOPBAR */}
      <div
        style={{
          height: "75px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => navigate("/admin/players")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#334155",
          }}
        >
          <ArrowBackIcon style={{ fontSize: "18px" }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isBanned ? (
            <div
              style={{
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <BlockIcon style={{ fontSize: "18px" }} /> ● BANNED & SUSPENDED
              ACCOUNT
            </div>
          ) : (
            <>
              <button
                onClick={handleToggleWarning}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: isWarned ? "#ca8a04" : "#fefce8",
                  color: isWarned ? "#fff" : "#ca8a04",
                  border: "1px solid #fef08a",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <WarningAmberIcon style={{ fontSize: "18px" }} />
                {isWarned ? "Cancel Warning" : "Issue Warning"}
              </button>

              <button
                onClick={() => setShowBanModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <BlockIcon style={{ fontSize: "18px" }} /> Suspend / Ban
              </button>
            </>
          )}
        </div>
      </div>

      {/* MAIN CONTAINER (Dims if warned) */}
      <div
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          opacity: isWarned ? 0.5 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Page Title & ID */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "4px",
            }}
          >
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Athlete Registration Profile Dossier — {player.name}
            </h1>
            <span
              style={{
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "bold",
                border: "1px solid #e2e8f0",
              }}
            >
              • ID: {player.id}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Complete registration data submitted during sign-up for{" "}
            {player.name}, including personal info, dual NRC cards, credentials,
            and payment history.
          </p>
        </div>

        {/* SECTION 01: Personal Information & Club Details */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                01
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                Personal Information & Club Details
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "#16a34a",
                backgroundColor: "#f0fdf4",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #bbf7d0",
                fontWeight: "bold",
              }}
            >
              ✔ Submitted via Registration Portal
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#e2e8f0",
                  margin: "0 auto 12px auto",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #cbd5e1",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Player Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                {player.name}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                PLAYER PROFILE PHOTO
              </div>
              <div
                style={{
                  fontSize: "11px",
                  backgroundColor: "#f0fdf4",
                  color: "#16a34a",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                ✔ Verified Match Photo
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  FULL NAME *
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  {player.name}
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  PHONE NUMBER *
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{player.phone}</span>{" "}
                  <PhoneIcon style={{ fontSize: "16px", color: "#64748b" }} />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  EMAIL ADDRESS *
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{player.email}</span>{" "}
                  <EmailIcon style={{ fontSize: "16px", color: "#64748b" }} />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  PRIMARY CLUB / TEAM NAME
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>🏸 {player.team}</span>{" "}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    Affiliated
                  </span>
                </div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  FULL ADDRESS *
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <LocationOnIcon
                    style={{ fontSize: "16px", color: "#64748b" }}
                  />{" "}
                  No. 45, Pyay Road, Mayangone, Yangon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 02: Selected Playing Categories */}
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
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                backgroundColor: "#0f172a",
                color: "#fff",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              02
            </span>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a" }}
            >
              Selected Playing Categories (Season Circuit)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              🏸 U-13 Singles (MS)
            </span>
            <span
              style={{
                backgroundColor: "#fefce8",
                color: "#ca8a04",
                border: "1px solid #fef08a",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              🏸 U-13 Doubles (MD)
            </span>
            <span
              style={{
                backgroundColor: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              🏸 U-15 Singles (MS)
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            ℹ️ Player selected 3/3 maximum allowed event categories during open
            circuit registration. Dual-age bracket cleared by medical board.
          </p>
        </div>

        {/* SECTION 03: Birth Date / National ID Photo Verification */}
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
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                03
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                Birth Date / National ID Photo Verification (Dual NRC Cards)
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#334155",
                backgroundColor: "#f8fafc",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
            >
              DOB: 14 May 2012 (Age 13)
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#64748b",
                }}
              >
                <span>Front Side Photo Preview</span>
                <span
                  onClick={() =>
                    setModalImage(
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                    )
                  }
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <VisibilityIcon style={{ fontSize: "16px" }} /> View Full
                  Document
                </span>
              </div>
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "12px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                  alt="NRC Front"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#64748b",
                }}
              >
                <span>Back Side Photo Preview</span>
                <span
                  onClick={() =>
                    setModalImage(
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                    )
                  }
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <VisibilityIcon style={{ fontSize: "16px" }} /> View Full
                  Document
                </span>
              </div>
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                  alt="NRC Back"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 04: Account Security Credentials */}
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
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                backgroundColor: "#0f172a",
                color: "#fff",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              04
            </span>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a" }}
            >
              Account Security Credentials
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                REGISTERED EMAIL
              </label>
              <div
                style={{
                  padding: "12px 14px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {player.email}
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#64748b",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                ACCOUNT PASSWORD STATUS
              </label>
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#16a34a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  {showPassword
                    ? "PlayerPass#2026"
                    : "•••••••••••• (Secured & Encrypted)"}
                </span>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <VisibilityOffIcon style={{ fontSize: "20px" }} />
                  ) : (
                    <VisibilityIcon style={{ fontSize: "20px" }} />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 05: Tournament Participation History & Earned Points */}
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
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                05
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                Tournament Participation History & Earned Points
              </span>
            </div>
            <span
              style={{
                backgroundColor: "#ECEEF0",
                color: "#191C1E",
                border: "1px solid #ECEEF0",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Total Points: {player.stats}
            </span>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              textAlign: "left",
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
                }}
              >
                <th style={{ padding: "12px 16px" }}>TOURNAMENT NAME</th>
                <th style={{ padding: "12px 16px" }}>EVENT DATE</th>
                <th style={{ padding: "12px 16px" }}>CATEGORY</th>
                <th style={{ padding: "12px 16px" }}>RESULT</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>
                  POINTS EARNED
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "14px 16px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  🏸 Mandalay Open 2026
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>
                  Oct 12, 2026
                </td>
                <td style={{ padding: "14px 16px", color: "#334155" }}>
                  U-15 Singles
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      backgroundColor: "#fef2f2",
                      color: "#dc2626",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    🏆 CHAMPION
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "#191C1E",
                    fontSize: "17px",
                  }}
                >
                  +1,200 PTS
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "14px 16px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  🏸 Yangon Super Series
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b" }}>
                  Aug 20, 2026
                </td>
                <td style={{ padding: "14px 16px", color: "#334155" }}>
                  U-13 Doubles
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      backgroundColor: "#fefce8",
                      color: "#ca8a04",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    🥈 RUNNER-UP
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "#191C1E",
                    fontSize: "17px",
                  }}
                >
                  +950 PTS
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 06: Tournament Payment Proof Slips History */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "14px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                06
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                Tournament Payment Proof Slips History
              </span>
            </div>
            <span
              style={{ fontSize: "12px", color: "#64748b", fontWeight: "bold" }}
            >
              2 Verified Transactions
            </span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    backgroundColor: "#e2e8f0",
                    padding: "10px",
                    borderRadius: "8px",
                    color: "#334155",
                    display: "flex",
                  }}
                >
                  <ReceiptLongIcon style={{ fontSize: "22px" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#0f172a",
                      marginBottom: "4px",
                    }}
                  >
                    Yangon Masters 2026{" "}
                    <span
                      style={{
                        fontSize: "11px",
                        backgroundColor: "#e2e8f0",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginLeft: "6px",
                        fontWeight: "600",
                      }}
                    >
                      KBZ Pay
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#191C1E",
                    }}
                  >
                    25,000 MMK • Enroll: #ID-1 • Nov 10, 2026
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#16a34a",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircleIcon style={{ fontSize: "16px" }} /> Paid &
                  Verified
                </span>
                <button
                  onClick={() =>
                    setModalImage(
                      "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=600&auto=format&fit=crop&q=80",
                    )
                  }
                  style={{
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#0f172a",
                  }}
                >
                  <VisibilityIcon style={{ fontSize: "16px" }} /> View Slip
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    backgroundColor: "#e2e8f0",
                    padding: "10px",
                    borderRadius: "8px",
                    color: "#334155",
                    display: "flex",
                  }}
                >
                  <ReceiptLongIcon style={{ fontSize: "22px" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#0f172a",
                      marginBottom: "4px",
                    }}
                  >
                    Mandalay Open 2026{" "}
                    <span
                      style={{
                        fontSize: "11px",
                        backgroundColor: "#e2e8f0",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginLeft: "6px",
                        fontWeight: "600",
                      }}
                    >
                      WavePay
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#191C1E",
                    }}
                  >
                    25,000 MMK • Enroll: #ID-2 • Oct 05, 2026
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#16a34a",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircleIcon style={{ fontSize: "16px" }} /> Paid &
                  Verified
                </span>
                <button
                  onClick={() =>
                    setModalImage(
                      "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=600&auto=format&fit=crop&q=80",
                    )
                  }
                  style={{
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#0f172a",
                  }}
                >
                  <VisibilityIcon style={{ fontSize: "16px" }} /> View Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: SUSPEND / BAN CONFIRMATION */}
      {showBanModal && (
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
              maxWidth: "420px",
              padding: "28px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowBanModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>⚠️</div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 8px 0",
              }}
            >
              Confirm Player Suspension
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: "0 0 20px 0",
              }}
            >
              Are you sure you want to suspend and ban this player? This action
              will revoke their tournament access and account privileges
              immediately.
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() => setShowBanModal(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBan}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Yes, Suspend / Ban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW FULL DOCUMENT OR SLIP IMAGE */}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
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
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setModalImage(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
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
                fontSize: "15px",
                fontWeight: "bold",
                color: "#0f172a",
                margin: "0 0 16px 0",
              }}
            >
              Document & Slip Full Preview
            </h2>
            <div
              style={{
                width: "100%",
                height: "320px",
                backgroundColor: "#e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <img
                src={modalImage}
                alt="Full Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setModalImage(null)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
