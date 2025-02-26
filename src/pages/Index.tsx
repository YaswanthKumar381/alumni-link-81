
import MainLayout from "@/components/MainLayout";
import { Calendar, MessageCircle, Users, Graduation } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Discussion Forums",
    description: "Engage in academic discussions with peers and faculty",
  },
  {
    icon: Users,
    title: "Student Clubs",
    description: "Join and participate in various university clubs",
  },
  {
    icon: Calendar,
    title: "Event Calendar",
    description: "Stay updated with university events and schedules",
  },
  {
    icon: Graduation,
    title: "Alumni Network",
    description: "Connect with alumni for mentorship and opportunities",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-up">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to RGUKT Connect
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Your unified platform for academic discussions, events, and networking
            within the RGUKT community
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg border bg-white p-8 shadow-sm">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Get Started Today
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Join your peers in creating a vibrant university community. Share
              knowledge, participate in events, and grow together.
            </p>
            <button className="rounded-full bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
              Join Now
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
