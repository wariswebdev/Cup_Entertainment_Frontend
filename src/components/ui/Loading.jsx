import React from "react";

const Loading = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 ${sizeClasses[size]}`}
      ></div>
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-body">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
