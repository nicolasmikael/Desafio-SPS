import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, UserPlus, LogOut } from "lucide-react";
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

  return (
    <div>
      <nav className="bg-primary-500 p-4 mb-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className="text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-primary-600 flex items-center gap-2"
            >
              <Home size={18} />
              {t("nav.home")}
            </Link>
            <Link
              to="/users"
              className="text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-primary-600 flex items-center gap-2"
            >
              <Users size={18} />
              {t("nav.users")}
            </Link>
            {isAdmin && (
              <Link
                to="/users/create"
                data-testid="create-user-button"
                className="text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-primary-600 flex items-center gap-2"
              >
                <UserPlus size={18} />
                {t("users.createNew")}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="text-white">
              {t("general.welcome")}, {user?.name}
            </span>
            <button
              data-testid="logout-button"
              className="text-white px-4 py-2 rounded bg-transparent border border-white transition-colors duration-200 hover:bg-white hover:text-primary-500 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              {t("nav.signOut")}
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4" data-testid="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
