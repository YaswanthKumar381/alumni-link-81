
import { Bell, LogOut, MessageCircle, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const { isAuthenticated, role, name, email } = JSON.parse(authUser);
      setIsAuthenticated(isAuthenticated);
      setUserRole(role);
      setUserName(name || email.split('@')[0]);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default action
    localStorage.removeItem("authUser");
    setIsAuthenticated(false);
    setUserRole(null);
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    navigate("/"); // Use navigate for programmatic navigation
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-xl font-bold text-primary cursor-pointer">RGUKT Connect</h1>
          </Link>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-secondary transition-colors">
              <Bell className="h-5 w-5 text-foreground" />
            </button>
            <Link to="/chatbot" className="rounded-full p-2 hover:bg-secondary transition-colors">
              <MessageCircle className="h-5 w-5 text-foreground" />
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full p-2 hover:bg-secondary transition-colors">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline-block font-medium">{userName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {userRole && <p className="text-xs text-muted-foreground">{userRole}</p>}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
