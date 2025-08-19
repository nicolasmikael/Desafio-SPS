import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  User,
  Mail,
  Activity,
  CheckCircle,
  Shield,
} from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";

function Home() {
  const { t } = useI18n();
  const { user, isAdmin } = useAuth();

  return (
    <Layout>
      <div>
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t("home.title")}
          </h1>
          <p className="text-gray-600 mb-2">
            {t("home.greeting", { name: user?.name, role: user?.type })}
          </p>
          <p className="text-gray-600">{t("home.description")}</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t("home.quickActions")}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/users"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-200"
            >
              <User size={18} />
              {t("home.viewUsers")}
            </Link>
            {isAdmin && (
              <Link
                to="/users/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-success-500 text-white rounded hover:bg-success-600 transition-colors duration-200"
              >
                <User size={18} />
                {t("users.createNew")}
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              {user?.type === "admin" ? (
                <Shield className="w-8 h-8 text-danger-500" />
              ) : (
                <User className="w-8 h-8 text-primary-500" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("home.yourRole")}
            </h3>
            <p className="text-2xl font-bold text-gray-900 my-2">
              {user?.type === "admin"
                ? t("userType.admin")
                : t("userType.standard")}
            </p>
            <p className="text-gray-500 text-sm">
              {user?.type === "admin"
                ? t("home.adminPermissions")
                : t("home.userPermissions")}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("home.accountInfo")}
            </h3>
            <p className="text-xl font-medium text-gray-900 my-2 break-all">
              {user?.email}
            </p>
            <p className="text-gray-500 text-sm">{t("home.registeredEmail")}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Activity className="w-8 h-8 text-success-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("home.systemStatusTitle")}
            </h3>
            <p className="text-2xl font-bold text-success-500 my-2">
              {t("home.online")}
            </p>
            <p className="text-gray-500 text-sm">{t("home.systemStatus")}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              {t("home.featuresTitle")}
            </h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success-500" />
              <span>{t("home.feature.jwtAuth")}</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success-500" />
              <span>{t("home.feature.viewUsers")}</span>
            </li>
            {isAdmin && (
              <>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span>{t("home.feature.createUsers")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span>{t("home.feature.editUsers")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span>{t("home.feature.deleteUsers")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span>{t("home.feature.roleAccess")}</span>
                </li>
              </>
            )}
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success-500" />
              <span>{t("home.feature.responsive")}</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success-500" />
              <span>{t("home.feature.notifications")}</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
