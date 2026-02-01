import toast from "react-hot-toast";
import AuthPageLink from "../components/AuthPageLink";
import { useLogin } from "../hooks/authHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import AppInput from "../components/AppInput";

export default function SignIn() {
  const { setHasToken } = useAppContext();
  const { login, isLoggingIn } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  async function onSubmit(data) {
    if ((isLoggingIn, isSubmitting)) return;
    try {
      const response = await login(data);
      localStorage.setItem("auth-token", response.authtoken);
      setHasToken(true);
      toast.success(response.message);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In to GiftLink
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppInput
            label="Email"
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            register={register}
            error={errors.email}
            autoFocus={true}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
          />
          <AppInput
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
            rules={{
              required: "Password is required",
            }}
          />
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition duration-300 cursor-pointer"
            type="submit"
            disabled={isLoggingIn || isSubmitting}
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
        </form>
        <AuthPageLink
          label="New Here?"
          linkText="Register Now"
          path="/register"
        />
      </div>
    </div>
  );
}
