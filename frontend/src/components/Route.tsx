import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AddSweetPage from "../pages/AddSweetPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import AdminRoute from "../routes/AdminRoute";

import Navbar from "../components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navbar />
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add",
    element: (
      <AdminRoute>
        <Navbar />
        <AddSweetPage />
      </AdminRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
