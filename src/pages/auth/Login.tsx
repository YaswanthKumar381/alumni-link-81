
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username, full_name')
          .eq('id', user.id)
          .single();

        const defaultName = email.split('@')[0];
        const userData = {
          email: user.email,
          role: profile?.role || 'student',
          name: profile?.full_name || defaultName,
          isAuthenticated: true
        };

        localStorage.setItem("authUser", JSON.stringify(userData));

        toast({
          title: "Login successful",
          description: `Welcome back, ${profile?.username || defaultName}!`,
        });

        const route = profile?.role === "admin" 
          ? "/admin"
          : profile?.role === "teacher"
          ? "/timetable"
          : profile?.role === "alumni"
          ? "/alumni"
          : "/discussions";

        navigate(route, { 
          replace: true,
          state: { from: "login" }
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Try again.",
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
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
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
