import React from "react";
import UserForm from "../components/UserForm";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";

function UserCreate() {
  return (
    <Layout>
      <UserForm isEdit={false} />
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default UserCreate;
