import React from "react";

const AppInput = ({
  label,
  type = "text",
  name,
  placeholder,
  autoFocus = false,
  register,
  error,
  rules,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    variant === "primary"
      ? `w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none ${
          error ? "border-red-500" : "focus:border-purple-500"
        }`
      : `w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600`;

  const labelStyles =
    variant === "primary"
      ? "block text-gray-700"
      : "block text-white text-left mb-1";

  return (
    <div className="mb-4">
      <label className={labelStyles}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`${baseStyles} ${className}`}
        {...register(name, rules)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default AppInput;
