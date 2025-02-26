
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Search, Filter, Briefcase, MapPin, Clock, Building, Calendar, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type JobType = "Full-time" | "Internship" | "Part-time";
type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  referredBy: string | null;
  alumniContact: string;
  appliedStatus: "not_applied" | "applied" | "referred";
  url: string;
};

// Mock data for jobs
const jobsData: Job[] = [
  {
    id: 1,
    title: "Machine Learning Engineer",
    company: "Google",
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    experience: "Mid Level",
    posted: "2023-04-28",
    deadline: "2023-05-28",
    description: "As a Machine Learning Engineer at Google, you will develop machine learning models and algorithms to solve complex problems across various Google products.",
    requirements: [
      "Bachelor's or Master's degree in Computer Science, AI, or related field",
      "3+ years of experience in machine learning or AI development",
      "Proficiency in Python and TensorFlow/PyTorch",
      "Strong understanding of ML algorithms and data structures",
    ],
    referredBy: "Dr. Priya Sharma",
    alumniContact: "priya.sharma@example.com",
    appliedStatus: "not_applied",
    url: "https://careers.google.com/jobs",
  },
  {
    id: 2,
    title: "Software Development Engineer",
    company: "Amazon",
    location: "Hyderabad, India (On-site)",
    type: "Full-time",
    experience: "Entry Level",
    posted: "2023-05-05",
    deadline: "2023-06-05",
    description: "Join Amazon as a Software Development Engineer to build innovative solutions for Amazon's e-commerce platform and services.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Strong coding skills in at least one language (Java, C++, Python)",
      "Familiarity with data structures and algorithms",
      "Good problem-solving abilities",
    ],
    referredBy: "Neha Patel",
    alumniContact: "neha.patel@example.com",
    appliedStatus: "applied",
    url: "https://amazon.jobs",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Microsoft",
    location: "Remote",
    type: "Internship",
    experience: "Entry Level",
    posted: "2023-05-10",
    deadline: "2023-05-30",
    description: "Join Microsoft for a 3-month internship as a Data Science Intern, working on real-world data problems and gaining valuable industry experience.",
    requirements: [
      "Currently pursuing Bachelor's or Master's in Data Science, CS, or related field",
      "Knowledge of Python, R, or other data analysis tools",
      "Basic understanding of machine learning concepts",
      "Strong analytical and problem-solving skills",
    ],
    referredBy: "Rahul Verma",
    alumniContact: "rahul.verma@example.com",
    appliedStatus: "not_applied",
    url: "https://careers.microsoft.com/students",
  },
  {
    id: 4,
    title: "Cloud Solutions Architect",
    company: "IBM",
    location: "Pune, India (Hybrid)",
    type: "Full-time",
    experience: "Senior Level",
    posted: "2023-05-02",
    deadline: "2023-06-02",
    description: "Design and implement cloud solutions for enterprise clients, focusing on hybrid cloud architectures and digital transformation.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in cloud architecture or solutions engineering",
      "Experience with IBM Cloud, AWS, Azure, or GCP",
      "Strong communication and client-facing skills",
    ],
    referredBy: "Vikram Singh",
    alumniContact: "vikram.singh@example.com",
    appliedStatus: "referred",
    url: "https://careers.ibm.com",
  },
];

const JobReferrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterExperience, setFilterExperience] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch jobs from an API
    setJobs(jobsData);
  }, []);

  const handleApply = (id: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, appliedStatus: "applied" } : job
      )
    );

    toast({
      title: "Application submitted",
      description: "Your application has been sent. The alumni will be notified.",
    });
  };

  const handleRequestReferral = (id: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, appliedStatus: "referred" } : job
      )
    );

    toast({
      title: "Referral requested",
      description: "Your referral request has been sent to the alumni. They will contact you shortly.",
    });
  };

  // Get unique job types and experience levels for filtering
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type))).sort();
  const experienceLevels = Array.from(new Set(jobs.map((job) => job.experience))).sort();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? job.type === filterType : true;
    const matchesExperience = filterExperience ? job.experience === filterExperience : true;

    return matchesSearch && matchesType && matchesExperience;
  });

  // Sort jobs by posting date, with newest first
  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime()
  );

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Job Referrals & Opportunities
          </h1>
          <p className="text-foreground/60">
            Discover job opportunities with referrals from RGUKT alumni
          </p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or description..."
                className="pl-10 w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="p-2 border rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Job Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border rounded-md"
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
              >
                <option value="">All Experience Levels</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-secondary text-xs rounded-full">
                          {job.experience}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:text-right">
                      <div className="text-xs text-gray-500 mb-1">
                        Posted on {new Date(job.posted).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b py-4 my-4">
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="bg-blue-50 p-3 rounded-md mb-4 md:mb-0">
                      <h4 className="text-sm font-medium text-blue-700 mb-1">Referred by Alumni</h4>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm">{job.referredBy}</span>
                        <span className="text-xs text-gray-500">({job.alumniContact})</span>
                      </div>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2">
                      {job.appliedStatus === "not_applied" && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => window.open(job.url, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleRequestReferral(job.id)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Request Referral
                          </Button>
                        </>
                      )}

                      {job.appliedStatus === "applied" && (
                        <Button variant="secondary" disabled>
                          Application Submitted
                        </Button>
                      )}

                      {job.appliedStatus === "referred" && (
                        <Button variant="secondary" disabled>
                          Referral Requested
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <div className="flex items-center justify-end text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Apply before: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default JobReferrals;
