import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import { urlConfig } from "../config";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const bearerToken = sessionStorage.getItem("bearer-token");

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/app");
    }
  }, [navigate]);

  function showError(message) {
    setErrMsg(message);
    setTimeout(() => {
      setErrMsg(null);
    }, 5000);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken ? `Bearer ${bearerToken}` : "", // Include Bearer token if available
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!res.ok && res.status === 400) {
        showError("Incorrect email");
        return;
      } else if (!res.ok && res.status === 401) {
        showError("Invalid password");
        return;
      } else if (!res.ok) {
        const data = await res.json();
        showError(data.error);
        return;
      } else {
        const data = await res.json();
        if (data.authtoken) {
          sessionStorage.setItem("auth-token", data.authtoken);
          sessionStorage.setItem("name", data.userName);
          sessionStorage.setItem("email", data.userEmail);
          setIsLoggedIn(true);
          navigate("/app");
        }
      }
    } catch (err) {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      showError(err.message);
      setTimeout(() => {
        showError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In to GiftLink
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrMsg("");
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrMsg(null)
              }}
              required
            />
            {errMsg && (
              <small className="text-red-500 rounded-lg">{errMsg}</small>
            )}
          </div>
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition duration-300 cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          New here?
          <Link className="text-blue-500 hover:underline" to="/app/register">
            <span> Register Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}