
import { Briefcase, Calendar, GraduationCap, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: MessageCircle, label: "Discussions", path: "/discussions" },
  { icon: Users, label: "Clubs", path: "/clubs" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Briefcase, label: "Careers", path: "/careers" },
  { icon: GraduationCap, label: "Alumni", path: "/alumni" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-foreground hover:bg-secondary transition-colors"
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
