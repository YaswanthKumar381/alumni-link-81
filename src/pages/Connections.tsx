
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { User, MessageCircle, UserCheck, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const connectionsMockData = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "Alumni",
    position: "Software Engineer at Google",
    avatarUrl: null,
    connected: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Alumni",
    position: "Data Scientist at Microsoft",
    avatarUrl: null,
    connected: true,
  },
  {
    id: 3,
    name: "Ankit Patel",
    role: "Alumni",
    position: "Product Manager at Amazon",
    avatarUrl: null,
    connected: false,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Student",
    position: "Final Year CSE",
    avatarUrl: null,
    connected: true,
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Alumni",
    position: "ML Engineer at NVIDIA",
    avatarUrl: null,
    connected: false,
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "Student",
    position: "Third Year ECE",
    avatarUrl: null,
    connected: false,
  },
];

type Connection = {
  id: number;
  name: string;
  role: string;
  position: string;
  avatarUrl: string | null;
  connected: boolean;
};

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [filter, setFilter] = useState<"all" | "students" | "alumni">("all");
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch connections from an API
    setConnections(connectionsMockData);
  }, []);

  const handleConnect = (id: number) => {
    setConnections((prev) =>
      prev.map((connection) =>
        connection.id === id ? { ...connection, connected: true } : connection
      )
    );

    toast({
      title: "Connection request sent",
      description: "They will be notified of your request.",
    });
  };

  const handleMessage = (name: string) => {
    toast({
      title: "Chat opened",
      description: `You can now chat with ${name}`,
    });
  };

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch = connection.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesFilter =
      filter === "all" ||
      (filter === "students" && connection.role === "Student") ||
      (filter === "alumni" && connection.role === "Alumni");
    
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Connections</h1>
          <p className="text-foreground/60">
            Connect with students and alumni from RGUKT
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search connections..."
              className="pl-10 w-full p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={filter === "students" ? "default" : "outline"}
              onClick={() => setFilter("students")}
              className="flex-1"
            >
              Students
            </Button>
            <Button
              variant={filter === "alumni" ? "default" : "outline"}
              onClick={() => setFilter("alumni")}
              className="flex-1"
            >
              Alumni
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white rounded-lg shadow-sm p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{connection.name}</h3>
                    <p className="text-sm text-gray-500">{connection.position}</p>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                      {connection.role}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {connection.connected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleMessage(connection.name)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Connected
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleConnect(connection.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <User className="h-10 w-10 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No connections found</h3>
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

export default Connections;
