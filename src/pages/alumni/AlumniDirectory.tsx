
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Search, Filter, GraduationCap, MapPin, Briefcase, Mail, UserPlus, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type AlumniProfile = {
  id: number;
  name: string;
  graduation: string;
  role: string;
  company: string;
  location: string;
  email: string;
  expertise: string[];
  connected: boolean;
  branch: string;
};

const alumniData: AlumniProfile[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    graduation: "2015",
    role: "Senior Research Scientist",
    company: "Google AI",
    location: "Mountain View, CA",
    email: "priya.sharma@example.com",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    connected: true,
    branch: "Computer Science & Engineering",
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
    connected: false,
    branch: "Computer Science & Engineering",
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
    connected: true,
    branch: "Information Technology",
  },
  {
    id: 4,
    name: "Aditya Kumar",
    graduation: "2016",
    role: "Financial Analyst",
    company: "JP Morgan Chase",
    location: "Mumbai, India",
    email: "aditya.kumar@example.com",
    expertise: ["Financial Modeling", "Investment Banking", "Risk Analysis"],
    connected: false,
    branch: "Mechanical Engineering",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    graduation: "2019",
    role: "UI/UX Designer",
    company: "Adobe",
    location: "Noida, India",
    email: "sneha.reddy@example.com",
    expertise: ["User Interface Design", "User Research", "Interaction Design"],
    connected: false,
    branch: "Electronics & Communication",
  },
  {
    id: 6,
    name: "Vikram Singh",
    graduation: "2014",
    role: "Systems Architect",
    company: "IBM",
    location: "Pune, India",
    email: "vikram.singh@example.com",
    expertise: ["System Design", "Enterprise Architecture", "Cloud Infrastructure"],
    connected: true,
    branch: "Computer Science & Engineering",
  },
];

const AlumniDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterBranch, setFilterBranch] = useState<string>("");
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch alumni from an API
    setAlumni(alumniData);
  }, []);

  const handleConnect = (id: number) => {
    setAlumni((prev) =>
      prev.map((person) =>
        person.id === id ? { ...person, connected: true } : person
      )
    );

    toast({
      title: "Connection request sent",
      description: "The alumnus will be notified of your request.",
    });
  };

  const handleMessage = (name: string) => {
    toast({
      title: "Chat opened",
      description: `You can now chat with ${name}`,
    });
  };

  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = filterYear ? person.graduation === filterYear : true;
    const matchesBranch = filterBranch ? person.branch === filterBranch : true;
    
    return matchesSearch && matchesYear && matchesBranch;
  });

  // Extract unique graduation years for filter
  const graduationYears = [...new Set(alumni.map(person => person.graduation))].sort();
  
  // Extract unique branches for filter
  const branches = [...new Set(alumni.map(person => person.branch))].sort();

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Alumni Directory</h1>
          <p className="text-foreground/60">
            Discover and connect with RGUKT graduates across industries
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or role..."
              className="pl-10 w-full p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="p-2 border rounded-md"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded-md"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person) => (
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
                  <p className="text-sm text-foreground/60">Class of {person.graduation} • {person.branch}</p>
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
                <div className="flex gap-2">
                  {person.connected ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleMessage(person.name)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleConnect(person.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AlumniDirectory;
