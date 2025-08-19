import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
          {t("app.title")}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("auth.email")}:
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
            <div
              className="text-danger-500 text-sm mb-2"
              data-testid="email-error"
            >
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("auth.password")}:
          </label>
          <input
            id="password"
            type="password"
            data-testid="password-input"
            className="w-full p-3 border border-gray-300 rounded text-base mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            {...register("password", {
              required: t("form.passwordRequired"),
              minLength: {
                value: 6,
                message: t("form.passwordMinLength"),
              },
            })}
          />
          {errors.password && (
            <div
              className="text-danger-500 text-sm mb-2"
              data-testid="password-error"
            >
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          data-testid="login-button"
          className="w-full p-3 bg-primary-500 text-white rounded text-base cursor-pointer mt-4 hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          <LogIn size={18} />
          {loading ? t("auth.signingIn") : t("auth.signIn")}
        </button>

        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h4 className="font-semibold text-gray-800 mb-2">
            Demo Credentials:
          </h4>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Email:</strong> admin@admin.com
          </p>
          <p className="text-sm text-gray-600">
            <strong>Password:</strong> admin123
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default SignIn;
