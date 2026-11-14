import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import BackgroundImg from "../assets/Background.png";

export default function Login({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Main Card Container */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
        }}
      >
        {/* Left Side: Image Panel */}
        <div
          style={{
            width: "50%",
            position: "relative",
            backgroundColor: "#0f172a",
          }}
        >
          <img
            src={BackgroundImg}
            alt="Admin Login Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Right Side: Admin Sign In Form */}
        <div
          style={{
            width: "50%",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
          }}
        >
          <div>
            {/* Restricted Area Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#fef2f2",
                color: "#991b1b",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                marginBottom: "20px",
                border: "1px solid #fee2e2",
              }}
            >
              <LockOutlinedIcon style={{ fontSize: "13px" }} />
              RESTRICTED ADMIN AREA
            </div>

            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "6px",
              }}
            >
              Admin Portal Sign In
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "24px",
                lineHeight: "1.4",
              }}
            >
              Enter your authorized administrator credentials to manage courts,
              brackets, and broadcast feeds.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Username/Email Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Username or Email Address{" "}
                  <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <EmailOutlinedIcon style={{ fontSize: "18px" }} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="admin@nyxbadminton.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Master Password Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Master Password <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <VpnKeyOutlinedIcon style={{ fontSize: "18px" }} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 36px 10px 38px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <VisibilityOutlinedIcon style={{ fontSize: "18px" }} />
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      width: "14px",
                      height: "14px",
                      accentColor: "#dc2626",
                      cursor: "pointer",
                    }}
                  />
                  Keep me logged in
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  style={{
                    color: "#dc2626",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                    padding: "0",
                    fontSize: "12px",
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#b91c1c",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 6px -1px rgba(185, 28, 28, 0.2)",
                }}
              >
                <span>➜</span> SIGN IN TO ADMIN PANEL
              </button>
            </form>
          </div>

          {/* Footer Security Note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontSize: "11px",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <SecurityIcon style={{ fontSize: "13px" }} />
            Encrypted & SSL Secured Administrator Session
          </div>
        </div>
      </div>
    </div>
  );
}
