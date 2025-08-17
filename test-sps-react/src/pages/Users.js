import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await UserService.list();
      setUsers(userData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(t("users.confirmDelete", { userName }))) {
      try {
        await UserService.delete(userId);
        toast.success(t("users.deleteSuccess"));
        loadUsers(); // Reload the list
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };

  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
  };

  const tdStyle = {
    padding: "0.75rem",
    borderBottom: "1px solid #dee2e6",
  };

  const buttonStyle = {
    padding: "0.25rem 0.5rem",
    margin: "0 0.25rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "0.875rem",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "white",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const createButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "white",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div>{t("users.loading")}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1>{t("users.title")}</h1>
          {isAdmin && (
            <Link to="/users/new" style={createButtonStyle}>
              {t("users.createNew")}
            </Link>
          )}
        </div>

        {users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>{t("users.noUsers")}</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{t("table.id")}</th>
                <th style={thStyle}>{t("table.name")}</th>
                <th style={thStyle}>{t("table.email")}</th>
                <th style={thStyle}>{t("table.type")}</th>
                <th style={thStyle}>{t("table.createdAt")}</th>
                {isAdmin && <th style={thStyle}>{t("table.actions")}</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor:
                          user.type === "admin" ? "#dc3545" : "#007bff",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    >
                      {t(`userType.${user.type}`)}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  {isAdmin && (
                    <td style={tdStyle}>
                      <Link to={`/users/${user.id}`} style={editButtonStyle}>
                        {t("action.edit")}
                      </Link>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(user.id, user.name)}
                      >
                        {t("action.delete")}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default Users;
