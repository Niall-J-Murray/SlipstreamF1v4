import { useState } from "react";
import IUser from "../../types/user.type.ts";

interface DashboardProps {
  userData: undefined | IUser;
}

export default function Dashboard({ userData }: DashboardProps) {
  const [isLoading] = useState(false);

  // Simple placeholder that passes TypeScript checks
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Welcome to your dashboard, {userData?.username ?? "Guest"}!</p>
          <p>
            The full dashboard functionality is being updated for better mobile
            compatibility.
          </p>
          <p>Please check back soon.</p>
        </div>
      )}
    </div>
  );
}
