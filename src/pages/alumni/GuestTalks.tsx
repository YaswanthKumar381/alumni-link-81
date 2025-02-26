
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Calendar, Search, Filter, Presentation, ExternalLink, Video, MapPin, Clock, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type EventType = "Webinar" | "Workshop" | "Talk" | "Panel Discussion";

type Event = {
  id: number;
  title: string;
  speaker: string;
  speakerRole: string;
  company: string;
  date: string;
  time: string;
  venue: string | null;
  isOnline: boolean;
  link: string | null;
  type: EventType;
  description: string;
  topic: string;
  isRegistered: boolean;
};

// Mock data for events
const eventsData: Event[] = [
  {
    id: 1,
    title: "AI Career Paths and Opportunities",
    speaker: "Dr. Priya Sharma",
    speakerRole: "Senior Research Scientist",
    company: "Google AI",
    date: "2023-05-15",
    time: "6:00 PM - 7:30 PM",
    venue: null,
    isOnline: true,
    link: "https://meet.google.com/abc-defg-hij",
    type: "Webinar",
    description: "An in-depth exploration of various career paths in AI and machine learning, including research, product development, and entrepreneurship.",
    topic: "Artificial Intelligence",
    isRegistered: false,
  },
  {
    id: 2,
    title: "From RGUKT to Microsoft: My Journey",
    speaker: "Rahul Verma",
    speakerRole: "Software Engineering Manager",
    company: "Microsoft",
    date: "2023-05-20",
    time: "5:00 PM - 6:30 PM",
    venue: "Main Auditorium, RGUKT",
    isOnline: false,
    link: null,
    type: "Talk",
    description: "Rahul shares his journey from RGUKT to Microsoft, highlighting key decisions, challenges faced, and lessons learned along the way.",
    topic: "Career Development",
    isRegistered: true,
  },
  {
    id: 3,
    title: "Product Management Workshop",
    speaker: "Neha Patel",
    speakerRole: "Product Manager",
    company: "Amazon",
    date: "2023-06-05",
    time: "10:00 AM - 1:00 PM",
    venue: null,
    isOnline: true,
    link: "https://zoom.us/j/123456789",
    type: "Workshop",
    description: "A hands-on workshop on product management fundamentals, including market research, product strategy, and roadmap planning.",
    topic: "Product Management",
    isRegistered: false,
  },
  {
    id: 4,
    title: "Industry Trends in Cloud Computing",
    speaker: "Vikram Singh",
    speakerRole: "Systems Architect",
    company: "IBM",
    date: "2023-06-12",
    time: "7:00 PM - 8:30 PM",
    venue: null,
    isOnline: true,
    link: "https://teams.microsoft.com/l/meetup-join/123",
    type: "Webinar",
    description: "An overview of current trends in cloud computing, including multi-cloud strategies, serverless architecture, and edge computing.",
    topic: "Cloud Computing",
    isRegistered: false,
  },
];

const GuestTalks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterTopic, setFilterTopic] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch events from an API
    setEvents(eventsData);
  }, []);

  const handleRegister = (id: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, isRegistered: true } : event
      )
    );

    toast({
      title: "Registration successful",
      description: "You've been registered for the event. A calendar invite has been sent to your email.",
    });
  };

  const handleJoin = (event: Event) => {
    if (event.link) {
      window.open(event.link, "_blank");
      toast({
        title: "Joining event",
        description: "Opening event link in a new tab.",
      });
    }
  };

  // Get unique event types and topics for filtering
  const eventTypes = Array.from(new Set(events.map((event) => event.type))).sort();
  const topics = Array.from(new Set(events.map((event) => event.topic))).sort();

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? event.type === filterType : true;
    const matchesTopic = filterTopic ? event.topic === filterTopic : true;

    return matchesSearch && matchesType && matchesTopic;
  });

  // Sort events by date, with upcoming events first
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Guest Talks & Webinars
          </h1>
          <p className="text-foreground/60">
            Learn from alumni through talks, webinars, and interactive sessions
          </p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, speaker, or description..."
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
                <option value="">All Event Types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border rounded-md"
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
              >
                <option value="">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 md:w-2/3">
                    <div className="flex gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {event.type}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-xs rounded-full">
                        {event.topic}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-500 mb-4">
                      By {event.speaker}, {event.speakerRole} at {event.company}
                    </p>

                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {event.isOnline ? (
                          <>
                            <Video className="h-4 w-4" />
                            <span>Online Event</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 md:w-1/3 flex flex-col justify-center">
                    {event.isRegistered ? (
                      <>
                        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-md text-center mb-4">
                          You're registered
                        </div>
                        {event.isOnline && event.link && (
                          <Button onClick={() => handleJoin(event)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join Event
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button onClick={() => handleRegister(event.id)}>
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        Register Now
                      </Button>
                    )}
                    <p className="text-center text-xs text-gray-500 mt-4">
                      {event.isRegistered
                        ? "A calendar invite has been sent to your email"
                        : "Registration is free for all RGUKT students"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Presentation className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
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

export default GuestTalks;
