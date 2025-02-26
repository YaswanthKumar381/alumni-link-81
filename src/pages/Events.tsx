
import MainLayout from "@/components/MainLayout";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Annual Tech Symposium",
    date: "March 15, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium",
    attendees: 250,
    category: "Academic",
    description: "A day-long event featuring keynote speakers, workshops, and project exhibitions",
  },
  {
    id: 2,
    title: "Cultural Night 2024",
    date: "March 20, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Open Air Theatre",
    attendees: 500,
    category: "Cultural",
    description: "An evening of music, dance, and theatrical performances by students",
  },
  {
    id: 3,
    title: "Career Fair Spring 2024",
    date: "March 25, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "University Convention Center",
    attendees: 300,
    category: "Career",
    description: "Meet recruiters from top companies and explore job opportunities",
  },
];

const Events = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Upcoming Events</h1>
          <p className="text-foreground/60">
            Stay updated with the latest events and activities at RGUKT
          </p>
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
            Submit Event
          </button>
        </header>

        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 flex-shrink-0">
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto text-primary" />
                    <div className="mt-2 font-semibold text-foreground">
                      {event.date}
                    </div>
                    <div className="text-sm text-foreground/60">{event.category}</div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-foreground/80">{event.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} Attending</span>
                    </div>
                  </div>
                  <button className="rounded-full border border-primary px-4 py-1.5 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    Register Now
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

export default Events;
