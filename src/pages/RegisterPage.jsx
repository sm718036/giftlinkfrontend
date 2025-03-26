import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import { urlConfig } from "../config";
import toast from "react-hot-toast";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function showError(message) {
    toast.error(message);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok && res.status === 409) {
        showError("Email already exists");
        return;
      }
      let data = await res.json();
      if (data.authtoken) {
        sessionStorage.setItem("auth-token", data.token);
        sessionStorage.setItem(
          "name",
          `${formData.firstName} ${formData.lastName}`
        );
        sessionStorage.setItem("email", data.email);
        setIsLoggedIn(true);
        navigate("/app");
        toast.success("Registration successful");
      }
    } catch (err) {
      showError(err.message);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-600">
      <div className="bg-white shadow-lg rounded-xl px-4 py-8 sm:px-8 max-w-md w-[90%]">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already a member?{" "}
          <Link
            to="/app/login"
            className="text-purple-500 hover:text-purple-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default RegisterPage;
