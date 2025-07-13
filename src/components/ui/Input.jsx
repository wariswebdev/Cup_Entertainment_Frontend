import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors placeholder-gray-500 dark:placeholder-gray-400";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
};

export default Input;
