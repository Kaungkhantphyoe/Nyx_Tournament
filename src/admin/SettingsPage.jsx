import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import PaymentsIcon from "@mui/icons-material/Payments";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function SettingsPage() {
  const outletContext = useOutletContext() || {};
  const { isDark: parentIsDark } = outletContext;
  const isDark = parentIsDark ?? false;

  const [websiteInfo, setWebsiteInfo] = useState({
    name: "NYX Badminton Championship Portal",
    email: "support@nyxbadminton.com",
    phone: "+95 9 123 456 789",
    address: "Mandalay Sports Complex, Mandalay",
    description:
      "Official tournament registration, BWF sanctioned live brackets, and national ranking portal for badminton athletes.",
  });

  const [payments, setPayments] = useState([
    {
      id: 1,
      name: "KBZ Pay",
      owner: "NYX Badminton Official",
      accNo: "09450123789",
      active: true,
      qr: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Wave Money / WavePay",
      owner: "NYX Badminton Official",
      accNo: "09450123789",
      active: true,
      qr: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "CB Pay",
      owner: "NYX Badminton Official",
      accNo: "09420011223",
      active: false,
      qr: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditPayment, setCurrentEditPayment] = useState(null);

  const [newPayment, setNewPayment] = useState({
    name: "",
    owner: "",
    accNo: "",
    qr: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
  });

  const [adminData, setAdminData] = useState({
    username: "Hein Min Aung",
    email: "admin@nyxbadminton.com",
    password: "",
    profilePic:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityPassword, setShowSecurityPassword] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [masterPasswordInput, setMasterPasswordInput] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    if (!newPayment.name || !newPayment.accNo) return;
    setPayments([...payments, { id: Date.now(), ...newPayment }]);
    setNewPayment({
      name: "",
      owner: "",
      accNo: "",
      qr: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    });
    setShowAddModal(false);
    triggerToast("New payment gateway account added successfully.");
  };

  const handleEditPaymentSubmit = (e) => {
    e.preventDefault();
    setPayments(
      payments.map((p) =>
        p.id === currentEditPayment.id ? currentEditPayment : p,
      ),
    );
    setShowEditModal(false);
    triggerToast("Payment gateway updated successfully.");
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
    setShowEditModal(false);
    triggerToast("Payment gateway deleted.");
  };

  const handleToggleActive = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  };

  const handleAdminUpdateAttempt = (e) => {
    e.preventDefault();
    setShowSecurityModal(true);
  };

  const handleConfirmSecurityVerification = () => {
    if (masterPasswordInput.trim() === "") {
      alert("Please enter your current master password.");
      return;
    }
    setShowSecurityModal(false);
    setMasterPasswordInput("");
    triggerToast("Administrator credentials updated & verified successfully.");
  };

  const handleSaveSynchronize = () => {
    triggerToast(
      "✨ All system settings saved & synchronized with live public tournament website successfully!",
    );
  };

  const styles = {
    container: {
      padding: "28px",
      backgroundColor: isDark ? "#121315" : "#f8fafc",
      color: isDark ? "#e1e1e1" : "#333",
      minHeight: "calc(100vh - 75px)",
      fontFamily: "sans-serif",
      boxSizing: "border-box",
      position: "relative",
    },
    toast: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      backgroundColor: "#0f172a",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "bold",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #334155",
    },
    card: {
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      borderRadius: "12px",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderBottom: `1px solid ${isDark ? "#2d3139" : "#f1f5f9"}`,
      paddingBottom: "16px",
      marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "15px",
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#0f172a",
      margin: "0 0 4px 0",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    cardDesc: {
      fontSize: "12px",
      color: "#64748b",
      margin: 0,
    },
    label: {
      fontSize: "11px",
      fontWeight: "bold",
      color: "#64748b",
      display: "block",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      backgroundColor: isDark ? "#24272b" : "#f8fafc",
      fontSize: "13px",
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#0f172a",
      outline: "none",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      backgroundColor: isDark ? "#24272b" : "#f8fafc",
      fontSize: "13px",
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#0f172a",
      outline: "none",
      boxSizing: "border-box",
      minHeight: "80px",
      resize: "vertical",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    adminLayout: {
      display: "grid",
      gridTemplateColumns: "140px 1fr",
      gap: "24px",
      alignItems: "start",
    },
    adminFieldsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    paymentRow: (active) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDark ? "#24272b" : "#f8fafc",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      borderRadius: "10px",
      padding: "16px 20px",
      marginBottom: "12px",
      opacity: active ? 1 : 0.45,
      transition: "opacity 0.2s ease",
    }),
    btnPrimary: {
      backgroundColor: "#0F1C2C",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    btnSecondary: {
      backgroundColor: isDark ? "#24272b" : "#f1f5f9",
      color: isDark ? "#ffffff" : "#334155",
      border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    footerActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      padding: "20px 24px",
      borderRadius: "12px",
      border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
      marginTop: "24px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1500,
      padding: "20px",
    },
    modalCard: {
      backgroundColor: isDark ? "#1a1c1e" : "#ffffff",
      borderRadius: "16px",
      width: "100%",
      maxWidth: "520px",
      padding: "28px",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      position: "relative",
      color: isDark ? "#fff" : "#0f172a",
    },
  };

  return (
    <div style={styles.container}>
      {toastMessage && (
        <div style={styles.toast}>
          <CheckCircleOutlineOutlinedIcon
            style={{ color: "#4ade80", fontSize: "20px" }}
          />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. WEBSITE GENERAL INFORMATION */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>
              <LanguageIcon style={{ color: "#2563eb", fontSize: "25px" }} /> 1.
              Website General Information & Footer Data
            </h3>
            <p style={styles.cardDesc}>
              Core metadata and arena contact strings exposed on public
              tournament registrations.
            </p>
          </div>
          <span
            style={{
              fontSize: "11px",
              backgroundColor: isDark ? "#24272b" : "#f1f5f9",
              color: "#64748b",
              padding: "4px 10px",
              borderRadius: "6px",
              fontWeight: "bold",
              border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
            }}
          >
            PUBLIC META
          </span>
        </div>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>PLATFORM / WEBSITE NAME</label>
            <input
              type="text"
              style={styles.input}
              value={websiteInfo.name}
              onChange={(e) =>
                setWebsiteInfo({ ...websiteInfo, name: e.target.value })
              }
            />
          </div>
          <div>
            <label style={styles.label}>OFFICIAL SUPPORT EMAIL</label>
            <input
              type="email"
              style={styles.input}
              value={websiteInfo.email}
              onChange={(e) =>
                setWebsiteInfo({ ...websiteInfo, email: e.target.value })
              }
            />
          </div>
        </div>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>CONTACT PHONE NUMBER</label>
            <input
              type="text"
              style={styles.input}
              value={websiteInfo.phone}
              onChange={(e) =>
                setWebsiteInfo({ ...websiteInfo, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label style={styles.label}>
              PHYSICAL ARENA / HEADQUARTERS ADDRESS
            </label>
            <input
              type="text"
              style={styles.input}
              value={websiteInfo.address}
              onChange={(e) =>
                setWebsiteInfo({ ...websiteInfo, address: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <label style={{ ...styles.label, marginBottom: 0 }}>
              WEBSITE SEO META DESCRIPTION
            </label>
            <span style={{ fontSize: "11px", color: "#64748b" }}>
              {websiteInfo.description.length} / 160 Characters
            </span>
          </div>
          <textarea
            style={styles.textarea}
            value={websiteInfo.description}
            onChange={(e) =>
              setWebsiteInfo({ ...websiteInfo, description: e.target.value })
            }
          />
        </div>
      </div>

      {/* 2. PAYMENT GATEWAYS & QR ACCOUNTS */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>
              <PaymentsIcon style={{ color: "#16a34a", fontSize: "25px" }} /> 2.
              Payment Gateways & QR Accounts (For Player Enrollment Slips)
            </h3>
            <p style={styles.cardDesc}>
              Manage receiving merchant accounts where players transfer
              tournament entry fees.
            </p>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "#16a34a",
              backgroundColor: isDark ? "#064e3b" : "#f0fdf4",
              padding: "4px 10px",
              borderRadius: "6px",
              fontWeight: "bold",
              border: "1px solid #bbf7d0",
            }}
          >
            {payments.filter((p) => p.active).length} Active Gateways
          </span>
        </div>

        {payments.map((p) => (
          <div key={p.id} style={styles.paymentRow(p.active)}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  backgroundColor: isDark ? "#1a1c1e" : "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
                }}
              >
                <img
                  src={p.qr}
                  alt="QR"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: isDark ? "#ffffff" : "#0f172a",
                    marginBottom: "3px",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  Acc No:{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color: isDark ? "#cbd5e1" : "#334155",
                    }}
                  >
                    {p.accNo}
                  </span>{" "}
                  • Name:{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color: isDark ? "#cbd5e1" : "#334155",
                    }}
                  >
                    {p.owner}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                type="button"
                onClick={() => {
                  setCurrentEditPayment(p);
                  setShowEditModal(true);
                }}
                style={{
                  backgroundColor: isDark ? "#1a1c1e" : "#f1f5f9",
                  border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
                  color: isDark ? "#fff" : "#0f172a",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <EditOutlinedIcon style={{ fontSize: "14px" }} /> Edit
              </button>

              {/* Fully Functional Switch Toggle Button */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "44px",
                    height: "22px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleActive(p.id)}
                >
                  <input
                    type="checkbox"
                    checked={p.active}
                    onChange={() => handleToggleActive(p.id)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0,
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: p.active ? "#16a34a" : "#cbd5e1",
                      transition: ".3s",
                      borderRadius: "22px",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: "''",
                        height: "16px",
                        width: "16px",
                        left: p.active ? "24px" : "3px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: ".3s",
                        borderRadius: "50%",
                      }}
                    ></span>
                  </span>
                </label>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: p.active ? "#16a34a" : "#94a3b8",
                    width: "55px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleActive(p.id)}
                >
                  {p.active ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isDark ? "#24272b" : "#f8fafc",
            border: `2px dashed ${isDark ? "#2d3139" : "#cbd5e1"}`,
            borderRadius: "10px",
            color: isDark ? "#ffffff" : "#0f172a",
            fontSize: "13px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
          }}
        >
          <AddCircleOutlineOutlinedIcon style={{ fontSize: "18px" }} /> Add New
          Payment Gateway Account
        </button>
      </div>

      {/* 3. ADMINISTRATOR SECURITY & CREDENTIALS */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h3 style={styles.cardTitle}>
              <AdminPanelSettingsIcon
                style={{ color: "#dc2626", fontSize: "25px" }}
              />{" "}
              3. Administrator Security & Credentials Management
            </h3>
            <p style={styles.cardDesc}>
              Update admin access details. Modifying credentials triggers a
              security verification password prompt.
            </p>
          </div>
          <span
            style={{
              fontSize: "11px",
              backgroundColor: isDark ? "#24272b" : "#f1f5f9",
              color: "#64748b",
              padding: "4px 10px",
              borderRadius: "6px",
              fontWeight: "bold",
              border: `1px solid ${isDark ? "#2d3139" : "#cbd5e1"}`,
            }}
          >
            ROLE: ROOT OPS
          </span>
        </div>

        <form onSubmit={handleAdminUpdateAttempt}>
          <div style={styles.adminLayout}>
            <div
              style={{
                textAlign: "center",
                backgroundColor: isDark ? "#24272b" : "#f8fafc",
                padding: "16px",
                borderRadius: "10px",
                border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "#e2e8f0",
                  margin: "0 auto 8px auto",
                  overflow: "hidden",
                  border: "2px solid #cbd5e1",
                }}
              >
                <img
                  src={adminData.profilePic}
                  alt="Admin Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <label
                style={{
                  fontSize: "11px",
                  color: "#2563eb",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setAdminData({
                        ...adminData,
                        profilePic: URL.createObjectURL(e.target.files[0]),
                      });
                      triggerToast("Profile picture updated locally.");
                    }
                  }}
                />
              </label>
              <div
                style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}
              >
                Admin Avatar
              </div>
            </div>

            <div>
              <div style={styles.adminFieldsGrid}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={styles.label}>ADMIN USERNAME *</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={adminData.username}
                    onChange={(e) =>
                      setAdminData({ ...adminData, username: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={styles.label}>ADMIN EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "16px",
                  alignItems: "end",
                }}
              >
                <div>
                  <label style={styles.label}>
                    NEW LOGIN PASSWORD (Optional)
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type new password to change..."
                      style={styles.input}
                      value={adminData.password}
                      onChange={(e) =>
                        setAdminData({ ...adminData, password: e.target.value })
                      }
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#64748b",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon style={{ fontSize: "18px" }} />
                      ) : (
                        <VisibilityIcon style={{ fontSize: "18px" }} />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <button type="submit" style={styles.btnPrimary}>
                    <LockOutlinedIcon style={{ fontSize: "16px" }} /> Update
                    Admin Credentials
                  </button>
                </div>
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: "12px",
                }}
              >
                🕒 Last password update was 42 days ago.
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* FOOTER ACTIONS */}
      <div style={styles.footerActions}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          <WarningAmberIcon style={{ fontSize: "18px" }} /> Unsaved changes will
          affect live user portal instantly upon saving.
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={() => triggerToast("Changes discarded.")}
            style={styles.btnSecondary}
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSaveSynchronize}
            style={{ ...styles.btnPrimary, backgroundColor: "#991b1b" }}
          >
            Save & Synchronize Website
          </button>
        </div>
      </div>

      {/* MODAL 1: ADD NEW PAYMENT GATEWAY */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              Add New Payment Gateway Account
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              TOURNAMENT ENTRY COLLECTIONS
            </p>

            <form onSubmit={handleAddPaymentSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>
                  PAYMENT SERVICE PROVIDER NAME *
                </label>
                <input
                  type="text"
                  placeholder="e.g., AYA Pay / KBZPay"
                  style={styles.input}
                  value={newPayment.name}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, name: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>ACCOUNT OWNER NAME *</label>
                <input
                  type="text"
                  placeholder="e.g., NYX Badminton Official"
                  style={styles.input}
                  value={newPayment.owner}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, owner: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>ACCOUNT NO. / PHONE *</label>
                <input
                  type="text"
                  placeholder="e.g., 09450123789"
                  style={styles.input}
                  value={newPayment.accNo}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, accNo: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={styles.label}>
                  UPLOAD PAYMENT QR CODE PHOTO *
                </label>
                <label
                  style={{
                    display: "block",
                    border: `2px dashed ${isDark ? "#2d3139" : "#cbd5e1"}`,
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: isDark ? "#24272b" : "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <CloudUploadOutlinedIcon
                    style={{
                      fontSize: "32px",
                      color: "#64748b",
                      marginBottom: "8px",
                    }}
                  />
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                    Click or Drag QR Code Image (PNG, JPG, Max 5MB)
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setNewPayment({
                          ...newPayment,
                          qr: URL.createObjectURL(e.target.files[0]),
                        });
                        triggerToast("QR code selected.");
                      }
                    }}
                  />
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={styles.btnSecondary}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Save & Create Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PAYMENT GATEWAY */}
      {showEditModal && currentEditPayment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              Edit Payment Gateway
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              GATEWAY CONFIGURATION
            </p>

            <form onSubmit={handleEditPaymentSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>
                  PAYMENT SERVICE PROVIDER NAME *
                </label>
                <input
                  type="text"
                  style={styles.input}
                  value={currentEditPayment.name}
                  onChange={(e) =>
                    setCurrentEditPayment({
                      ...currentEditPayment,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>ACCOUNT OWNER NAME *</label>
                <input
                  type="text"
                  style={styles.input}
                  value={currentEditPayment.owner}
                  onChange={(e) =>
                    setCurrentEditPayment({
                      ...currentEditPayment,
                      owner: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={styles.label}>ACCOUNT / PHONE *</label>
                <input
                  type="text"
                  style={styles.input}
                  value={currentEditPayment.accNo}
                  onChange={(e) =>
                    setCurrentEditPayment({
                      ...currentEditPayment,
                      accNo: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={styles.label}>
                  CURRENT PAYMENT QR CODE PHOTO
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor: isDark ? "#24272b" : "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${isDark ? "#2d3139" : "#e2e8f0"}`,
                  }}
                >
                  <img
                    src={currentEditPayment.qr}
                    alt="QR"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <label
                    style={{
                      backgroundColor: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      color: "#0f172a",
                    }}
                  >
                    Replace / Upload QR
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setCurrentEditPayment({
                            ...currentEditPayment,
                            qr: URL.createObjectURL(e.target.files[0]),
                          });
                          triggerToast("QR code updated.");
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleDeletePayment(currentEditPayment.id)}
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <DeleteOutlineOutlinedIcon style={{ fontSize: "16px" }} />{" "}
                  Delete Account
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    style={styles.btnSecondary}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={styles.btnPrimary}>
                    Save Updates
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SECURITY VERIFICATION */}
      {showSecurityModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <button
              type="button"
              onClick={() => setShowSecurityModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <LockOutlinedIcon
                style={{ color: "#dc2626", fontSize: "24px" }}
              />
              <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
                Security Verification Required
              </h3>
            </div>
            <div
              style={{
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              ● HIGH PRIVILEGE ACTION • ROOT ACCESS
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: "0 0 20px 0",
              }}
            >
              For security purposes, please re-enter your current Master
              Administrator Password to authorize and apply these system
              changes.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label style={styles.label}>CURRENT MASTER PASSWORD *</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showSecurityPassword ? "text" : "password"}
                  placeholder="Enter your current password..."
                  style={styles.input}
                  value={masterPasswordInput}
                  onChange={(e) => setMasterPasswordInput(e.target.value)}
                />
                <span
                  onClick={() => setShowSecurityPassword(!showSecurityPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  {showSecurityPassword ? (
                    <VisibilityOffIcon style={{ fontSize: "18px" }} />
                  ) : (
                    <VisibilityIcon style={{ fontSize: "18px" }} />
                  )}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                style={styles.btnSecondary}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSecurityVerification}
                style={{ ...styles.btnPrimary, backgroundColor: "#991b1b" }}
              >
                Confirm & Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
