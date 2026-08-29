import { useAppContext } from "../context/AuthContext";
import { useUpdateMyDetails, useChangePassword } from "../hooks/authHooks";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import AppInput from "../components/AppInput";

const ProfilePage = () => {
  const { user } = useAppContext();
  const { updateMyDetails, isUpdatingMyDetails } = useUpdateMyDetails();
  const { changePassword, isChangingPassword } = useChangePassword();

  const profileForm = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = profileForm;

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  const isChanged = watchFirstName !== user.firstName || watchLastName !== user.lastName;

  async function onSubmit(data) {
    try {
      await updateMyDetails(data);
      toast.success("Your profile updated successfully.");
    } catch (error) {
      console.log("error updating user details", error);
      toast.error(error?.message ?? "Failed to update profile.");
    }
  }

  async function onPasswordSubmit(data) {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully.");
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.log("error changing password", error);
      toast.error(error?.message ?? "Failed to change password.");
    }
  }

  return (
    <div className="page-wrap page-section max-w-3xl">
      <div className="surface p-6 sm:p-10">
        <div>
          <p className="section-kicker">Account settings</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em]">
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
            />

            <AppInput
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              rules={{}}
              disabled={true}
              className="disabled:!text-gray-500"
            />

            <button
              type="submit"
              disabled={!isChanged || isUpdatingMyDetails || isSubmitting}
              className={`w-full py-3 rounded-full transition-all shadow-md cursor-pointer
                ${isChanged ? "btn-primary" : "bg-[#d7d3c6] text-[#777] cursor-not-allowed"}`}
            >
              {isUpdatingMyDetails ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>

          <hr className="my-8 border-[#10261d]/15" />

          <h2 className="mb-4 font-serif text-3xl">Change Password</h2>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="mt-4 space-y-4">
            <AppInput
              label="Current password"
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
              register={passwordForm.register}
              error={passwordForm.formState.errors.currentPassword}
              rules={{ required: "Current password is required" }}
            />

            <AppInput
              label="New password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              register={passwordForm.register}
              error={passwordForm.formState.errors.newPassword}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "New password must be at least 8 characters",
                },
              }}
            />

            <AppInput
              label="Confirm new password"
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm new password"
              register={passwordForm.register}
              error={passwordForm.formState.errors.confirmNewPassword}
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === passwordForm.getValues("newPassword") || "Passwords do not match",
              }}
            />

            <button
              type="submit"
              disabled={isChangingPassword || passwordForm.formState.isSubmitting}
              className="btn-primary w-full"
            >
              {isChangingPassword ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
