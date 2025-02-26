
import MainLayout from "@/components/MainLayout";
import { Users, Calendar, BookOpen, Camera } from "lucide-react";

const clubs = [
  {
    id: 1,
    name: "Tech Innovators Club",
    category: "Technology",
    members: 156,
    icon: BookOpen,
    description: "Exploring cutting-edge technologies and innovation",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Photography Society",
    category: "Arts",
    members: 89,
    icon: Camera,
    description: "Capturing moments and sharing creative perspectives",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Coding Club",
    category: "Technology",
    members: 234,
    icon: BookOpen,
    description: "Learning and practicing programming together",
    color: "bg-green-500",
  },
];

const Clubs = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Student Clubs</h1>
          <p className="text-foreground/60">
            Join and participate in various university clubs and activities
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="rounded-lg border bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-32 ${club.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <club.icon className="h-16 w-16" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {club.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{club.category}</p>
                </div>
                <p className="text-foreground/80">{club.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Users className="h-4 w-4" />
                    <span>{club.members} Members</span>
                  </div>
                  <button className="rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 transition-colors">
                    Join Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Clubs;
