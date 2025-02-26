
import MainLayout from "@/components/MainLayout";
import { Users, MessageCircle, Calendar, Bell } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "5,234",
    icon: Users,
    change: "+12%",
  },
  {
    title: "Active Discussions",
    value: "1,432",
    icon: MessageCircle,
    change: "+8%",
  },
  {
    title: "Upcoming Events",
    value: "24",
    icon: Calendar,
    change: "+15%",
  },
  {
    title: "New Announcements",
    value: "12",
    icon: Bell,
    change: "+5%",
  },
];

const AdminPanel = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-up">
        <header>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor platform activities</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm">{stat.change}</span>
                <span className="text-gray-600 text-sm ml-2">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm text-gray-600">New user registered</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left rounded-lg border hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">Create Announcement</h3>
                <p className="text-sm text-gray-600">Post new updates</p>
              </button>
              <button className="p-4 text-left rounded-lg border hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-gray-600">View and edit users</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
