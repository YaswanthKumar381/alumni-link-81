
import MainLayout from "@/components/MainLayout";
import { MessageCircle, Users, Star, ArrowRight } from "lucide-react";

const chatrooms = [
  {
    id: 1,
    name: "Academic Discussion",
    description: "Discuss academic topics and share resources",
    participants: 156,
    category: "Academic",
    isActive: true,
  },
  {
    id: 2,
    name: "Campus Events",
    description: "Updates and discussions about upcoming events",
    participants: 234,
    category: "Events",
    isActive: true,
  },
  {
    id: 3,
    name: "Technical Hub",
    description: "Technical discussions and problem-solving",
    participants: 189,
    category: "Technical",
    isActive: false,
  },
];

const Chatrooms = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Chatrooms</h1>
            <p className="text-gray-600">Join discussions with your peers</p>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
            Create Chatroom
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatrooms.map((chatroom) => (
            <div
              key={chatroom.id}
              className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{chatroom.name}</h3>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-gray-600">{chatroom.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{chatroom.participants} Participants</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      chatroom.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {chatroom.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 rounded-full bg-secondary py-2 text-foreground hover:bg-secondary/80 transition-colors">
                  <span>Join Chat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Chatrooms;
