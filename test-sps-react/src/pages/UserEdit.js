import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import UserForm from "../components/UserForm";
import Layout from "../components/Layout";
import { toast, ToastContainer } from "react-toastify";
import { useI18n } from "../contexts/I18nContext";

function UserEdit() {
  const { t } = useI18n();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await UserService.get(userId);
        setUser(userData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div>{t("user.loadingSingle")}</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>{t("user.notFound")}</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <UserForm user={user} isEdit={true} />
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default UserEdit;
