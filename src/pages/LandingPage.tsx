
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, GraduationCap, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MessageCircle,
    title: "Seamless Communication",
    description: "Connect with peers and faculty through discussion forums and direct messaging."
  },
  {
    icon: BookOpen,
    title: "Academic Resources",
    description: "Access course materials, timetables, and announcements all in one place."
  },
  {
    icon: Users,
    title: "Student Clubs",
    description: "Join and participate in university clubs and special interest groups."
  },
  {
    icon: Calendar,
    title: "Event Management",
    description: "Stay updated with campus events, workshops, and important dates."
  },
  {
    icon: GraduationCap,
    title: "Alumni Network",
    description: "Connect with graduates for mentorship and career opportunities."
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Navbar */}
      <nav className="container mx-auto flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">RGUKT Connect</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
          Your Complete University Experience in One Platform
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          RGUKT Connect brings together students, faculty, and alumni in a single unified campus portal
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Join thousands of students and faculty who are already using RGUKT Connect
          </p>
          <Link to="/signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2023 RGUKT Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
