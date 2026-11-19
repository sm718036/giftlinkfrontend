import toast from "react-hot-toast";
import AuthPageLink from "../components/AuthPageLink";
import { useLogin } from "../hooks/authHooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    if (isLoggingIn || isSubmitting) return;
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
    <div className="auth-layout">
      <div className="auth-panel">
        <div className="auth-card">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="auth-brand" aria-label="GiftLink home">
              <img src="/static/logo-mark.png" alt="" width="66" height="58" />
              <span>
                Gift<em>Link</em>
              </span>
            </Link>
          </div>
          <p className="section-kicker text-center">Welcome back</p>
          <h1 className="mt-3 mb-8 text-center">Log in to GiftLink</h1>
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
              className="btn-primary mt-2 w-full"
              type="submit"
              disabled={isLoggingIn || isSubmitting}
            >
              {isLoggingIn ? "Logging In..." : "Login"}
            </button>
          </form>
          <AuthPageLink label="New Here?" linkText="Register Now" path="/register" />
        </div>
      </div>
    </div>
  );
}
