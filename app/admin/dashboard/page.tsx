"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  FolderTree,
  Bell,
  Database,
  Shield,
  CheckCircle,
  XCircle,
  PauseCircle,
  Eye,
  TrendingUp,
  AlertTriangle,
  Settings,
  Download,
  Filter,
  Search,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  FileText,
  UserCheck,
  Building,
  Mail,
  Lock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated");
    const storedEmail = localStorage.getItem("adminEmail");

    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Data for different sections
  const overviewStats = [
    {
      label: "Total Users",
      value: "24,892",
      icon: <Users className="w-5 h-5" />,
      change: "+12.5%",
      color: "from-blue-500 to-cyan-500",
      detail: "12,548 Job Seekers • 12,344 Employers",
    },
    {
      label: "Pending Approvals",
      value: "1,247",
      icon: <CheckCircle className="w-5 h-5" />,
      change: "+8",
      color: "from-amber-500 to-orange-500",
      detail: "842 Employers • 405 Job Posts",
    },
    {
      label: "Active Jobs",
      value: "8,956",
      icon: <Briefcase className="w-5 h-5" />,
      change: "+23%",
      color: "from-green-500 to-emerald-500",
      detail: "6,542 Full-time • 2,414 Part-time",
    },
    {
      label: "Reports",
      value: "342",
      icon: <AlertTriangle className="w-5 h-5" />,
      change: "-12%",
      color: "from-red-500 to-pink-500",
      detail: "284 Content • 58 User Reports",
    },
  ];

  const pendingUsers = [
    {
      id: "1",
      name: "Sokha Restaurant",
      email: "sokha@restaurant.kh",
      type: "Employer",
      date: "2024-01-15",
      status: "pending",
      details: "New restaurant chain, needs verification",
    },
    {
      id: "2",
      name: "Vannak Chan",
      email: "vannak@tech.kh",
      type: "Job Seeker",
      date: "2024-01-15",
      status: "pending",
      details: "Senior Developer, profile 90% complete",
    },
    {
      id: "3",
      name: "Angkor Tech Co.",
      email: "hr@angkortech.kh",
      type: "Employer",
      date: "2024-01-14",
      status: "pending",
      details: "IT company, 5 job posts pending",
    },
    {
      id: "4",
      name: "Srey Mom Lim",
      email: "sreymom@gmail.com",
      type: "Job Seeker",
      date: "2024-01-14",
      status: "pending",
      details: "Marketing Manager, 2 applications",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      user: "Phnom Penh Tech Hub",
      action: "Posted 3 new job listings",
      time: "10 minutes ago",
      type: "job_post",
      status: "success",
    },
    {
      id: "2",
      user: "Sophal Chen",
      action: "Applied for Senior Developer position",
      time: "25 minutes ago",
      type: "application",
      status: "success",
    },
    {
      id: "3",
      user: "System",
      action: "Daily database backup completed",
      time: "1 hour ago",
      type: "system",
      status: "success",
    },
    {
      id: "4",
      user: "Admin",
      action: "Suspended user: inappropriate content",
      time: "2 hours ago",
      type: "moderation",
      status: "warning",
    },
    {
      id: "5",
      user: "Siem Reap Hotel",
      action: "Account verification requested",
      time: "3 hours ago",
      type: "verification",
      status: "pending",
    },
  ];

  const platformMetrics = [
    { label: "Total Revenue", value: "$124,850", change: "+18.5%" },
    { label: "Active Sessions", value: "2,847", change: "+5.2%" },
    { label: "Avg. Response Time", value: "1.8s", change: "-0.3s" },
    { label: "Uptime", value: "99.97%", change: "+0.02%" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.change.includes("+")
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-700 font-medium mb-2">{stat.label}</p>
            <p className="text-gray-500 text-sm">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Approve Users</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Review pending account requests
            </p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">
                Verify Employers
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Validate business accounts
            </p>
          </button>
          <button className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200">
                <MessageSquare className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-medium text-gray-900">
                Moderate Content
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Review reported content
            </p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">View Analytics</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Platform performance metrics
            </p>
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Pending Approvals
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                    {user.type === "Employer" ? (
                      <Building className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Users className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.details}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Activities
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View logs →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "success"
                      ? "bg-green-100"
                      : activity.status === "warning"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                  }`}
                >
                  {activity.type === "job_post" ? (
                    <Briefcase
                      className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    />
                  ) : activity.type === "moderation" ? (
                    <Shield className="w-4 h-4 text-red-600" />
                  ) : (
                    <Database className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Platform Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100"
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div
                className={`text-xs px-2 py-1 rounded-full inline-block ${
                  metric.change.includes("+")
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">User Management</h3>
          <p className="text-gray-500 text-sm">
            Approve, suspend, or delete user accounts
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-3 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Users</option>
            <option>Job Seekers</option>
            <option>Employers</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-100">
              <th className="text-left py-3 px-4">
                <input type="checkbox" className="rounded border-blue-100" />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                User
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Joined
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "1",
                name: "Chantrea Sok",
                email: "chantrea@email.com",
                type: "Job Seeker",
                status: "active",
                date: "2024-01-10",
                jobCount: 3,
              },
              {
                id: "2",
                name: "Phnom Penh Tech",
                email: "hr@pptech.kh",
                type: "Employer",
                status: "pending",
                date: "2024-01-12",
                jobCount: 5,
              },
              {
                id: "3",
                name: "Vannak Lim",
                email: "vannak@dev.kh",
                type: "Job Seeker",
                status: "suspended",
                date: "2024-01-05",
                jobCount: 0,
              },
              {
                id: "4",
                name: "Siem Reap Hotel",
                email: "careers@srhotel.kh",
                type: "Employer",
                status: "active",
                date: "2024-01-08",
                jobCount: 8,
              },
              {
                id: "5",
                name: "Srey Mom Restaurant",
                email: "info@sreymom.kh",
                type: "Employer",
                status: "pending",
                date: "2024-01-14",
                jobCount: 2,
              },
            ].map((user) => (
              <tr
                key={user.id}
                className="border-b border-blue-50 hover:bg-blue-50/50"
              >
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded border-blue-100" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.type === "Job Seeker"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.date}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      View
                    </button>
                    {user.status === "pending" ? (
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                        Approve
                      </button>
                    ) : user.status === "active" ? (
                      <button className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200">
                        Suspend
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                        Activate
                      </button>
                    )}
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 pt-6 border-t border-blue-100 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {selectedUsers.length} users selected
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Approve Selected
          </button>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            Suspend Selected
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-white">
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage all aspects of the JobLink platform
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-blue-100 mb-6">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: <BarChart3 className="w-4 h-4" />,
            },
            {
              id: "users",
              label: "User Management",
              icon: <Users className="w-4 h-4" />,
            },
            {
              id: "verification",
              label: "Verification",
              icon: <Shield className="w-4 h-4" />,
            },
            {
              id: "moderation",
              label: "Content Moderation",
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              id: "categories",
              label: "Categories",
              icon: <FolderTree className="w-4 h-4" />,
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell className="w-4 h-4" />,
            },
            {
              id: "database",
              label: "Database",
              icon: <Database className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUserManagement()}

        {/* Other tabs would have similar implementations */}
        {activeTab !== "overview" && activeTab !== "users" && (
          <div className="bg-white rounded-xl border border-blue-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === "verification" && (
                <Shield className="w-8 h-8 text-blue-600" />
              )}
              {activeTab === "moderation" && (
                <MessageSquare className="w-8 h-8 text-blue-600" />
              )}
              {activeTab === "analytics" && (
                <TrendingUp className="w-8 h-8 text-blue-600" />
              )}
              {activeTab === "categories" && (
                <FolderTree className="w-8 h-8 text-blue-600" />
              )}
              {activeTab === "notifications" && (
                <Bell className="w-8 h-8 text-blue-600" />
              )}
              {activeTab === "database" && (
                <Database className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {activeTab === "verification" &&
                "Employer & Job Post Verification"}
              {activeTab === "moderation" && "Content Moderation"}
              {activeTab === "analytics" && "Platform Analytics"}
              {activeTab === "categories" && "Category Management"}
              {activeTab === "notifications" && "System Notifications"}
              {activeTab === "database" && "Database Management"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {activeTab === "verification" &&
                "Review and verify employer accounts and job postings for authenticity and compliance."}
              {activeTab === "moderation" &&
                "Monitor chats, job content, and user interactions to ensure platform safety."}
              {activeTab === "analytics" &&
                "View detailed platform metrics, user activity logs, and performance reports."}
              {activeTab === "categories" &&
                "Manage job categories, types, and industry classifications."}
              {activeTab === "notifications" &&
                "Send system-wide announcements and manage notification settings."}
              {activeTab === "database" &&
                "Backup, restore, and secure platform database with access logs."}
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
