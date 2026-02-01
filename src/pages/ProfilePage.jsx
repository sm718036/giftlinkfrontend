import { useAppContext } from "../context/AuthContext";
import { useUpdateMyDetails } from "../hooks/authHooks";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import AppInput from "../components/AppInput";

const ProfilePage = () => {
  const { user } = useAppContext();
  const { updateMyDetails, isUpdatingMyDetails } = useUpdateMyDetails();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  const isChanged =
    watchFirstName !== user.firstName || watchLastName !== user.lastName;

  async function onSubmit(data) {
    try {
      await updateMyDetails(data);
      toast.success("Your profile updated successfully.");
    } catch (error) {
      console.log("error updating user details", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 p-6">
      <div className="shadow-2xl p-10 rounded-2xl text-center w-full max-w-lg">
        <div className="text-white">
          <h1 className="text-4xl font-bold text-yellow-300">
            Hi, {user.firstName + " " + user.lastName}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <AppInput
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
              rules={{
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "First name must be at least 3 characters",
                },
              }}
              variant="secondary"
            />

            <AppInput
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 3,
                  message: "Last name must be at least 3 characters",
                },
              }}
              variant="secondary"
            />

            <AppInput
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              rules={{}}
              variant="secondary"
              disabled={true}
              className="disabled:!text-gray-500"
            />

            <button
              type="submit"
              disabled={!isChanged || isUpdatingMyDetails || isSubmitting}
              className={`w-full py-3 rounded-full transition-all shadow-md cursor-pointer
                ${
                  isChanged
                    ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
            >
              {isUpdatingMyDetails ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
