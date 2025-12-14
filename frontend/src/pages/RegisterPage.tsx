import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { API_URL } from "../constants";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      toast.success("Account created successfully!");

      setUser(response.data.user);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-yellow-100 to-secondary-100 flex items-center justify-center p-4">
      <div className="hero max-w-6xl w-full">
        <div className="hero-content flex-col lg:flex-row-reverse shadow-2xl rounded-xl bg-white px-6 py-12">
          {/* Right Section Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left space-y-4"
          >
            <h1 className="text-4xl font-semibold ">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-lg">
              Manage sweets, inventory, orders, and everything sweet!
            </p>
          </motion.div>

          {/* Register Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-base-100 w-full max-w-sm border border-secondary shadow-lg"
          >
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset space-y-3">
                  <label className="label font-semibold ">
                    Name
                  </label>
                  <input
                    type="text"
                    className="input input-secondary"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

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
                    placeholder="Choose a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label className="label font-semibold ">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="input input-secondary"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-secondary text-white mt-4"
                  >
                    {loading ? "Creating account..." : "Register"}
                  </button>
                </fieldset>
              </form>

              <p className="text-sm text-gray-600 mt-3 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-secondary font-semibold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
