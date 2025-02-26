
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Bookmark, Briefcase, Building, Calendar, MapPin, Network, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Dummy job postings data
const jobPostings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    location: "Hyderabad",
    type: "Full-time",
    postedDate: "2 days ago",
    description: "We are looking for a skilled Software Engineer to join our team...",
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Bangalore",
    type: "Internship",
    postedDate: "1 week ago",
    description: "3-month internship opportunity for students interested in data analysis...",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Remote",
    type: "Contract",
    postedDate: "3 days ago",
    description: "Seeking a frontend developer with React experience for a 6-month contract...",
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Chennai",
    type: "Full-time",
    postedDate: "Just now",
    description: "Join our team working on cutting-edge ML solutions...",
  },
  {
    id: 5,
    title: "Product Management Intern",
    company: "ProductHub",
    location: "Delhi",
    type: "Internship",
    postedDate: "2 weeks ago",
    description: "Learn product management in a fast-paced startup environment...",
  },
];

// Dummy networking events
const networkingEvents = [
  {
    id: 1,
    title: "Tech Career Fair",
    date: "June 15, 2023",
    location: "Main Campus",
    organizer: "Career Services",
  },
  {
    id: 2,
    title: "Alumni Networking Mixer",
    date: "July 3, 2023",
    location: "Virtual",
    organizer: "Alumni Association",
  },
  {
    id: 3,
    title: "Industry Expert Panel",
    date: "July 10, 2023",
    location: "Auditorium",
    organizer: "Engineering Department",
  },
];

type JobFilterType = "All" | "Full-time" | "Internship" | "Contract";

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<JobFilterType>("All");

  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === "All" || job.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-up">
        <header>
          <h1 className="text-3xl font-bold">Careers & Opportunities</h1>
          <p className="text-gray-600">
            Explore job postings, internships, and networking opportunities
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main job listings section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or locations..."
                    className="pl-10 pr-4 py-2 w-full border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {(["All", "Full-time", "Internship", "Contract"] as JobFilterType[]).map((filter) => (
                    <button
                      key={filter}
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeFilter === filter
                          ? "bg-primary text-white"
                          : "bg-secondary text-foreground"
                      }`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <button className="text-gray-500 hover:text-primary">
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-primary font-medium">{job.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {job.postedDate}
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600">{job.description}</p>
                      <div className="mt-4">
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No job postings found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with networking events and resources */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Networking Events</h2>
              <div className="space-y-4">
                {networkingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" /> {event.organizer}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      RSVP
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Career Resources</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    <span>Connect with Alumni</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-3 border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span>Resume Builder</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-3 border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Interview Preparation</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Careers;
