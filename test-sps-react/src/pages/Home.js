import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";

function Home() {
  const { t } = useI18n();
  const { user, isAdmin } = useAuth();

  const cardStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  };

  const linkStyle = {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    margin: "0.5rem",
    transition: "background-color 0.2s",
  };

  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "2rem",
  };

  const statCardStyle = {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "8px",
    textAlign: "center",
  };

  return (
    <Layout>
      <div>
        <div style={cardStyle}>
          <h1>{t("home.title")}</h1>
          <p>{t("home.greeting", { name: user?.name, role: user?.type })}</p>
          <p>{t("home.description")}</p>
        </div>

        <div style={cardStyle}>
          <h2>{t("home.quickActions")}</h2>
          <div>
            <Link to="/users" style={linkStyle}>
              {t("home.viewUsers")}
            </Link>
            {isAdmin && (
              <Link to="/users/new" style={linkStyle}>
                {t("users.createNew")}
              </Link>
            )}
          </div>
        </div>

        <div style={statsStyle}>
          <div style={statCardStyle}>
            <h3>{t("home.yourRole")}</h3>
            <p style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>
              {user?.type === "admin"
                ? t("userType.admin")
                : t("userType.standard")}
            </p>
            <p style={{ color: "#6c757d", fontSize: "0.875rem" }}>
              {user?.type === "admin"
                ? t("home.adminPermissions")
                : t("home.userPermissions")}
            </p>
          </div>

          <div style={statCardStyle}>
            <h3>{t("home.accountInfo")}</h3>
            <p style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
              {user?.email}
            </p>
            <p style={{ color: "#6c757d", fontSize: "0.875rem" }}>
              {t("home.registeredEmail")}
            </p>
          </div>

          <div style={statCardStyle}>
            <h3>{t("home.systemStatusTitle")}</h3>
            <p
              style={{
                fontSize: "1.5rem",
                margin: "0.5rem 0",
                color: "#28a745",
              }}
            >
              {t("home.online")}
            </p>
            <p style={{ color: "#6c757d", fontSize: "0.875rem" }}>
              {t("home.systemStatus")}
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <h2>{t("home.featuresTitle")}</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li>✅ {t("home.feature.jwtAuth")}</li>
            <li>✅ {t("home.feature.viewUsers")}</li>
            {isAdmin && (
              <>
                <li>✅ {t("home.feature.createUsers")}</li>
                <li>✅ {t("home.feature.editUsers")}</li>
                <li>✅ {t("home.feature.deleteUsers")}</li>
                <li>✅ {t("home.feature.roleAccess")}</li>
              </>
            )}
            <li>✅ {t("home.feature.responsive")}</li>
            <li>✅ {t("home.feature.notifications")}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
