import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import UserCreate from "./pages/UserCreate";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/new",
    element: (
      <PrivateRoute requireAdmin={true}>
        <UserCreate />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <PrivateRoute requireAdmin={true}>
        <UserEdit />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
