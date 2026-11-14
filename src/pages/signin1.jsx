import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PersonOutlined,
  PhoneOutlined,
  EmailOutlined,
  SportsTennisOutlined,
  LocationOnOutlined,
  ArrowForwardRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

export default function Signin1() {
  const navigate = useNavigate();

  // Personal Info State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    club: "",
    address: "",
  });

  // Categories State (Max 3 allowed)
  const [selectedCategories, setSelectedCategories] = useState([]);

  const availableCategories = [
    "U-13 Singles",
    "U-13 Doubles",
    "U-15 Singles",
    "U-17 Doubles",
    "U-17 Singles",
    "Men's Open Singles",
    "Men's Open Doubles",
    "U-15 Doubles",
    "Mixed Doubles",
    "Women's Open Singles",
    "Women's Open Doubles",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  // Validation: All personal info filled & at least 1 category selected
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.club.trim() !== "" &&
    formData.address.trim() !== "" &&
    selectedCategories.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/signin-2");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "10px 20px 60px",
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
            Step 1 of 3: Personal Details & Playing Categories
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
            <span>Profile & Categories Setup</span>
            <span style={{ color: "#ae1236" }}>35% Completed</span>
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
                width: "35%",
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
                background: "#ae1236",
                color: "#fff",
                padding: "16px 20px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "900",
              }}
            >
              1. Personal & Categories <br />
              <span style={{ fontSize: "10px", opacity: 0.85 }}>
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
              2. ID Verification <br />
              <span style={{ fontSize: "10px" }}>Up Next</span>
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
              <span style={{ fontSize: "10px" }}>Up Next</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* 1. Personal Information & Club Details */}
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
              1. Personal Information & Club Details
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#727987",
                margin: "0 0 20px",
                fontWeight: "600",
              }}
            >
              Required for official tournament seedings, draw schedules, and
              player IDs.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {/* Full Name */}
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
                  Full Name <span style={{ color: "#ef4444" }}>*</span>
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
                    <PersonOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g., Min Thant"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Phone Number */}
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
                  Phone Number <span style={{ color: "#ef4444" }}>*</span>
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
                    <PhoneOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g., +95 9 450 123 789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Email Address */}
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
                  Email Address <span style={{ color: "#ef4444" }}>*</span>
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
                    <EmailOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g., minthant@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Primary Club / Team Name */}
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
                  Primary Club / Team Name{" "}
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
                      left: "14px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    <SportsTennisOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <input
                    type="text"
                    name="club"
                    required
                    placeholder="e.g., Yangon Badminton Club"
                    value={formData.club}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Full Address */}
            <div style={{ marginTop: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12.5px",
                  fontWeight: "800",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Full Address <span style={{ color: "#ef4444" }}>*</span>
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
                  <LocationOnOutlined style={{ fontSize: "20px" }} />
                </span>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Street, Township, Region (e.g., No. 45, Pyay Road, Mayangone, Yangon)"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Select Your Playing Categories */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "16px",
              padding: "26px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
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
                  2. Select Your Playing Categories
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#727987",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Select the event categories you intend to register & compete
                  in for this season.
                </p>
              </div>

              <span
                style={{
                  background:
                    selectedCategories.length === 3 ? "#fee2e2" : "#f1f5f9",
                  color:
                    selectedCategories.length === 3 ? "#991b1b" : "#475569",
                  fontSize: "12.5px",
                  fontWeight: "800",
                  padding: "6px 14px",
                  borderRadius: "8px",
                }}
              >
                Selected: {selectedCategories.length}/3 Maximum Allowed
              </span>
            </div>

            {/* Categories Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              {availableCategories.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                const isDisabled =
                  !isSelected && selectedCategories.length >= 3;

                return (
                  <div
                    key={cat}
                    onClick={() => !isDisabled && toggleCategory(cat)}
                    style={{
                      border: isSelected
                        ? "2px solid #ae1236"
                        : "1px solid #e2e8f0",
                      background: isSelected
                        ? "#fff5f7"
                        : isDisabled
                          ? "#f1f5f9"
                          : "#f8f9fa",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: isDisabled ? 0.6 : 1,
                      transition: "all 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "800",
                        fontSize: "13.5px",
                        color: "#172033",
                      }}
                    >
                      {cat}
                    </span>
                    {isSelected ? (
                      <CheckCircleRounded
                        style={{ fontSize: 20, color: "#ae1236" }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#94a3b8",
                          background: "#e2e8f0",
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        SELECT
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              background: isFormValid ? "#ae1236" : "#cbd5e1",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              minHeight: "56px",
              fontSize: "15px",
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
            CONTINUE TO STEP 2: ID VERIFICATION & SECURITY{" "}
            <ArrowForwardRounded style={{ fontSize: 20 }} />
          </button>

          {/* Already have an account */}
          <div
            style={{
              textAlign: "center",
              fontSize: "13.5px",
              color: "#64748b",
              fontWeight: "600",
            }}
          >
            Already have an athlete account?{" "}
            <Link
              to="/login"
              style={{
                color: "#ae1236",
                fontWeight: "900",
                textDecoration: "none",
              }}
            >
              Sign In Here
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
