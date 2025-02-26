
import { Bell, MessageCircle, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">RGUKT Connect</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-secondary transition-colors">
            <MessageCircle className="h-5 w-5 text-foreground" />
          </button>
          <button className="rounded-full p-2 hover:bg-secondary transition-colors">
            <User className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
