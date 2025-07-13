import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </h3>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Title = CardTitle;

export default Card;
