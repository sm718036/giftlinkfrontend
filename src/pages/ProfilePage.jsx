import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import { urlConfig } from "../config.js";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const { setUserName } = useAppContext();

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/app/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      if (name || authtoken) {
        const storedUserDetails = {
          name: name,
          email: email,
        };

        setUserDetails(storedUserDetails);
        setUpdatedDetails(storedUserDetails);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/app/login");
        return;
      }

      const payload = { ...updatedDetails };
      await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });
      // Update user details in the context
      setUserName(updatedDetails.name);
      sessionStorage.setItem("name", updatedDetails.name);
      setUserDetails(updatedDetails);
      setEditMode(false);
      // Display success message to the user
      toast.success("Name Changed Successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 p-6">
      <div className="shadow-2xl p-10 rounded-2xl text-center w-full max-w-lg">
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-bold text-yellow-300">Edit Profile</h1>
            <label className="block text-white text-left">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              disabled
              className="w-full p-3 rounded-md bg-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
            />
            <label className="block text-white text-left">Name</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="text-white">
            <h1 className="text-4xl font-bold text-yellow-300">
              Hi, {userDetails.name}
            </h1>
            <p className="mt-2 text-lg">
              <b>Email:</b> {userDetails.email}
            </p>
            <button
              onClick={handleEdit}
              className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-8 rounded-full transition-all shadow-md cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
