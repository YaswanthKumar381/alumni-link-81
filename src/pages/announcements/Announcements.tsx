
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: "General" | "Academic" | "Event" | "Important";
};

const announcements: Announcement[] = [
  {
    id: "1",
    title: "End Semester Examination Schedule",
    content: "The end semester examinations for all departments will begin on May 15th, 2023. The detailed schedule has been published on the academic portal.",
    date: "2023-05-01",
    author: "Examination Department",
    category: "Academic"
  },
  {
    id: "2",
    title: "Campus Recruitment Drive",
    content: "TCS will be conducting a recruitment drive for all final year students on April 28th, 2023. Interested students must register by April 25th.",
    date: "2023-04-20",
    author: "Placement Cell",
    category: "Important"
  },
  {
    id: "3",
    title: "Annual Cultural Festival",
    content: "The annual cultural festival 'Abhivyakti' will be held from May 5th to May 7th, 2023. Students interested in participating should contact their department representatives.",
    date: "2023-04-15",
    author: "Cultural Committee",
    category: "Event"
  },
  {
    id: "4",
    title: "Library Timings Update",
    content: "The library will remain open till 10 PM during the examination period starting from May 1st, 2023.",
    date: "2023-04-10",
    author: "Library Department",
    category: "General"
  }
];

const getCategoryColor = (category: Announcement["category"]) => {
  switch (category) {
    case "Academic":
      return "bg-blue-100 text-blue-800";
    case "Event":
      return "bg-green-100 text-green-800";
    case "Important":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Announcements = () => {
  const [filter, setFilter] = useState<Announcement["category"] | "All">("All");

  const filteredAnnouncements = filter === "All" 
    ? announcements 
    : announcements.filter(announcement => announcement.category === filter);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setFilter("All")}>
              All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Academic")}>
              Academic
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Event")}>
              Events
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Important")}>
              Important
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("General")}>
              General
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.date).toLocaleDateString("en-US", { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                    {announcement.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{announcement.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {announcement.author}
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Announcements;
