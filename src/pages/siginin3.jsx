import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MarkEmailReadOutlined,
  ArrowForwardRounded,
  ArrowBackRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

export default function Signin3() {
  const navigate = useNavigate();

  // 6-Digit OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // 3 Minutes Countdown Timer State (180 seconds)
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handle Resend OTP
  const handleResend = () => {
    setTimeLeft(180);
    setOtp(["", "", "", "", "", ""]);
    alert("New verification code has been sent to your email!");
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Handle Input Change for each OTP digit
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpComplete) {
      navigate("/");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "24px 20px 60px",
        background: "#f7f8fa",
        color: "#172033",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Responsive Style for Buttons on Smaller Screens */}
      <style>{`
        @media (max-width: 640px) {
          .nyx-bottom-btn {
            font-size: 11.5px !important;
            padding: 12px 14px !important;
            min-height: 48px !important;
          }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header Title */}
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "900",
              color: "#172033",
              margin: "0 0 6px",
            }}
          >
            Athlete Registration Portal
          </h1>
          <p
            style={{
              fontSize: "14.5px",
              color: "#596170",
              margin: 0,
              fontWeight: "600",
            }}
          >
            Step 3 of 3: Email OTP Verification & Account Activation
          </p>
        </div>
        {/* Progress Bar & Stages */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eef0f3",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              fontWeight: "800",
              color: "#64748b",
            }}
          >
            <span>Portal Validation Pipeline</span>
            <span style={{ color: "#ae1236" }}>100% Completed</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "7px",
              background: "#f1f5f9",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#ae1236",
                borderRadius: "4px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "12px",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                background: "#f8f9fa",
                color: "#21865b",
                border: "1px solid #21865b",
                padding: "16px 20px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "900",
              }}
            >
              1. Personal & Categories <br />
              <span style={{ fontSize: "11px", fontWeight: "700" }}>
                Completed & Locked
              </span>
            </div>
            <div
              style={{
                background: "#f8f9fa",
                color: "#21865b",
                border: "1px solid #21865b",
                padding: "16px 20px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "900",
              }}
            >
              2. ID Verification <br />
              <span style={{ fontSize: "11px", fontWeight: "700" }}>
                Documents Ready
              </span>
            </div>
            <div
              style={{
                background: "#ae1236",
                color: "#fff",
                padding: "16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "900",
              }}
            >
              3. Email OTP <br />
              <span
                style={{ fontSize: "11px", fontWeight: "700", opacity: 0.9 }}
              >
                Active Final Stage
              </span>
            </div>
          </div>
        </div>
        ;
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* 5. Verify Your Email Address */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "32px 26px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
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
                <span
                  style={{
                    background: "#ae1236",
                    color: "#fff",
                    width: "6px",
                    height: "18px",
                    borderRadius: "3px",
                    display: "inline-block",
                  }}
                ></span>
                5. Verify Your Email Address
              </h3>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: "800",
                  color: "#475569",
                  background: "#f1f5f9",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                SECURITY CHECK
              </span>
            </div>

            {/* Icon Graphic */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#fff5f7",
                color: "#ae1236",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
                border: "1px solid #f8d7da",
              }}
            >
              <MarkEmailReadOutlined style={{ fontSize: 36 }} />
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                maxWidth: "480px",
                margin: "0 auto 24px",
                lineHeight: "1.5",
                fontWeight: "600",
              }}
            >
              We have sent a 6-digit one-time verification passcode (OTP) to
              your registered athlete email address.
            </p>

            {/* 6-Digit OTP Inputs */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: "48px",
                    height: "56px",
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "900",
                    color: "#0f172a",
                    backgroundColor: "#f8fafc",
                    border: digit ? "2px solid #ae1236" : "1px solid #cbd5e1",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
              ))}
            </div>

            {/* Live Countdown Timer */}
            <div
              style={{
                fontSize: "13.5px",
                color: "#64748b",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              ⏳ Code expires in:{" "}
              <span
                style={{
                  color: timeLeft > 0 ? "#ae1236" : "#dc2626",
                  fontWeight: "900",
                }}
              >
                {timeLeft > 0
                  ? formatTime(timeLeft)
                  : "Expired! Please resend code."}
              </span>
            </div>

            <div
              style={{ fontSize: "13px", color: "#475569", fontWeight: "600" }}
            >
              Didn't receive the code? Check spam or{" "}
              <button
                type="button"
                onClick={handleResend}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ae1236",
                  fontWeight: "900",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "13px",
                  textDecoration: "underline",
                }}
              >
                Resend OTP Code
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => navigate("/signin-2")}
              className="nyx-bottom-btn"
              style={{
                background: "#f1f5f9",
                color: "#334155",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                padding: "0 20px",
                minHeight: "56px",
                fontSize: "13.5px",
                fontWeight: "900",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              <ArrowBackRounded style={{ fontSize: 18 }} /> Back to Step 2
            </button>

            <button
              type="submit"
              disabled={!isOtpComplete}
              className="nyx-bottom-btn"
              style={{
                flex: 1,
                background: isOtpComplete ? "#ae1236" : "#cbd5e1",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                minHeight: "56px",
                fontSize: "14px",
                fontWeight: "900",
                cursor: isOtpComplete ? "pointer" : "not-allowed",
                boxShadow: isOtpComplete
                  ? "0 4px 16px rgba(174, 18, 54, 0.3)"
                  : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <CheckCircleRounded style={{ fontSize: 18 }} /> VERIFY & COMPLETE{" "}
              <ArrowForwardRounded style={{ fontSize: 18 }} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
