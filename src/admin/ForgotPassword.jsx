import React, { useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import LockResetIcon from "@mui/icons-material/LockReset";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBackToLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Center Card Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "32px 36px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
          boxSizing: "border-box",
        }}
      >
        {/* Top BADMINTON Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#ffffff",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: "800",
              border: "1px solid #e2e8f0",
              letterSpacing: "0.05em",
            }}
          >
            <BoltIcon style={{ fontSize: "14px", color: "#ef4444" }} />
            <span>BADMINTON</span>
          </div>
        </div>

        {/* Reset Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #fee2e2",
            }}
          >
            <LockResetIcon style={{ color: "#dc2626", fontSize: "22px" }} />
          </div>
        </div>

        {/* Header Titles */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "6px",
            }}
          >
            Reset Your Password
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "#64748b",
              lineHeight: "1.5",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Enter your registered admin email address. We will send you a secure
            verification link to reset your master password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "6px",
              }}
            >
              Registered Admin Email Address{" "}
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
                  alignItems: "center",
                }}
              >
                <AlternateEmailIcon style={{ fontSize: "16px" }} />
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
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Hint Note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#64748b",
                marginTop: "6px",
              }}
            >
              <ShieldOutlinedIcon
                style={{ fontSize: "12px", color: "#dc2626" }}
              />
              Must match your authorized BWF Master Admin credentials.
            </div>
          </div>

          {/* Send Recovery Link Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#b91c1c",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              letterSpacing: "0.03em",
              boxShadow: "0 4px 10px rgba(185, 28, 28, 0.2)",
            }}
          >
            <VpnKeyIcon style={{ fontSize: "15px" }} /> SEND RECOVERY LINK
          </button>
        </form>

        {/* Return to Admin Sign In Button */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <button
            type="button"
            onClick={onBackToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#b91c1c",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px",
            }}
          >
            ← Return to Admin Sign In
          </button>
        </div>

        {/* Security Alert Note Card */}
        <div
          style={{
            marginTop: "18px",
            backgroundColor: "#f8fafc",
            border: "1px solid #f1f5f9",
            borderRadius: "10px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <LockOutlinedIcon
            style={{ fontSize: "15px", color: "#64748b", marginTop: "2px" }}
          />
          <p
            style={{
              fontSize: "11px",
              color: "#64748b",
              lineHeight: "1.4",
              margin: "0",
            }}
          >
            For operational security, master reset links expire in 15 minutes
            and can only be authenticated once per cryptographic session.
          </p>
        </div>
      </div>

      {/* Footer Text */}
      <div
        style={{
          textAlign: "center",
          marginTop: "16px",
          fontSize: "11px",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>© 2026 NYX Badminton Admin Management System</span>
        <span>•</span>
        <ShieldOutlinedIcon style={{ fontSize: "11px" }} />
        <span>256-bit SSL Encrypted Administrative Session</span>
      </div>
    </div>
  );
}
