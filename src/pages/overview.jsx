import React from "react";
import {
  InfoOutlined,
  EmojiEventsOutlined,
  FormatListNumberedOutlined,
  LocationOnOutlined,
  EmojiEvents,
  MilitaryTech,
  WorkspacePremium,
  Star,
  RadioButtonChecked,
} from "@mui/icons-material";

export default function Overview({ tournament }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      {/* Tournament Overview & Official Rules */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "800",
            color: "#172033",
            margin: "0 0 12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InfoOutlined style={{ fontSize: 22, color: "#ae1236" }} /> Tournament
          Overview & Official Rules
        </h3>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.75",
            color: "#4b5563",
            margin: "0 0 20px",
          }}
        >
          {tournament.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              num: "01",
              title: "Tournament Format",
              desc: "Single elimination knockout system across all designated categories (MS, WS, MD, XD).",
            },
            {
              num: "02",
              title: "Match Scoring Rules",
              desc: "Best of 3 sets to 21 rally points. Golden point tie-breaker rule applies at 20-all capped at 30.",
            },
            {
              num: "03",
              title: "Official Equipment",
              desc: "Tournament shuttle: Yonex AS-30 Feather; BWF Grade 1 Synthetic Rubber Mats (Court 1-6).",
            },
            {
              num: "04",
              title: "Dress Code Standard",
              desc: "Standard BWF sports attire mandatory. Non-marking gum rubber court soles strictly enforced.",
            },
          ].map((rule, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "14px",
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #edf0f3",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "#fde9ee",
                  color: "#ae1236",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "800",
                  flexShrink: 0,
                }}
              >
                {rule.num}
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 4px",
                    fontSize: "14px",
                    fontWeight: "800",
                    color: "#172033",
                  }}
                >
                  {rule.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12.5px",
                    color: "#6b7280",
                    lineHeight: "1.5",
                  }}
                >
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Points Allocation */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <EmojiEventsOutlined style={{ fontSize: 22, color: "#ae1236" }} />{" "}
            Leaderboard Points Allocation
          </h3>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#596170",
              background: "#f1f3f6",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            Pure Ranking Points • No Monetary Purse
          </span>
        </div>
        <div style={{ height: "14px" }} />

        {[
          {
            rank: "Champion",
            desc: "Tournament Trophy + Gold Medallion",
            pts: "1,000 PTS",
            icon: <EmojiEvents style={{ color: "#d97706", fontSize: 20 }} />,
          },
          {
            rank: "Runner-up",
            desc: "Finalist Silver Medallion",
            pts: "700 PTS",
            icon: <MilitaryTech style={{ color: "#64748b", fontSize: 20 }} />,
          },
          {
            rank: "Semi-Finalists (3rd & 4th)",
            desc: "Bronze Medallion Placements",
            pts: "400 PTS",
            icon: (
              <WorkspacePremium style={{ color: "#b45309", fontSize: 20 }} />
            ),
          },
          {
            rank: "Quarter-Finalists",
            desc: "Top 8 Bracket Finish",
            pts: "200 PTS",
            icon: <Star style={{ color: "#475569", fontSize: 18 }} />,
          },
          {
            rank: "Round of 16",
            desc: "Stage 1 Progression",
            pts: "100 PTS",
            icon: (
              <RadioButtonChecked style={{ color: "#0284c7", fontSize: 16 }} />
            ),
          },
          {
            rank: "Participation Points",
            desc: "Verified Tournament Check-in",
            pts: "50 PTS",
            icon: (
              <RadioButtonChecked style={{ color: "#0d9488", fontSize: 16 }} />
            ),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: idx === 5 ? "none" : "1px solid #f1f3f6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "14.5px",
                fontWeight: "700",
                color: "#172033",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                {item.icon}
              </span>
              {item.rank}{" "}
              <span
                style={{
                  fontSize: "13px",
                  color: "#727987",
                  fontWeight: "500",
                }}
              >
                {item.desc}
              </span>
            </div>
            <div
              style={{
                fontSize: "15.5px",
                fontWeight: "900",
                color: "#ae1236",
              }}
            >
              {item.pts}
            </div>
          </div>
        ))}
      </div>

      {/* Included Categories & Draw Caps */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
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
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormatListNumberedOutlined
              style={{ fontSize: 22, color: "#ae1236" }}
            />{" "}
            Included Categories & Draw Caps
          </h3>
          <span
            style={{ fontSize: "12px", fontWeight: "800", color: "#727987" }}
          >
            4 Events Active
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              title: "Men's Singles",
              code: "MS",
              sub: "Individual Knockout • Single Player",
            },
            {
              title: "Women's Singles",
              code: "WS",
              sub: "Individual Knockout • Single Player",
            },
            {
              title: "Men's Doubles",
              code: "MD",
              sub: "Pairs Knockout • Two Players per Team",
            },
            {
              title: "Mixed Doubles",
              code: "XD",
              sub: "Male + Female Tandem • Knockout",
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8f9fa",
                border: "1px solid #eef0f3",
                borderRadius: "12px",
                padding: "18px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    background: "#172033",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "800",
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {cat.code}
                </span>
                <span
                  style={{
                    background: "#fde9ee",
                    color: "#ae1236",
                    fontSize: "11px",
                    fontWeight: "800",
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {cat.left}
                </span>
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#172033",
                  margin: "0 0 4px",
                }}
              >
                {cat.title}
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                {cat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Location Address */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "800",
            color: "#172033",
            margin: "0 0 10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LocationOnOutlined style={{ fontSize: 22, color: "#ae1236" }} />{" "}
          Location Address
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "14.5px",
            color: "#4b5563",
            fontWeight: "600",
          }}
        >
          {tournament.court}
        </p>
      </div>
    </div>
  );
}
