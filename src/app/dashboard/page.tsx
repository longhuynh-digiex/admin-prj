"use client";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/queries/useAuth";
import { useAuthStore } from "@/store";

function Dashboard() {
  const { data } = useGetMeQuery();
  const { clearAuth } = useAuthStore.getState();
  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default Dashboard;
