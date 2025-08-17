import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Layout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const navStyle = {
    backgroundColor: "#007bff",
    padding: "1rem",
    marginBottom: "2rem",
  };

  const navContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  };

  const buttonStyle = {
    ...linkStyle,
    backgroundColor: "transparent",
    border: "1px solid white",
    cursor: "pointer",
  };

  const userInfoStyle = {
    color: "white",
    marginRight: "1rem",
  };

  return (
    <div>
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <div>
            <Link to="/" style={linkStyle}>
              {t("nav.home")}
            </Link>
            <Link to="/users" style={linkStyle}>
              {t("nav.users")}
            </Link>
            {isAdmin && (
              <Link to="/users/new" style={linkStyle}>
                {t("users.createNew")}
              </Link>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <LanguageSwitcher />
            <span style={userInfoStyle}>
              {t("general.welcome")}, {user?.name}
            </span>
            <button style={buttonStyle} onClick={handleLogout}>
              {t("nav.signOut")}
            </button>
          </div>
        </div>
      </nav>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
