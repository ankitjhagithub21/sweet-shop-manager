import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import AddSweetPage from "./pages/AddSweetPage";
import Navbar from "./components/Navbar";

const App = () => {
  const { loadUser } = useUserStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Navbar/>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add",
      element: (
        <AdminRoute>
          <Navbar/>
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

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
