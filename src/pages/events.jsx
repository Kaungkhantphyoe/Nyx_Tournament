import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FormatListNumberedOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";

export default function Events({ tournament }) {
  const navigate = useNavigate();

  const categoriesList = [
    {
      code: "MS",
      name: "Men's Singles",
      eligibility: "Top 100 National",
      pointsPool: "1,500 PTS (500 W / 350 RU)",
      matchFormat: "Best of 3 Sets to 21",
      officialShuttle: "Yonex Aerosensa 50 (Spd 2)",
      seedsProtected: "8 Seeded Positions",
      entryStatus: "Open (Fast Closing)",
      deadline: "Nov 10, 2026 (11:59 PM MMT)",
      btnText: "Enroll for MS",
    },
    {
      code: "MD",
      name: "Men's Doubles",
      eligibility: "Open Division (Pairs)",
      pointsPool: "1,500 PTS (700 W / 500 RU)",
      matchFormat: "Best of 3 Sets to 21",
      officialShuttle: "Yonex Aerosensa 50 (Spd 2)",
      pairingType: "Fixed Due (Rank Pooled)",
      entryStatus: "Queue Open for Dropouts",
      deadline: "Nov 10, 2026 (11:59 PM MMT)",
      btnText: "Enroll for MD",
    },
    {
      code: "WS",
      name: "Women's Singles",
      eligibility: "Open National",
      pointsPool: "1,300 PTS (350 W / 250 RU)",
      matchFormat: "Knockout • 3 Sets to 21",
      officialShuttle: "Yonex Aerosensa 50 (Spd 2)",
      earlyVerify: "Approved Auto-Pass",
      entryStatus: "Open for Entries",
      deadline: "Nov 10, 2026 (11:59 PM MMT)",
      btnText: "Enroll for WS",
    },
    {
      code: "XD",
      name: "Mixed Doubles",
      eligibility: "Combined Rank < 250",
      pointsPool: "1,200 PTS (450 W / 300 RU)",
      matchFormat: "Knockout • 3 Sets to 21",
      officialShuttle: "Yonex Aerosensa 50 (Spd 2)",
      pairRule: "1 Male + 1 Female",
      entryStatus: "Open Registration",
      deadline: "Nov 10, 2026 (11:59 PM MMT)",
      btnText: "Enroll for XD",
    },
  ];

  const handleEnrollClick = (category) => {
    navigate("/enroll", { state: { tournament, category } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      {/* Header Bar with Dynamic Count */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "20px 24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#172033",
              margin: "0 0 6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormatListNumberedOutlined
              style={{ fontSize: 22, color: "#ae1236" }}
            />{" "}
            Event Categories
          </h3>
          <p
            style={{
              fontSize: "13.5px",
              color: "#727987",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Select an event category to inspect quota capacities, seed rankings,
            and entry requirements.
          </p>
        </div>
        <span
          style={{
            background: "#172033",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "800",
            padding: "6px 14px",
            borderRadius: "8px",
          }}
        >
          {categoriesList.length} Open
        </span>
      </div>

      {/* Categories Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {categoriesList.map((cat, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* Top Title & Code */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  background: "#172033",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "900",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  flexShrink: 0,
                }}
              >
                {cat.code}
              </div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#172033",
                  margin: "0",
                }}
              >
                {cat.name}
              </h4>
            </div>

            {/* Info Grid: Desktop တွင် ၃ ခုစီတန်း၍ ဘေးချင်းယှဉ်ပြရန် ချိန်ညှိထားသည် */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
                background: "#f8f9fa",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #edf0f3",
                fontSize: "13px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#727987",
                    fontWeight: "700",
                    marginBottom: "3px",
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  ELIGIBILITY
                </div>
                <div style={{ color: "#172033", fontWeight: "800" }}>
                  {cat.eligibility}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#727987",
                    fontWeight: "700",
                    marginBottom: "3px",
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  POINTS POOL
                </div>
                <div style={{ color: "#ae1236", fontWeight: "800" }}>
                  {cat.pointsPool}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#727987",
                    fontWeight: "700",
                    marginBottom: "3px",
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  MATCH FORMAT
                </div>
                <div style={{ color: "#172033", fontWeight: "800" }}>
                  {cat.matchFormat}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "#727987",
                    fontWeight: "700",
                    marginBottom: "3px",
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  OFFICIAL SHUTTLE
                </div>
                <div style={{ color: "#172033", fontWeight: "800" }}>
                  {cat.officialShuttle}
                </div>
              </div>

              {cat.seedsProtected && (
                <div>
                  <div
                    style={{
                      color: "#727987",
                      fontWeight: "700",
                      marginBottom: "3px",
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    SEEDS PROTECTED
                  </div>
                  <div style={{ color: "#172033", fontWeight: "800" }}>
                    {cat.seedsProtected}
                  </div>
                </div>
              )}
              {cat.pairingType && (
                <div>
                  <div
                    style={{
                      color: "#727987",
                      fontWeight: "700",
                      marginBottom: "3px",
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    PAIRING TYPE
                  </div>
                  <div style={{ color: "#172033", fontWeight: "800" }}>
                    {cat.pairingType}
                  </div>
                </div>
              )}
              {cat.earlyVerify && (
                <div>
                  <div
                    style={{
                      color: "#727987",
                      fontWeight: "700",
                      marginBottom: "3px",
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    EARLY VERIFY
                  </div>
                  <div style={{ color: "#172033", fontWeight: "800" }}>
                    {cat.earlyVerify}
                  </div>
                </div>
              )}
              {cat.pairRule && (
                <div>
                  <div
                    style={{
                      color: "#727987",
                      fontWeight: "700",
                      marginBottom: "3px",
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    PAIR RULE
                  </div>
                  <div style={{ color: "#172033", fontWeight: "800" }}>
                    {cat.pairRule}
                  </div>
                </div>
              )}

              <div>
                <div
                  style={{
                    color: "#727987",
                    fontWeight: "700",
                    marginBottom: "3px",
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  ENTRY STATUS
                </div>
                <div style={{ color: "#087b59", fontWeight: "800" }}>
                  {cat.entryStatus}
                </div>
              </div>
            </div>

            {/* Deadline & Enroll Button Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
                borderTop: "1px solid #f1f3f6",
                paddingTop: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#596170",
                  fontWeight: "700",
                }}
              >
                <AccessTimeOutlined
                  style={{ fontSize: 18, color: "#ae1236" }}
                />
                <span>
                  Enrollment Deadline:{" "}
                  <b style={{ color: "#172033" }}>{cat.deadline}</b>
                </span>
              </div>

              <button
                onClick={() => handleEnrollClick(cat.name)}
                style={{
                  background: "#ae1236",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 3px 12px rgba(174, 18, 54, 0.25)",
                  transition: "background 0.2s",
                }}
              >
                {cat.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
