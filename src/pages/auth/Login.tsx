
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

// Dummy users for authentication
const dummyUsers = [
  { email: "student@rgukt.ac.in", password: "student123", role: "student" },
  { email: "teacher@rgukt.ac.in", password: "teacher123", role: "teacher" },
  { email: "admin@rgukt.ac.in", password: "admin123", role: "admin" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = dummyUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Store user role in localStorage for demo purposes
        localStorage.setItem("authUser", JSON.stringify({
          email: user.email,
          role: user.role,
          isAuthenticated: true
        }));

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.role}!`,
        });

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
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
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
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
          <div className="border-t pt-4 mt-4">
            <p className="text-xs text-center text-gray-500">
              Demo Accounts:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="border rounded p-2">
                <p className="font-semibold">Student</p>
                <p>student@rgukt.ac.in</p>
                <p>student123</p>
              </div>
              <div className="border rounded p-2">
                <p className="font-semibold">Teacher</p>
                <p>teacher@rgukt.ac.in</p>
                <p>teacher123</p>
              </div>
              <div className="border rounded p-2">
                <p className="font-semibold">Admin</p>
                <p>admin@rgukt.ac.in</p>
                <p>admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
