
import { Briefcase, Calendar, ChevronDown, FileText, GraduationCap, LayoutDashboard, MessageCircle, TableProperties, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Create different menu items for each role
const studentMenuItems = [
  { icon: MessageCircle, label: "Discussions", path: "/discussions" },
  { icon: Users, label: "Clubs", path: "/clubs" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Briefcase, label: "Careers", path: "/careers" },
  { icon: GraduationCap, label: "Alumni", path: "/alumni" },
  { icon: MessageCircle, label: "Chatrooms", path: "/chatrooms" },
  { icon: TableProperties, label: "Timetable", path: "/timetable" },
  { icon: FileText, label: "Announcements", path: "/announcements" },
];

const teacherMenuItems = [
  { icon: MessageCircle, label: "Discussions", path: "/discussions" },
  { icon: TableProperties, label: "Timetable", path: "/timetable" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Users, label: "Clubs", path: "/clubs" },
];

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Admin Dashboard", path: "/admin" },
  { icon: FileText, label: "Announcements", path: "/announcements" },
  { icon: Users, label: "Clubs", path: "/clubs" },
];

const Sidebar = () => {
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin" | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Get user role from localStorage
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const { role } = JSON.parse(authUser);
      setUserRole(role as "student" | "teacher" | "admin");
    }
  }, []);

  // Determine which menu items to show based on user role
  const menuItems = userRole === "student" 
    ? studentMenuItems 
    : userRole === "teacher" 
      ? teacherMenuItems 
      : userRole === "admin" 
        ? adminMenuItems 
        : [];

  return (
    <aside className="w-64 shrink-0">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              {userRole ? `Logged in as ${userRole}` : "Not logged in"}
            </span>
          </div>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-foreground hover:bg-secondary transition-colors ${
                location.pathname === item.path ? "bg-secondary font-medium" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
