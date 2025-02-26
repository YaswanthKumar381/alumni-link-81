
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, User, Plus, Search, Phone, Video, MoreVertical, Image, Paperclip, Smile } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
};

type Chat = {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  isOnline: boolean;
  role: "student" | "alumni" | "teacher";
};

// Mock data for chats
const initialChats: Chat[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: null,
    lastMessage: "Did you complete the assignment?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 3,
    isOnline: true,
    role: "student",
    messages: [
      {
        id: "101",
        content: "Hi, how are you doing?",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        isCurrentUser: false,
      },
      {
        id: "102",
        content: "I'm good, thanks for asking!",
        sender: "You",
        timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
        isCurrentUser: true,
      },
      {
        id: "103",
        content: "Are you coming to the study group tonight?",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isCurrentUser: false,
      },
      {
        id: "104",
        content: "Did you complete the assignment?",
        sender: "Priya Sharma",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "2",
    name: "Rahul Verma",
    avatar: null,
    lastMessage: "I can refer you for an internship position",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    isOnline: false,
    role: "alumni",
    messages: [
      {
        id: "201",
        content: "Hello, I saw your project on GitHub. Very impressive!",
        sender: "Rahul Verma",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isCurrentUser: false,
      },
      {
        id: "202",
        content: "Thank you so much! I worked hard on it.",
        sender: "You",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
        isCurrentUser: true,
      },
      {
        id: "203",
        content: "I can refer you for an internship position",
        sender: "Rahul Verma",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "3",
    name: "Prof. Gupta",
    avatar: null,
    lastMessage: "Please check the updated syllabus",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unreadCount: 1,
    isOnline: true,
    role: "teacher",
    messages: [
      {
        id: "301",
        content: "Good morning class, I've uploaded the lecture notes.",
        sender: "Prof. Gupta",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        isCurrentUser: false,
      },
      {
        id: "302",
        content: "Thank you, professor. I'll review them today.",
        sender: "You",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
        isCurrentUser: true,
      },
      {
        id: "303",
        content: "Please check the updated syllabus",
        sender: "Prof. Gupta",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        isCurrentUser: false,
      },
    ],
  },
];

const Chatrooms = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    if (activeChatId) {
      // Mark messages as read when chat becomes active
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId ? { ...chat, unreadCount: 0 } : chat
        )
      );
    }
  }, [activeChatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [activeChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "You",
      timestamp: new Date(),
      isCurrentUser: true,
    };

    // Add message to chat
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: input,
              lastMessageTime: new Date(),
            }
          : chat
      )
    );

    setInput("");

    // Simulate response after a delay (for demo purposes)
    setTimeout(() => {
      const activeChat = chats.find((chat) => chat.id === activeChatId);
      if (!activeChat) return;

      const responseMessages = [
        "Thanks for your message!",
        "I'll get back to you soon.",
        "That's interesting, tell me more.",
        "Let me check and get back to you.",
        "Yes, I'll be there!",
      ];

      const randomResponse =
        responseMessages[Math.floor(Math.random() * responseMessages.length)];

      const responseMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: activeChat.name,
        timestamp: new Date(),
        isCurrentUser: false,
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [...chat.messages, responseMessage],
                lastMessage: randomResponse,
                lastMessageTime: new Date(),
              }
            : chat
        )
      );
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewContact = () => {
    if (!newContactName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the new contact.",
        variant: "destructive",
      });
      return;
    }

    const roles: ("student" | "alumni" | "teacher")[] = ["student", "alumni", "teacher"];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const newChat: Chat = {
      id: Date.now().toString(),
      name: newContactName,
      avatar: null,
      lastMessage: "",
      lastMessageTime: new Date(),
      unreadCount: 0,
      isOnline: Math.random() > 0.5, // Randomly set online status
      role: randomRole,
      messages: [],
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChatId(newChat.id);
    setNewContactName("");

    toast({
      title: "Contact added",
      description: `${newContactName} has been added to your contacts.`,
    });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: "student" | "alumni" | "teacher") => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800";
      case "alumni":
        return "bg-purple-100 text-purple-800";
      case "teacher":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today - show time
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffDays === 1) {
      // Yesterday
      return "Yesterday";
    } else if (diffDays < 7) {
      // Within a week - show day name
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      // More than a week - show date
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-16rem)] border rounded-lg overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col h-full bg-white">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search chats"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-2 border-b flex justify-between items-center">
            <h2 className="font-medium text-sm">Chats</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Contact</DialogTitle>
                  <DialogDescription>
                    Add a new contact to start a conversation.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter contact name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={createNewContact}>Add Contact</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chats found. Start a new conversation.
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 flex ${
                    chat.id === activeChatId ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="relative mr-3">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white">
                      {chat.name.charAt(0)}
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(
                          chat.role
                        )}`}
                      >
                        {chat.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {activeChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white mr-3">
                  {activeChat.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{activeChat.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeChat.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Contact</DropdownMenuItem>
                    <DropdownMenuItem>Search</DropdownMenuItem>
                    <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Block Contact
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow-sm ${
                        message.isCurrentUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex justify-end mt-1">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-white flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Smile className="h-5 w-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </Button>
              <Input
                placeholder="Type a message"
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim()} 
                size="icon" 
                className="rounded-full"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Select a chat to start messaging
              </h3>
              <p className="text-gray-500 mb-6">
                Connect with students, alumni, and teachers
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Conversation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Contact</DialogTitle>
                    <DialogDescription>
                      Add a new contact to start a conversation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="contact-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Enter contact name"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={createNewContact}>Add Contact</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Chatrooms;
