
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Search, MessageCircle, Calendar, Users, Filter, UserPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type MentorProfile = {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  bio: string;
  availability: string;
  image: string | null;
};

const mentorsData: MentorProfile[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Senior Research Scientist",
    company: "Google AI",
    expertise: ["AI Research", "Machine Learning", "Career Guidance"],
    bio: "I help students navigate the complex world of AI research and industry applications. With 7 years of experience at Google AI, I can provide insights into research roles and industry expectations.",
    availability: "Weekends",
    image: null,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineering Manager",
    company: "Microsoft",
    expertise: ["Software Development", "Team Leadership", "Interview Preparation"],
    bio: "Having been through the entire journey from a junior developer to a manager, I can help with career planning, interview preparation, and understanding the tech industry landscape.",
    availability: "Tuesday & Thursday evenings",
    image: null,
  },
  {
    id: 3,
    name: "Neha Patel",
    role: "Product Manager",
    company: "Amazon",
    expertise: ["Product Management", "UX Design", "Business Strategy"],
    bio: "I help students understand the product management role and how to transition from engineering to product. I also provide guidance on building a product portfolio and preparation for PM interviews.",
    availability: "Monday evenings",
    image: null,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Systems Architect",
    company: "IBM",
    expertise: ["System Design", "Cloud Architecture", "Technical Leadership"],
    bio: "With over 8 years of experience in designing large-scale systems, I can help students understand system architecture, preparing for system design interviews, and technical career paths.",
    availability: "Weekends",
    image: null,
  },
];

const NetworkingPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState<string>("");
  const [mentors, setMentors] = useState<MentorProfile[]>(mentorsData);
  const { toast } = useToast();

  const handleRequestMentorship = (mentor: MentorProfile) => {
    toast({
      title: "Mentorship request sent",
      description: `Your request has been sent to ${mentor.name}. They will contact you soon.`,
    });
  };

  const handleScheduleCall = (mentor: MentorProfile) => {
    toast({
      title: "Call scheduling initiated",
      description: `You'll be redirected to schedule a call with ${mentor.name}.`,
    });
  };

  // Get unique expertise areas for filtering
  const expertiseAreas = Array.from(
    new Set(mentors.flatMap((mentor) => mentor.expertise))
  ).sort();

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExpertise = filterExpertise
      ? mentor.expertise.some((skill) => skill === filterExpertise)
      : true;

    return matchesSearch && matchesExpertise;
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Networking & Mentorship
          </h1>
          <p className="text-foreground/60">
            Connect with alumni mentors for career advice and industry insights
          </p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, role, or company..."
                className="pl-10 w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="p-2 border rounded-md"
              value={filterExpertise}
              onChange={(e) => setFilterExpertise(e.target.value)}
            >
              <option value="">All Expertise Areas</option>
              {expertiseAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-100 rounded-full px-3 py-1 text-xs text-blue-800 flex items-center">
              <Filter className="h-3 w-3 mr-1" />
              <span>Mentorship Type:</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              1:1 Advice
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Mock Interviews
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              <Users className="h-3 w-3 mr-1" />
              Group Sessions
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border"
            >
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {mentor.role} at {mentor.company}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">{mentor.bio}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="bg-secondary rounded-full px-3 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Available: {mentor.availability}</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleScheduleCall(mentor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleRequestMentorship(mentor)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Request Mentorship
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NetworkingPortal;
