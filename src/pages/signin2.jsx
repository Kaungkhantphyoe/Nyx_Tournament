import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CloudUploadRounded,
  CheckCircleRounded,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ArrowForwardRounded,
  ArrowBackRounded,
  WarningRounded,
} from "@mui/icons-material";

export default function Signin2() {
  const navigate = useNavigate();

  // ID Photos & Preview States
  const [frontFile, setFrontFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);

  const [backFile, setBackFile] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  // Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Terms Agreement State
  const [agreed, setAgreed] = useState(false);

  // Handlers for File Uploads & Previews
  const handleFrontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontFile(file.name);
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleBackUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackFile(file.name);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  // Password Match Check
  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;
  const isPasswordValid = newPassword.length >= 8 && passwordsMatch;

  // Form Validation
  const isFormValid =
    frontFile !== null && backFile !== null && isPasswordValid && agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/signin-3");
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
            Step 2 of 3: ID Verification & Account Security
          </p>
        </div>

        {/* Progress Bar & Stages (အပေါ်က အတုံးလေးများကို ပိုကြီးစေရန် padding/font ချိန်ညှိထားသည်) */}
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
            <span>Profile & Security Setup</span>
            <span style={{ color: "#ae1236" }}>70% Completed</span>
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
                width: "70%",
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
                background: "#ae1236",
                color: "#fff",
                padding: "16px 20px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "900",
              }}
            >
              2. ID Verification <br />
              <span
                style={{ fontSize: "11px", fontWeight: "700", opacity: 0.9 }}
              >
                Active Stage
              </span>
            </div>
            <div
              style={{
                background: "#f8f9fa",
                color: "#94a3b8",
                border: "1px solid #e2e8f0",
                padding: "16px 20px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "800",
              }}
            >
              3. Email OTP <br />
              <span style={{ fontSize: "11px", fontWeight: "700" }}>
                Up Next
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* 3. Birth Date / National ID Photo Verification */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "26px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
            }}
          >
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 6px",
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
              3. Birth Date / National ID Photo Verification
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#727987",
                margin: "0 0 20px",
                fontWeight: "600",
              }}
            >
              Please upload clear photos of your ID or Birth Certificate for
              official BWF sanctioned age group placement.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {/* Front Side Photo */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    fontWeight: "800",
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  Front Side Photo <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: frontFile
                      ? "2px solid #21865b"
                      : "2px dashed #cbd5e1",
                    borderRadius: "12px",
                    padding: "20px",
                    background: frontFile ? "#e7f7ee" : "#f8f9fa",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                    minHeight: "140px",
                  }}
                >
                  {frontPreview ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <img
                        src={frontPreview}
                        alt="Front ID Preview"
                        style={{
                          width: "100%",
                          maxHeight: "90px",
                          objectFit: "contain",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#21865b",
                        }}
                      >
                        ✔ {frontFile} (Click to change)
                      </span>
                    </div>
                  ) : (
                    <>
                      <CloudUploadRounded
                        style={{ fontSize: 36, color: "#ae1236" }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "13.5px",
                            fontWeight: "900",
                            color: "#172033",
                          }}
                        >
                          Tap or Drag Front ID
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#727987",
                            fontWeight: "600",
                            marginTop: "3px",
                          }}
                        >
                          JPG, PNG or PDF (Max 8MB)
                        </div>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={handleFrontUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Back Side Photo */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    fontWeight: "800",
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  Back Side Photo <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: backFile
                      ? "2px solid #21865b"
                      : "2px dashed #cbd5e1",
                    borderRadius: "12px",
                    padding: "20px",
                    background: backFile ? "#e7f7ee" : "#f8f9fa",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                    minHeight: "140px",
                  }}
                >
                  {backPreview ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <img
                        src={backPreview}
                        alt="Back ID Preview"
                        style={{
                          width: "100%",
                          maxHeight: "90px",
                          objectFit: "contain",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#21865b",
                        }}
                      >
                        ✔ {backFile} (Click to change)
                      </span>
                    </div>
                  ) : (
                    <>
                      <CloudUploadRounded
                        style={{ fontSize: 36, color: "#ae1236" }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "13.5px",
                            fontWeight: "900",
                            color: "#172033",
                          }}
                        >
                          Tap or Drag Back ID
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#727987",
                            fontWeight: "600",
                            marginTop: "3px",
                          }}
                        >
                          JPG, PNG or PDF (Max 8MB)
                        </div>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={handleBackUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>

            {/* Document Guidelines Notice */}
            <div
              style={{
                marginTop: "16px",
                background: "#fff5f7",
                border: "1px solid #f8d7da",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "12px",
                color: "#991b1b",
                fontWeight: "700",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <WarningRounded
                style={{ fontSize: 18, flexShrink: 0, marginTop: "1px" }}
              />
              <div>
                <b>Document Guidelines:</b> Ensure all 4 outer corners are
                distinctly captured without glare or blur. Official registration
                name, date of birth, and issuing authority seal must be legible
                for official NYX sanctioned qualification.
              </div>
            </div>
          </div>

          {/* 4. Create Account Security Password */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "26px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
            }}
          >
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 6px",
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
              4. Create Account Security Password
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#727987",
                margin: "0 0 20px",
                fontWeight: "600",
              }}
            >
              Set up credentials to securely sign in, verify official live match
              draws, acknowledge umpire scores, and download player badge
              passes.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {/* New Password */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    fontWeight: "800",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  New Password <span style={{ color: "#ef4444" }}>*</span>
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
                      left: "14px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <LockOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter secure password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 40px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
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
                    {showPassword ? (
                      <VisibilityOffOutlined style={{ fontSize: "20px" }} />
                    ) : (
                      <VisibilityOutlined style={{ fontSize: "20px" }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    fontWeight: "800",
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Confirm Password <span style={{ color: "#ef4444" }}>*</span>
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
                      left: "14px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <LockOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 40px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border:
                        confirmPassword.length > 0 && !passwordsMatch
                          ? "2px solid #ef4444"
                          : "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? (
                      <VisibilityOffOutlined style={{ fontSize: "20px" }} />
                    ) : (
                      <VisibilityOutlined style={{ fontSize: "20px" }} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* In-field Password Alerts */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "12px",
                flexWrap: "wrap",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              <span
                style={{
                  color: newPassword.length >= 8 ? "#21865b" : "#64748b",
                }}
              >
                {newPassword.length >= 8 ? "✔" : "•"} Minimum 8 characters
              </span>
              <span
                style={{
                  color:
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? "#21865b"
                        : "#ef4444"
                      : "#64748b",
                }}
              >
                {confirmPassword.length > 0
                  ? passwordsMatch
                    ? "✔ Passwords match perfectly"
                    : "✖ Passwords do not match"
                  : "• Passwords must match"}
              </span>
            </div>
          </div>

          {/* Terms and Conditions Agreement */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#ae1236",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#334155",
                  fontWeight: "700",
                  lineHeight: "1.5",
                }}
              >
                I agree to NYX Badminton Rules, Anti-Doping Regulations, and
                Terms of Service.
                <span
                  style={{
                    display: "block",
                    fontSize: "11.5px",
                    color: "#64748b",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  By submitting this registration, you officially certify that
                  the submitted personal age, birth certificates, and national
                  documents are authentic and unmodified. False declarations
                  lead to immediate tournament forfeiture and ranking
                  disqualification.
                </span>
              </span>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => navigate("/signin-1")}
              style={{
                background: "#f1f5f9",
                color: "#334155",
                border: "1px solid #cbd5e1",
                borderRadius: "12px",
                padding: "0 24px",
                minHeight: "56px",
                fontSize: "14px",
                fontWeight: "900",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ArrowBackRounded style={{ fontSize: 18 }} /> Back to Step 1
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                flex: 1,
                background: isFormValid ? "#ae1236" : "#cbd5e1",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                minHeight: "56px",
                fontSize: "14px",
                fontWeight: "900",
                cursor: isFormValid ? "pointer" : "not-allowed",
                boxShadow: isFormValid
                  ? "0 4px 16px rgba(174, 18, 54, 0.3)"
                  : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s",
              }}
            >
              STAGE 3: EMAIL VERIFICATION{" "}
              <ArrowForwardRounded style={{ fontSize: 20 }} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
