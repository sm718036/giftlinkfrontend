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
      <aside className="auth-story">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#dce92b]">Welcome back</p>
        <h2 className="mt-4 max-w-lg text-5xl font-semibold tracking-[-.06em]">
          Your next good deed is <span className="display-serif text-[#dce92b]">waiting.</span>
        </h2>
        <p className="mt-5 max-w-md leading-7 text-[#b9c8bf]">
          Sign in to manage your gifts, save useful finds, and keep sharing within your community.
        </p>
      </aside>
      <div className="auth-panel">
        <div className="auth-card">
          <p className="section-copy !mt-3">Good to see you again.</p>
          <h1 className="mt-3 mb-8">Log in to GiftLink</h1>
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
