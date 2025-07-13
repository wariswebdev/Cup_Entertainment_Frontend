import React from "react";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  multiple = false,
  label,
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

  const handleChange = (e) => {
    if (onChange) {
      if (multiple) {
        const selectedOptions = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        onChange(selectedOptions);
      } else {
        onChange(e);
      }
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        value={multiple ? undefined : value}
        onChange={handleChange}
        className={`${baseClasses} ${className}`}
        disabled={disabled}
        multiple={multiple}
        {...props}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={
              multiple && Array.isArray(value) && value.includes(option.value)
            }
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
