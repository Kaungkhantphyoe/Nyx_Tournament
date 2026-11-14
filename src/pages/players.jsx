import React, { useState, useMemo } from "react";
import {
  EmojiEventsOutlined,
  SearchRounded,
  KeyboardArrowDownRounded,
  InfoOutlined,
  CheckCircleRounded,
  HourglassEmptyRounded,
  CancelRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

// Mock data for user's own enrollments in this tournament
const myEnrollmentsDatabase = [
  {
    id: 1,
    category: "Men's Singles (MS)",
    submittedDate: "Nov 28, 2026 • 16:42",
    nyxId: "#MS - 88219",
    status: "Pending",
    rejectionReason: "",
  },
  {
    id: 2,
    category: "Men's Doubles (MD)",
    submittedDate: "Nov 29, 2026 • 10:15",
    nyxId: "#MD - 94102",
    status: "Approved",
    rejectionReason: "",
  },
];

// Mock database for approved players list with actual profile images
export const approvedPlayersDatabase = [
  {
    id: 1,
    name: "Min Thant",
    org: "Yangon",
    nyxId: "NYX ID: MS-08216",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Zarni Tun",
    org: "Mandalay",
    nyxId: "NYX ID: MS-08218",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Aung Kyaw",
    org: "Taunggyi",
    nyxId: "NYX ID: MS-08210",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Kyaw Swar",
    org: "Naypyidaw",
    nyxId: "NYX ID: MS-08317",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Htet Aung",
    org: "Bago",
    nyxId: "NYX ID: MS-08218",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Zaw Lin",
    org: "Yangon",
    nyxId: "NYX ID: MS-08219",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Myo Min",
    org: "Hmawbi",
    nyxId: "NYX ID: MS-08220",
    category: "Men's Singles (MS)",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Su Su",
    org: "Yangon",
    nyxId: "NYX ID: MD-11021",
    category: "Men's Doubles (MD)",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "May Shin",
    org: "Mandalay",
    nyxId: "NYX ID: MD-11022",
    category: "Men's Doubles (MD)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
];

export default function RegisteredPlayers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Men's Singles (MS)");
  const [showCatDropdown, setShowCatDropdown] = useState(false);

  const categories = [
    "Men's Singles (MS)",
    "Women's Singles (WS)",
    "Men's Doubles (MD)",
    "Mixed Doubles (XD)",
  ];

  const filteredApprovedPlayers = useMemo(() => {
    return approvedPlayersDatabase.filter((player) => {
      const matchCat = player.category === selectedCategory;
      const matchSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.nyxId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      {/* My Enrollment Status Section */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "22px 24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "17px",
              fontWeight: "900",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <EmojiEventsOutlined style={{ fontSize: 20, color: "#ae1236" }} />{" "}
            My Enrollment Status
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {myEnrollmentsDatabase.map((enroll) => (
            <div
              key={enroll.id}
              style={{
                background: "#f8f9fa",
                border: "1px solid #eef0f3",
                borderRadius: "12px",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      color: "#727987",
                      letterSpacing: "0.5px",
                    }}
                  >
                    APPLIED CATEGORY
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "900",
                      color: "#172033",
                    }}
                  >
                    {enroll.category}
                  </div>
                </div>

                <div>
                  {enroll.status === "Pending" && (
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#b45309",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <HourglassEmptyRounded style={{ fontSize: 14 }} />{" "}
                      Enrollment Status: Pending Admin Approval
                    </span>
                  )}
                  {enroll.status === "Approved" && (
                    <span
                      style={{
                        background: "#e4f7ef",
                        color: "#087b59",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CheckCircleRounded style={{ fontSize: 14 }} /> Enrollment
                      Status: Approved
                    </span>
                  )}
                  {enroll.status === "Rejected" && (
                    <span
                      style={{
                        background: "#fde9ee",
                        color: "#ae1236",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CancelRounded style={{ fontSize: 14 }} /> Enrollment
                      Status: Rejected
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#596170",
                  fontWeight: "700",
                  borderTop: "1px solid #edf0f3",
                  paddingTop: "10px",
                }}
              >
                <div>
                  Submitted Date:{" "}
                  <b style={{ color: "#172033" }}>{enroll.submittedDate}</b>
                </div>
                <div>
                  NYX ID: <b style={{ color: "#ae1236" }}>{enroll.nyxId}</b>
                </div>
              </div>

              {enroll.status === "Rejected" && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#991b1b",
                    fontSize: "12.5px",
                    fontWeight: "700",
                  }}
                >
                  ⚠️ <b>Rejected Reason:</b>{" "}
                  {enroll.rejectionReason ||
                    "Payment slip verification failed or incorrect rank specifications. Please contact support."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Important Approval Guidelines & Process */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "22px 24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
        }}
      >
        <h4
          style={{
            fontSize: "18px",
            fontWeight: "900",
            color: "#172033",
            margin: "0 0 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <InfoOutlined style={{ fontSize: 25, color: "#ae1236" }} /> Important
          Approval Guidelines & Process:
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: "1.6",
          }}
        >
          <div>
            <b>• Verification Period:</b> Admin & Referee committee will verify
            your payment slip and player eligibility within 1-2 business days.
          </div>
          <div>
            <b>• Public Visibility:</b> Once Approved, your name will
            automatically appear on the public player list and match schedule.
          </div>
          <div>
            <b>• Rejection Policy:</b> Entries with invalid payment slips or
            incorrect rank specifications will be Rejected with a full refund.
          </div>
        </div>
      </div>

      {/* Search Bar & Category Dropdown Filter */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchRounded
            style={{
              position: "absolute",
              left: "16px",
              color: "#727987",
              fontSize: 20,
            }}
          />
          <input
            type="text"
            placeholder="Search player name, club, BWF ID, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              minHeight: "48px",
              padding: "0 16px 0 48px",
              border: "1px solid #eef0f3",
              borderRadius: "12px",
              background: "#fff",
              color: "#172033",
              font: "inherit",
              fontSize: "13.5px",
              boxShadow: "0 3px 12px rgba(20, 30, 50, 0.03)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ position: "relative", minWidth: "220px" }}>
          <button
            onClick={() => setShowCatDropdown((v) => !v)}
            style={{
              width: "100%",
              minHeight: "48px",
              padding: "0 16px",
              border: "1px solid #eef0f3",
              borderRadius: "12px",
              background: "#fff",
              color: "#172033",
              fontWeight: "800",
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(20, 30, 50, 0.03)",
            }}
          >
            <span>{selectedCategory}</span>
            <KeyboardArrowDownRounded />
          </button>

          {showCatDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                width: "100%",
                background: "#fff",
                border: "1px solid #eef0f3",
                borderRadius: "12px",
                boxShadow: "0 15px 35px rgba(20, 30, 50, 0.15)",
                zIndex: 20,
                padding: "8px",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCatDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      selectedCategory === cat ? "#fde9ee" : "transparent",
                    color: selectedCategory === cat ? "#ae1236" : "#354052",
                    fontWeight: "800",
                    fontSize: "13px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Approved Players List Section */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <h4
            style={{
              fontSize: "16.5px",
              fontWeight: "900",
              color: "#172033",
              margin: "0 0 4px",
            }}
          >
            Approved Players List
          </h4>
          <span
            style={{ fontSize: "12px", fontWeight: "700", color: "#727987" }}
          >
            Displaying confirmed athletes for {selectedCategory} category
          </span>
        </div>

        {filteredApprovedPlayers.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {filteredApprovedPlayers.map((player) => (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  background: "#fcfcfc",
                  border: "1px solid #f1f3f6",
                  borderRadius: "12px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {/* Real Profile Image instead of text avatar */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <img
                    src={player.avatar}
                    alt={player.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #eef0f3",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "900",
                        color: "#172033",
                      }}
                    >
                      {player.name}{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#727987",
                          fontWeight: "700",
                        }}
                      >
                        {player.org}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#727987",
                        fontWeight: "700",
                      }}
                    >
                      {player.nyxId}
                    </div>
                  </div>
                </div>

                {/* ညာဘက်ရှိ Approved Status နဲ့ View Profile Button တို့၏ Size များကို အညီအမျှ (Same Size) ချိန်ညှိထားသည် */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      background: "#e4f7ef",
                      color: "#087b59",
                      fontSize: "12px",
                      fontWeight: "800",
                      height: "38px",
                      padding: "0 14px",
                      borderRadius: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    <CheckCircleRounded style={{ fontSize: 14 }} /> Approved
                  </span>

                  <button
                    onClick={() => alert(`Viewing profile for ${player.name}`)}
                    style={{
                      background: "#172033",
                      color: "#fff",
                      border: "none",
                      height: "38px",
                      padding: "0 16px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "800",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      boxSizing: "border-box",
                      transition: "background 0.2s",
                    }}
                  >
                    View Profile{" "}
                    <ArrowForwardIosRounded style={{ fontSize: 10 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "12px",
              color: "#727987",
              fontSize: "13.5px",
              fontWeight: "700",
            }}
          >
            No approved players found matching your criteria in{" "}
            {selectedCategory}.
          </div>
        )}
      </div>
    </div>
  );
}
