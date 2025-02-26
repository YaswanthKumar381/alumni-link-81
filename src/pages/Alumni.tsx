
import MainLayout from "@/components/MainLayout";
import { Briefcase, GraduationCap, Mail, MapPin } from "lucide-react";

const alumni = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    graduation: "2015",
    role: "Senior Research Scientist",
    company: "Google AI",
    location: "Mountain View, CA",
    email: "priya.sharma@example.com",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
  },
  {
    id: 2,
    name: "Rahul Verma",
    graduation: "2017",
    role: "Software Engineering Manager",
    company: "Microsoft",
    location: "Hyderabad, India",
    email: "rahul.verma@example.com",
    expertise: ["Cloud Computing", "Software Architecture", "Team Leadership"],
  },
  {
    id: 3,
    name: "Neha Patel",
    graduation: "2018",
    role: "Product Manager",
    company: "Amazon",
    location: "Bengaluru, India",
    email: "neha.patel@example.com",
    expertise: ["Product Strategy", "UX Design", "Agile Management"],
  },
];

const Alumni = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Alumni Network</h1>
          <p className="text-foreground/60">
            Connect with RGUKT graduates and explore mentorship opportunities
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person) => (
            <div
              key={person.id}
              className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg text-foreground">
                    {person.name}
                  </h3>
                  <p className="text-sm text-foreground/60">Class of {person.graduation}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Briefcase className="h-4 w-4" />
                    <span>
                      {person.role} at {person.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="h-4 w-4" />
                    <span>{person.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Mail className="h-4 w-4" />
                    <span>{person.email}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {person.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Alumni;
