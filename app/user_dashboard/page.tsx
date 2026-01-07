import UserDashboard from "@/components/UserDashboard";

export const metadata = {
  title: "Dashboard | Jobly",
  description: "Manage your job posts and candidates",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <UserDashboard />
    </main>
  );
}