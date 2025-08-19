import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, UserPlus, Loader } from "lucide-react";
import UserService from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "../contexts/I18nContext";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAdmin, user: currentUser } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "") {
      filtered = filtered.filter((user) => user.type === typeFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, typeFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await UserService.list();
      setUsers(userData);
      setFilteredUsers(userData);
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
        loadUsers();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center p-8">
          <div className="flex items-center justify-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            <span>{t("users.loading")}</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {t("users.title")}
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              data-testid="search-input"
              placeholder={t("users.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              data-testid="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">{t("users.allTypes")}</option>
              <option value="admin">{t("userType.admin")}</option>
              <option value="standard">{t("userType.standard")}</option>
            </select>
            {isAdmin && (
              <Link
                to="/users/create"
                data-testid="create-user-button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-success-500 text-white rounded text-base hover:bg-success-600 transition-colors duration-200"
              >
                <UserPlus size={18} />
                {t("users.createNew")}
              </Link>
            )}
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              {searchTerm ? t("users.noUsersFound") : t("users.noUsers")}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="users-table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                      {t("table.id")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                      {t("table.name")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                      {t("table.email")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                      {t("table.type")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                      {t("table.createdAt")}
                    </th>
                    {isAdmin && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                        {t("table.actions")}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            user.type === "admin"
                              ? "bg-danger-500 text-white"
                              : "bg-primary-500 text-white"
                          }`}
                        >
                          {t(`userType.${user.type}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/users/${user.id}`}
                              data-testid={`edit-user-${user.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500 text-white text-sm rounded hover:bg-primary-600 transition-colors duration-200"
                            >
                              <Edit size={14} />
                              {t("action.edit")}
                            </Link>
                            {user.id !== currentUser.id && (
                              <button
                                data-testid={`delete-user-${user.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-danger-500 text-white text-sm rounded hover:bg-danger-600 transition-colors duration-200"
                                onClick={() => handleDelete(user.id, user.name)}
                              >
                                <Trash2 size={14} />
                                {t("action.delete")}
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default Users;
