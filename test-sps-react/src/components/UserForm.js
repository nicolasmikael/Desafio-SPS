import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { toast } from "react-toastify";
import { useI18n } from "../contexts/I18nContext";

const UserForm = ({ user = null, isEdit = false }) => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      type: user?.type || "standard",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        // Remove password if empty for updates
        const updateData = { ...data };
        if (!updateData.password) {
          delete updateData.password;
        }
        await UserService.update(user.id, updateData);
        toast.success(t("message.userUpdated"));
      } else {
        await UserService.create(data);
        toast.success(t("message.userCreated"));
      }
      navigate("/users");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  };

  const selectStyle = {
    ...inputStyle,
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    margin: "0 0.5rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
    color: "white",
  };

  const errorStyle = {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {isEdit ? t("form.editUser") : t("users.createNew")}
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name">{t("form.name")}:</label>
        <input
          id="name"
          type="text"
          style={inputStyle}
          {...register("name", {
            required: t("form.nameRequired"),
            minLength: {
              value: 2,
              message: t("form.nameMinLength"),
            },
            maxLength: {
              value: 50,
              message: t("form.nameMaxLength"),
            },
          })}
        />
        {errors.name && <div style={errorStyle}>{errors.name.message}</div>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email">{t("form.email")}:</label>
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
        <label htmlFor="type">{t("form.userType")}:</label>
        <select
          id="type"
          style={selectStyle}
          {...register("type", { required: t("form.userTypeRequired") })}
        >
          <option value="standard">{t("userType.standard")}</option>
          <option value="admin">{t("userType.admin")}</option>
        </select>
        {errors.type && <div style={errorStyle}>{errors.type.message}</div>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password">
          {t("form.password")} {isEdit && t("form.passwordOptional")}:
        </label>
        <input
          id="password"
          type="password"
          style={inputStyle}
          {...register("password", {
            required: !isEdit ? t("form.passwordRequired") : false,
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

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={() => navigate("/users")}
        >
          {t("action.cancel")}
        </button>
        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading
            ? isEdit
              ? t("form.updating")
              : t("form.creating")
            : isEdit
            ? t("form.updateUser")
            : t("form.createUser")}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
