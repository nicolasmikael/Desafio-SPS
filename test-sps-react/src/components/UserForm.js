import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
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
      toast.error(t("error.emailExists"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
        {isEdit ? t("form.editUser") : t("users.createNew")}
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("form.name")}:
        </label>
        <input
          id="name"
          type="text"
          data-testid="name-input"
          className="w-full p-3 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
        {errors.name && (
          <div className="text-danger-500 text-sm mb-2">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("form.email")}:
        </label>
        <input
          id="email"
          type="email"
          data-testid="email-input"
          className="w-full p-3 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          {...register("email", {
            required: t("form.emailRequired"),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t("form.invalidEmail"),
            },
          })}
        />
        {errors.email && (
          <div className="text-danger-500 text-sm mb-2">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("form.userType")}:
        </label>
        <select
          id="type"
          data-testid="type-select"
          className="w-full p-3 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          {...register("type", { required: t("form.userTypeRequired") })}
        >
          <option value="standard">Standard</option>
          <option value="admin">Admin</option>
        </select>
        {errors.type && (
          <div className="text-danger-500 text-sm mb-2">
            {errors.type.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t("form.password")} {isEdit && `(${t("form.passwordOptional")})`}:
        </label>
        <input
          id="password"
          type="password"
          data-testid="password-input"
          className="w-full p-3 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          {...register("password", {
            required: !isEdit ? t("form.passwordRequired") : false,
            minLength: {
              value: 6,
              message: t("form.passwordMinLength"),
            },
          })}
        />
        {errors.password && (
          <div className="text-danger-500 text-sm mb-2">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          type="button"
          data-testid="cancel-button"
          className="px-6 py-3 mx-2 bg-gray-500 text-white rounded text-base cursor-pointer hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 inline-flex"
          onClick={() => navigate("/users")}
        >
          <X size={18} />
          {t("action.cancel")}
        </button>
        <button
          type="submit"
          data-testid="submit-button"
          className="px-6 py-3 mx-2 bg-primary-500 text-white rounded text-base cursor-pointer hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 inline-flex"
          disabled={loading}
        >
          <Save size={18} />
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
