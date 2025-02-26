
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Chatroom = {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActive: string;
  type: "Department" | "Course" | "Year" | "Interest";
};

const chatrooms: Chatroom[] = [
  {
    id: "1",
    name: "CSE Department",
    description: "Official chatroom for Computer Science Department students and faculty",
    members: 245,
    lastActive: "2023-05-10T14:30:00",
    type: "Department"
  },
  {
    id: "2",
    name: "Data Structures",
    description: "Discussion group for Data Structures course",
    members: 120,
    lastActive: "2023-05-09T18:15:00",
    type: "Course"
  },
  {
    id: "3",
    name: "Batch 2023",
    description: "Chatroom for the graduating class of 2023",
    members: 180,
    lastActive: "2023-05-10T09:45:00",
    type: "Year"
  },
  {
    id: "4",
    name: "Competitive Programming",
    description: "Group for competitive programming enthusiasts",
    members: 75,
    lastActive: "2023-05-08T21:20:00",
    type: "Interest"
  },
  {
    id: "5",
    name: "ECE Department",
    description: "Official chatroom for Electronics and Communication Department",
    members: 210,
    lastActive: "2023-05-10T11:10:00",
    type: "Department"
  },
  {
    id: "6",
    name: "Machine Learning",
    description: "Discussion about machine learning concepts and projects",
    members: 95,
    lastActive: "2023-05-09T16:30:00",
    type: "Course"
  }
];

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffMins < 1440) {
    const hours = Math.floor(diffMins / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffMins / 1440);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

const Chatrooms = () => {
  const [filter, setFilter] = useState<Chatroom["type"] | "All">("All");

  const filteredChatrooms = filter === "All" 
    ? chatrooms 
    : chatrooms.filter(chatroom => chatroom.type === filter);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chatrooms</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setFilter("All")}>
              All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Department")}>
              Department
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Course")}>
              Course
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Year")}>
              Year
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter("Interest")}>
              Interest
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChatrooms.map((chatroom) => (
            <Card key={chatroom.id} className="hover:shadow-md transition-shadow animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {chatroom.name}
                </CardTitle>
                <CardDescription>{chatroom.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-3">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {chatroom.members} members
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Active {getTimeAgo(chatroom.lastActive)}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full">Join Chatroom</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Chatrooms;
