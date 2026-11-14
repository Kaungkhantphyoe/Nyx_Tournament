import React, { useState, useRef } from "react";
import {
  KeyboardArrowDownRounded,
  CalendarMonthRounded,
  ScheduleRounded,
  CheckCircleRounded,
  PlayCircleFilledRounded,
  SportsTennis,
} from "@mui/icons-material";

// Mock Database with Category & Date mapping for dynamic filtering
const matchesDatabase = [
  {
    id: 1,
    category: "Men's Singles (MS)",
    date: "2026-12-06",
    upcoming: {
      player1: {
        name: "Min Thant",
        seed: "[1]",
        org: "Yangon Club • 4,850 PTS",
        avatar: "MT",
      },
      player2: {
        name: "Kyaw Swar",
        seed: "",
        org: "Mandalay Heroes • 3,750 PTS",
        avatar: "KS",
      },
      round: "Round of 16 • Court B",
      time: "02:30 PM",
      countdown: "⏳ In 2h 15m",
    },
    live: [
      {
        court: "COURT A",
        cat: "Men's Singles • Quarter-Final",
        status: "DECIDER SET 3",
        player1: { name: "#8 Aung Myo", org: "YGN", scores: [21, 18, 14] },
        player2: { name: "#2 Zarni Tun", org: "MDY", scores: [19, 21, 12] },
      },
    ],
    fixtures: [
      {
        court: "COURT C",
        round: "Men's Singles • Round of 16",
        time: "03:15 PM MMT • UP NEXT",
        p1: "#5 Htet Aung (SHAN)",
        p2: "#6 Zaw Lin (YGN)",
      },
      {
        court: "COURT A",
        round: "Men's Singles • Round of 16",
        time: "Sat, 04:00 PM • SCHEDULED",
        p1: "#7 Hein Htet (MDY)",
        p2: "Su Su (YGN)",
      },
    ],
    completed: [
      {
        court: "CRT 1",
        round: "Men's Singles • Round of 16",
        status: "✅ FINISHED • Official Result",
        p1: { name: "Min Thant", win: true, scores: [21, 21] },
        p2: { name: "Kyaw Swar", win: false, scores: [18, 15] },
      },
    ],
  },
  {
    id: 2,
    category: "Women's Singles (WS)",
    date: "2026-12-06",

    live: [
      {
        court: "COURT B",
        cat: "Women's Singles • Semi-Final",
        status: "SET 2 IN-PLAY",
        player1: { name: "Hnin Thet", org: "YGN", scores: [21, 15] },
        player2: { name: "Khin Wint", org: "SHAN", scores: [19, 12] },
      },
    ],
    fixtures: [
      {
        court: "COURT B",
        round: "Women's Singles • Quarter-Final",
        time: "04:30 PM MMT • UP NEXT",
        p1: "May Zin (MDY)",
        p2: "Nilar Win (YGN)",
      },
    ],
    completed: [],
  },
  {
    id: 3,
    category: "Men's Doubles (MD)",
    date: "2026-12-06",
    upcoming: null,
    live: [],
    fixtures: [
      {
        court: "COURT D",
        round: "Men's Doubles • Round of 32",
        time: "02:00 PM MMT • UP NEXT",
        p1: "Min Thant & Zarni Tun",
        p2: "Aung Kyaw & Htet Aung",
      },
    ],
    completed: [],
  },
  {
    id: 4,
    category: "Mixed Doubles (XD)",
    date: "2026-12-06",
    upcoming: null,
    live: [],
    fixtures: [],
    completed: [],
  },
];

export default function BracketsSchedule() {
  const [selectedCategory, setSelectedCategory] =
    useState("Men's Singles (MS)");
  const [selectedDate, setSelectedDate] = useState("2026-12-06");
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const dateInputRef = useRef(null);

  const categories = [
    "Men's Singles (MS)",
    "Women's Singles (WS)",
    "Men's Doubles (MD)",
    "Mixed Doubles (XD)",
  ];

  // Find matching data based on selected category & date
  const currentData = matchesDatabase.find(
    (item) => item.category === selectedCategory && item.date === selectedDate,
  ) || { upcoming: null, live: [], fixtures: [], completed: [] };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        width: "100%",
      }}
    >
      {/* Top Filter Bar: Category Dropdown & Match Schedule Calendar Button */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: "16px",
          padding: "18px 24px",
          boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {/* Category Dropdown */}
        <div style={{ position: "relative", minWidth: "240px" }}>
          <button
            onClick={() => setShowCatDropdown((v) => !v)}
            style={{
              width: "100%",
              minHeight: "48px",
              padding: "0 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              background: "#f8f9fa",
              color: "#172033",
              fontWeight: "800",
              fontSize: "14.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
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
                left: 0,
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
                    padding: "12px 14px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      selectedCategory === cat ? "#fde9ee" : "transparent",
                    color: selectedCategory === cat ? "#ae1236" : "#354052",
                    fontWeight: "800",
                    fontSize: "13.5px",
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

        {/* Match Schedule Button with Hidden Calendar Picker */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              dateInputRef.current?.showPicker?.() ||
              dateInputRef.current?.click()
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minHeight: "48px",
              padding: "0 20px",
              border: "none",
              borderRadius: "12px",
              background: "#172033",
              color: "#fff",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(23, 32, 51, 0.2)",
            }}
          >
            <CalendarMonthRounded style={{ fontSize: 20, color: "#ff3366" }} />
            <span>Match Schedule </span>
          </button>

          <input
            ref={dateInputRef}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              bottom: 0,
              left: 0,
            }}
          />
        </div>
      </div>

      {/* Your Upcoming Match Card */}
      {currentData.upcoming ? (
        <div
          style={{
            background: "linear-gradient(135deg, #fff5f7 0%, #fff 100%)",
            border: "1px solid #f8d7da",
            borderRadius: "16px",
            padding: "22px 24px",
            boxShadow: "0 4px 16px rgba(174, 18, 54, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "125px",
                fontWeight: "900",
                color: "#ae1236",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                letterSpacing: "0.5px",
                fontSize: "12px",
              }}
            >
              <PlayCircleFilledRounded fontSize="small" /> YOUR UPCOMING MATCH •{" "}
              {currentData.upcoming.round}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "800",
                color: "#b45309",
                background: "#fef3c7",
                padding: "4px 10px",
                borderRadius: "8px",
              }}
            >
              {currentData.upcoming.countdown}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "18px 22px",
              borderRadius: "14px",
              border: "1px solid #f1f3f6",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: "900",
                fontSize: "15px",
                color: "#172033",
              }}
            >
              <span
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#faebd7",
                  color: "#b8860b",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "13px",
                }}
              >
                {currentData.upcoming.player1.avatar}
              </span>
              <div>
                {currentData.upcoming.player1.name}{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#727987",
                    fontWeight: "700",
                  }}
                >
                  {currentData.upcoming.player1.seed}
                </span>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "#727987",
                    fontWeight: "700",
                  }}
                >
                  {currentData.upcoming.player1.org}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "13.5px",
                fontWeight: "900",
                color: "#727987",
                background: "#f1f3f6",
                padding: "8px 16px",
                borderRadius: "10px",
              }}
            >
              {currentData.upcoming.time}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: "900",
                fontSize: "15px",
                color: "#172033",
                textAlign: "right",
              }}
            >
              <div>
                {currentData.upcoming.player2.name}{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#727987",
                    fontWeight: "700",
                  }}
                >
                  {currentData.upcoming.player2.seed}
                </span>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "#727987",
                    fontWeight: "700",
                  }}
                >
                  {currentData.upcoming.player2.org}
                </div>
              </div>
              <span
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#eef0f3",
                  color: "#354052",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "13px",
                }}
              >
                {currentData.upcoming.player2.avatar}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            border: "1px solid #eef0f3",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
            color: "#727987",
            fontSize: "13.5px",
            fontWeight: "700",
          }}
        >
          No upcoming personal matches enrolled for {selectedCategory} on{" "}
          {selectedDate}.
        </div>
      )}

      {/* Live Matches Now (Dynamic Active Court Count) */}
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
          <h4
            style={{
              fontSize: "16.5px",
              fontWeight: "900",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#dc2626",
                display: "inline-block",
              }}
            />
            Live Matches Now{" "}
            <span
              style={{ fontSize: "12px", color: "#727987", fontWeight: "700" }}
            >
              • Court In-Play
            </span>
          </h4>
          <span
            style={{
              fontSize: "11.5px",
              fontWeight: "900",
              color: "#dc2626",
              background: "#fde9ee",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            {currentData.live.length} ACTIVE COURT
            {currentData.live.length > 1 ? "S" : ""}
          </span>
        </div>

        {currentData.live.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {currentData.live.map((match, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#172033",
                    color: "#fff",
                    padding: "10px 18px",
                    fontSize: "12px",
                    fontWeight: "900",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {match.court} • {match.cat}
                  </span>
                  <span style={{ color: "#fca5a5" }}>🔴 {match.status}</span>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontWeight: "900",
                      fontSize: "15px",
                      color: "#172033",
                    }}
                  >
                    <div>
                      {match.player1.name}{" "}
                      <span style={{ fontSize: "12px", color: "#727987" }}>
                        {match.player1.org}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        color: "#475569",
                        fontSize: "16px",
                      }}
                    >
                      {match.player1.scores.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            color: i === 2 ? "#ae1236" : "inherit",
                            fontWeight: i === 2 ? "900" : "700",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontWeight: "900",
                      fontSize: "15px",
                      color: "#172033",
                    }}
                  >
                    <div>
                      {match.player2.name}{" "}
                      <span style={{ fontSize: "12px", color: "#727987" }}>
                        {match.player2.org}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        color: "#475569",
                        fontSize: "16px",
                      }}
                    >
                      {match.player2.scores.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            color: i === 2 ? "#172033" : "inherit",
                            fontWeight: i === 2 ? "900" : "700",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "12px",
              color: "#727987",
              fontSize: "13.5px",
              fontWeight: "700",
            }}
          >
            No live matches currently in-play for {selectedCategory} on this
            date.
          </div>
        )}
      </div>

      {/* Order of Play & Fixtures */}
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
          <h4
            style={{
              fontSize: "16.5px",
              fontWeight: "900",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ScheduleRounded style={{ fontSize: 20, color: "#ae1236" }} /> Order
            of Play & Fixtures ({selectedDate})
          </h4>
          <span
            style={{ fontSize: "12px", fontWeight: "800", color: "#727987" }}
          >
            {currentData.fixtures.length} Scheduled
          </span>
        </div>

        {currentData.fixtures.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {currentData.fixtures.map((fix, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #eef0f3",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  background: "#f8f9fa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "8px",
                  }}
                >
                  <span>
                    {fix.court} • {fix.round}
                  </span>
                  <span
                    style={{
                      color: fix.time.includes("UP NEXT")
                        ? "#087b59"
                        : "inherit",
                    }}
                  >
                    {fix.time}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "14.5px",
                    fontWeight: "900",
                    color: "#172033",
                  }}
                >
                  <div>{fix.p1}</div>
                  <div>{fix.p2}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "12px",
              color: "#727987",
              fontSize: "13.5px",
              fontWeight: "700",
            }}
          >
            No scheduled fixtures found for {selectedCategory} on {selectedDate}
            .
          </div>
        )}
      </div>

      {/* Completed Matches */}
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
          <h4
            style={{
              fontSize: "16.5px",
              fontWeight: "900",
              color: "#172033",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CheckCircleRounded style={{ fontSize: 20, color: "#087b59" }} />{" "}
            Completed Matches
          </h4>
          <span
            style={{ fontSize: "12px", fontWeight: "800", color: "#727987" }}
          >
            Official Scored
          </span>
        </div>

        {currentData.completed.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {currentData.completed.map((comp, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #eef0f3",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "8px",
                  }}
                >
                  <span>
                    {comp.court} • {comp.round}
                  </span>
                  <span style={{ color: "#596170" }}>{comp.status}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14.5px",
                    fontWeight: "900",
                    color: "#172033",
                    marginBottom: "6px",
                  }}
                >
                  <div>
                    {comp.p1.name}{" "}
                    {comp.p1.win && (
                      <span
                        style={{
                          background: "#e4f7ef",
                          color: "#087b59",
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          marginLeft: "6px",
                        }}
                      >
                        WINNER
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {comp.p1.scores.map((sc, i) => (
                      <span key={i}>{sc}</span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14.5px",
                    fontWeight: "800",
                    color: "#727987",
                  }}
                >
                  <div>{comp.p2.name}</div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {comp.p2.scores.map((sc, i) => (
                      <span key={i}>{sc}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "#f8f9fa",
              borderRadius: "12px",
              color: "#727987",
              fontSize: "13.5px",
              fontWeight: "700",
            }}
          >
            No completed matches found for {selectedCategory} on this date.
          </div>
        )}
      </div>
    </div>
  );
}
