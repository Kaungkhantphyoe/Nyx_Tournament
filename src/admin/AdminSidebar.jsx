import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LogoImg from "../assets/hero.png"; // သင်၏ project folder structure အတိုင်း path ကို ချိန်ပါ

export default function AdminSidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      path: "/admin/overview",
      icon: <DashboardIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "tournament",
      label: "Tournament",
      path: "/admin/tournament",
      icon: <EmojiEventsIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "enrollments",
      label: "Enrollments",
      path: "/admin/enrollments",
      icon: <GroupOutlinedIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "matches",
      label: "Matches",
      path: "/admin/matches",
      icon: <SportsTennisIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "players",
      label: "Players",
      path: "/admin/players",
      icon: <PersonOutlineIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "ranking",
      label: "Ranking",
      path: "/admin/ranking",
      icon: <LeaderboardIcon style={{ fontSize: "22px" }} />,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/admin/settings",
      icon: <SettingsOutlinedIcon style={{ fontSize: "22px" }} />,
    },
  ];

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "270px",
        backgroundColor: "#070b19",
        color: "#94a3b8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #1e293b",
        flexShrink: "0",
        minHeight: "100vh",
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          style={{
            padding: "22px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <img
            src={LogoImg}
            alt="NYX Logo"
            style={{ height: "26px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "0.05em",
                lineHeight: "1.2",
              }}
            >
              ADMIN PANEL
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#778598",
                letterSpacing: "0.05em",
              }}
            >
              TOURNAMENT
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div
          style={{
            padding: "20px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.id === "tournament" &&
                location.pathname.startsWith("/admin/tournament")) ||
              (item.id === "players" &&
                location.pathname.startsWith("/admin/players"));

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 18px",
                  backgroundColor: isActive ? "#0f172a" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: isActive ? "700" : "500",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  borderRight: isActive
                    ? "4px solid #dc2626"
                    : "4px solid transparent",
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#ef4444" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile Footer */}
      <div
        style={{
          padding: "18px 20px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#050814",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#dc2626",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
              flexShrink: "0",
              boxShadow: "0 2px 6px rgba(220,38,38,0.4)",
            }}
          >
            H
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#ffffff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.02em",
              }}
            >
              Hein Min Aung
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "500",
                color: "#94a3b8",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              nyx@gmail.com
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogoutClick}
          title="Logout"
          style={{
            background: "transparent",
            border: "1px solid #1e293b",
            color: "#94a3b8",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <LogoutOutlinedIcon style={{ fontSize: "18px" }} />
        </button>
      </div>
    </div>
  );
}
