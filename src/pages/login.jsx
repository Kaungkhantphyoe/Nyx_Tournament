import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import BackgroundImg from "../assets/Background.png";

export default function Login({ onForgotPassword }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (email.toLowerCase() === "admin@nyxbadminton.com") {
        // Admin authentication
        localStorage.setItem("nyx_auth", "true");
        navigate("/admin/overview");
      } else {
        navigate("/");
      }
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
        {/* Left Side: Image Panel (Hidden on screens smaller than 768px / mobile & tablet) */}
        <div
          className="login-image-panel"
          style={{
            width: "50%",
            position: "relative",
            backgroundColor: "#0f172a",
          }}
        >
          <img
            src={BackgroundImg}
            alt="Login Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Right Side: Sign In Form */}
        <div
          style={{
            flex: "1",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            minWidth: "300px",
          }}
        >
          <div>
            {/* Portal Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#fff1f2",
                color: "#be123c",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                marginBottom: "20px",
                border: "1px solid #ffe4e6",
              }}
            >
              <LockOutlinedIcon style={{ fontSize: "13px" }} />
              NYX BADMINTON PORTAL • MEMBER & ADMIN
            </div>

            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "6px",
              }}
            >
              Sign In to Your Account
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "24px",
                lineHeight: "1.4",
              }}
            >
              Enter your credentials to access tournament enrollments, match
              brackets, or administrative dashboard controls.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Email Field */}
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
                  Email Address / Username{" "}
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
                    type="text"
                    required
                    placeholder="admin@nyxbadminton.com or user email"
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

              {/* Password Field */}
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
                  Password <span style={{ color: "#ef4444" }}>*</span>
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
                      accentColor: "#be123c",
                      cursor: "pointer",
                    }}
                  />
                  Keep me logged in
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  style={{
                    color: "#be123c",
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

              {/* Login Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#be123c",
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
                  boxShadow: "0 4px 6px -1px rgba(190, 18, 60, 0.2)",
                }}
              >
                <span>➜</span> LOGIN TO PORTAL
              </button>
            </form>

            {/* Sign Up / Register Link Section */}
            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin-1")}
                style={{
                  color: "#be123c",
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "0",
                  fontSize: "12px",
                }}
              >
                Sign Up / Register
              </button>
            </div>
          </div>

          {/* Footer Security Note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "11px",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <SecurityIcon style={{ fontSize: "13px" }} />
            Secure Encrypted Authentication Session
          </div>
        </div>
      </div>

      {/* Responsive media query to hide image panel on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .login-image-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
