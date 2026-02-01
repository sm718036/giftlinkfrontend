import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegister } from "../hooks/authHooks";
import AuthPageLink from "../components/AuthPageLink";
import { useForm } from "react-hook-form";
import AppInput from "../components/AppInput";

function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerNewUser, isRegistering } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if ((isRegistering, isSubmitting)) return;
    try {
      const response = await registerNewUser(data);
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      console.log("error in registering user", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-600">
      <div className="bg-white shadow-lg rounded-xl px-4 py-8 sm:px-8 max-w-md w-[90%]">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <AppInput
            label="First Name"
            name="firstName"
            placeholder="John"
            register={register}
            error={errors.firstName}
            autoFocus={true}
            rules={{
              required: "First Name is required",
              minLength: {
                value: 3,
                message: "First should contain at least 3 letters",
              },
            }}
          />
          <AppInput
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            register={register}
            error={errors.lastName}
            rules={{
              required: "Last Name is required",
              minLength: {
                value: 3,
                message: "Last should contain at least 3 letters",
              },
            }}
          />
          <AppInput
            label="Email"
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            register={register}
            error={errors.email}
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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-{}[\]|:;"'<>,./]).+$/,
                message:
                  "Password must include 1 uppercase letter, 1 number, and 1 special character",
              },
            }}
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition duration-300 cursor-pointer"
            disabled={isRegistering || isSubmitting}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>
        <AuthPageLink
          label="Already have an account?"
          linkText="Login Here"
          path="/login"
        />
      </div>
    </div>
  );
}
export default RegisterPage;
