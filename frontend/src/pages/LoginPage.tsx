import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { API_URL } from "../constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful!");

      setUser(response.data.user);

      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full  flex items-center justify-center p-4">
      {/* Card */}
      <div className="hero max-w-6xl w-full">
        <div className="hero-content flex-col lg:flex-row shadow-2xl rounded-xl bg-white px-6   py-12">
          {/* Left Section Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left space-y-4"
          >
            <h1 className="text-4xl font-bold text-secondary-600">
              Sweet Shop Manager
            </h1>
            <p className="text-gray-600 text-lg">
              Manage sweets, inventory, orders, and more with ease.
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-base-100 w-full max-w-sm shrink-0 border border-secondary shadow-lg"
          >
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset space-y-3">
                  <label className="label font-semibold ">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input input-secondary"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="label font-semibold ">
                    Password
                  </label>
                  <input
                    type="password"
                    className="input input-secondary"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-secondary mt-4"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </fieldset>
              </form>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-secondary font-semibold hover:underline"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
