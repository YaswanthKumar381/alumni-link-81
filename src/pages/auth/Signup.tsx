
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GraduationCap, Shield, User, BookOpen } from "lucide-react";

type UserRole = "student" | "teacher" | "admin" | "alumni";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (e: React.MouseEvent<HTMLButtonElement>, selectedRole: UserRole) => {
    e.preventDefault();
    setRole(selectedRole);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Crucial: prevent form submission
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store user in localStorage for demo
      localStorage.setItem("authUser", JSON.stringify({
        email,
        role,
        name: `${firstName} ${lastName}`,
        isAuthenticated: true
      }));
      
      toast({
        title: "Account created successfully",
        description: `Welcome to RGUKT Connect, ${firstName}!`,
      });

      // Navigate based on role
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/timetable");
          break;
        case "alumni":
          navigate("/you-at-rgukt");
          break;
        default:
          navigate("/discussions");
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-sm text-gray-600">Join the RGUKT community</p>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={(e) => handleRoleSelect(e, "student")}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${
                role === "student" ? "bg-primary/10 border-primary" : ""
              }`}
            >
              <GraduationCap className={`h-6 w-6 ${role === "student" ? "text-primary" : "text-gray-500"}`} />
              <span className="text-sm">Student</span>
            </button>
            <button
              type="button"
              onClick={(e) => handleRoleSelect(e, "teacher")}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${
                role === "teacher" ? "bg-primary/10 border-primary" : ""
              }`}
            >
              <User className={`h-6 w-6 ${role === "teacher" ? "text-primary" : "text-gray-500"}`} />
              <span className="text-sm">Teacher</span>
            </button>
            <button
              type="button"
              onClick={(e) => handleRoleSelect(e, "admin")}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${
                role === "admin" ? "bg-primary/10 border-primary" : ""
              }`}
            >
              <Shield className={`h-6 w-6 ${role === "admin" ? "text-primary" : "text-gray-500"}`} />
              <span className="text-sm">Admin</span>
            </button>
            <button
              type="button"
              onClick={(e) => handleRoleSelect(e, "alumni")}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors ${
                role === "alumni" ? "bg-primary/10 border-primary" : ""
              }`}
            >
              <BookOpen className={`h-6 w-6 ${role === "alumni" ? "text-primary" : "text-gray-500"}`} />
              <span className="text-sm">Alumni</span>
            </button>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
          <div className="text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
