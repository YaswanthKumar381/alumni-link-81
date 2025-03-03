
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Discussions from "./pages/Discussions";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Alumni from "./pages/Alumni";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./pages/admin/AdminPanel";
import ChatbotAdmin from "./pages/admin/ChatbotAdmin";
import Announcements from "./pages/announcements/Announcements";
import Chatrooms from "./pages/chatrooms/Chatrooms";
import Timetable from "./pages/timetable/Timetable";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Connections from "./pages/Connections";
import YouAtRgukt from "./pages/alumni/YouAtRgukt";
import AlumniDirectory from "./pages/alumni/AlumniDirectory";
import NetworkingPortal from "./pages/alumni/NetworkingPortal";
import GuestTalks from "./pages/alumni/GuestTalks";
import JobReferrals from "./pages/alumni/JobReferrals";
import Chatbot from "./pages/chatbot/Chatbot";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected route that checks authentication
const ProtectedRoute = ({ 
  element, 
  requiredRole = null 
}: { 
  element: JSX.Element, 
  requiredRole?: "student" | "teacher" | "admin" | "alumni" | null 
}) => {
  const authUser = localStorage.getItem("authUser");
  
  if (!authUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const { role } = JSON.parse(authUser);
    if (role !== requiredRole) {
      // Wrong role, redirect to home
      return <Navigate to="/" replace />;
    }
  }

  return element;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authUser = localStorage.getItem("authUser");
      if (authUser) {
        const { isAuthenticated, role } = JSON.parse(authUser);
        setIsAuthenticated(isAuthenticated);
        setUserRole(role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth();
    // Listen for storage changes for multi-tab support
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={isAuthenticated ? <Index /> : <LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes - All users */}
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/discussions" element={<ProtectedRoute element={<Discussions />} />} />
            <Route path="/connections" element={<ProtectedRoute element={<Connections />} />} />
            <Route path="/chatbot" element={<ProtectedRoute element={<Chatbot />} />} />
            
            {/* Student & Teacher routes */}
            <Route path="/clubs" element={<ProtectedRoute element={<Clubs />} />} />
            <Route path="/events" element={<ProtectedRoute element={<Events />} />} />
            <Route path="/timetable" element={<ProtectedRoute element={<Timetable />} />} />
            
            {/* Student-only routes */}
            <Route 
              path="/careers" 
              element={<ProtectedRoute element={<Careers />} requiredRole="student" />} 
            />
            <Route 
              path="/alumni" 
              element={<ProtectedRoute element={<Alumni />} requiredRole="student" />} 
            />
            <Route 
              path="/chatrooms" 
              element={<ProtectedRoute element={<Chatrooms />} requiredRole="student" />} 
            />
            <Route 
              path="/announcements" 
              element={<ProtectedRoute element={<Announcements />} />} 
            />
            
            {/* Alumni-only routes */}
            <Route 
              path="/you-at-rgukt" 
              element={<ProtectedRoute element={<YouAtRgukt />} requiredRole="alumni" />} 
            />
            <Route 
              path="/alumni-directory" 
              element={<ProtectedRoute element={<AlumniDirectory />} requiredRole="alumni" />} 
            />
            <Route 
              path="/networking" 
              element={<ProtectedRoute element={<NetworkingPortal />} requiredRole="alumni" />} 
            />
            <Route 
              path="/guest-talks" 
              element={<ProtectedRoute element={<GuestTalks />} requiredRole="alumni" />} 
            />
            <Route 
              path="/job-referrals" 
              element={<ProtectedRoute element={<JobReferrals />} requiredRole="alumni" />} 
            />
            
            {/* Admin-only routes */}
            <Route 
              path="/admin" 
              element={<ProtectedRoute element={<AdminPanel />} requiredRole="admin" />} 
            />
            <Route 
              path="/admin/chatbot" 
              element={<ProtectedRoute element={<ChatbotAdmin />} requiredRole="admin" />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
