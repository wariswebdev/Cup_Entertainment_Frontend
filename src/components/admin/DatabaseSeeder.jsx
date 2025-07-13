import React, { useState } from "react";
import Button from "../ui/Button";
import { seedDatabase } from "../../utils/seedData";

const DatabaseSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      setMessage("Seeding database with sample data...");

      await seedDatabase();

      setMessage(
        "Database seeded successfully! Please refresh to see the data."
      );
    } catch (error) {
      setMessage("Error seeding database: " + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Development Tools
      </h3>
      <p className="text-yellow-700 mb-4">
        Click the button below to populate Firebase with sample data for
        testing.
      </p>
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleSeed}
          disabled={isSeeding}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          {isSeeding ? "Seeding..." : "Seed Sample Data"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatabaseSeeder;
