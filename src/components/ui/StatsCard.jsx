import React from "react";
import Card from "./Card";

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  return (
    <Card>
      <Card.Content>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm ${
                    changeType === "positive"
                      ? "text-green-600"
                      : changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {change}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  from last month
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default StatsCard;
