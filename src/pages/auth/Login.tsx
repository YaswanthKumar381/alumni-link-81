
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

// Dummy users for authentication
const dummyUsers = [
  { email: "student@rgukt.ac.in", password: "student123", role: "student" },
  { email: "teacher@rgukt.ac.in", password: "teacher123", role: "teacher" },
  { email: "admin@rgukt.ac.in", password: "admin123", role: "admin" },
  { email: "alumni@rgukt.ac.in", password: "alumni123", role: "alumni" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const user = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Store user role in localStorage
      localStorage.setItem("authUser", JSON.stringify({
        email: user.email,
        role: user.role,
        isAuthenticated: true
      }));

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.role}!`,
      });

      // Navigate based on role
      const route = user.role === "admin" 
        ? "/admin"
        : user.role === "teacher"
        ? "/timetable"
        : user.role === "alumni"
        ? "/alumni"
        : "/discussions";

      setIsLoading(false);
      navigate(route, { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-right">
              <Link to="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

