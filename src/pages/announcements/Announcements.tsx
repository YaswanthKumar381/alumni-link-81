
import MainLayout from "@/components/MainLayout";
import { Bell, Calendar, User } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Important Examination Schedule Update",
    content: "Final examination dates have been revised. Please check the updated schedule.",
    author: "Academic Office",
    date: "2024-03-10",
    category: "Academic",
    priority: "High",
  },
  {
    id: 2,
    title: "Campus Placement Drive",
    content: "Major tech companies will be visiting for campus recruitment next week.",
    author: "Placement Cell",
    date: "2024-03-12",
    category: "Placement",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Library Timings Extended",
    content: "Library will remain open till 11 PM during examination period.",
    author: "Library Department",
    date: "2024-03-15",
    category: "Facility",
    priority: "Low",
  },
];

const Announcements = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-gray-600">Stay updated with important information</p>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
            New Announcement
          </button>
        </header>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        announcement.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : announcement.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {announcement.priority} Priority
                    </span>
                    <span className="text-sm text-gray-600">{announcement.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{announcement.title}</h3>
                  <p className="text-gray-600">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
                <Bell className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Announcements;
