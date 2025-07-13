import React from "react";
import { FileX } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  icon: Icon = FileX,
  title = "No data found",
  description = "There are no items to display at the moment.",
  action,
  actionText = "Add Item",
}) => {
  return (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {action && <Button onClick={action}>{actionText}</Button>}
    </div>
  );
};

export default EmptyState;
