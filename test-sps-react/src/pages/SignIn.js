import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useI18n } from "../contexts/I18nContext";

function SignIn() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        toast.success(t("auth.loginSuccess"));
        navigate("/");
      } else {
        toast.error(t("auth.invalidCredentials"));
      }
    } catch (error) {
      toast.error(t("error.unexpected"));
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  };

  const errorStyle = {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          {t("app.title")}
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">{t("auth.email")}:</label>
          <input
            id="email"
            type="email"
            style={inputStyle}
            {...register("email", {
              required: t("form.emailRequired"),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t("form.invalidEmail"),
              },
            })}
          />
          {errors.email && <div style={errorStyle}>{errors.email.message}</div>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">{t("auth.password")}:</label>
          <input
            id="password"
            type="password"
            style={inputStyle}
            {...register("password", {
              required: t("form.passwordRequired"),
              minLength: {
                value: 6,
                message: t("form.passwordMinLength"),
              },
            })}
          />
          {errors.password && (
            <div style={errorStyle}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? t("auth.signingIn") : t("auth.signIn")}
        </button>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
          }}
        >
          <h4>Demo Credentials:</h4>
          <p>
            <strong>Email:</strong> admin@sps.com
          </p>
          <p>
            <strong>Password:</strong> admin123
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default SignIn;
