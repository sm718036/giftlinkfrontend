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
  className = "",
  ...props
}) => {
  const baseStyles = `field ${error ? "!border-red-600" : ""}`;
  const labelStyles = "form-label text-left";

  return (
    <div className="mb-5">
      <label className={labelStyles} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`${baseStyles} ${className}`}
        {...register(name, rules)}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-700" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AppInput;
