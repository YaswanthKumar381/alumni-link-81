import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, User, Bot, Loader2, Plus, Trash2 } from "lucide-react";
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
  sender: "user" | "bot";
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "default",
      title: "New Conversation",
      createdAt: new Date(),
      messages: [
        {
          id: "welcome",
          content: "Hello! How can I assist you with your university-related questions today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("default");
  const [showSidebar, setShowSidebar] = useState(true);
  const [newChatTitle, setNewChatTitle] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const generateResponse = async (query: string) => {
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const chatbotSettings = localStorage.getItem("chatbotSettings");
    let persona = "helpful";
    let tone = "professional";
    
    if (chatbotSettings) {
      const settings = JSON.parse(chatbotSettings);
      persona = settings.persona || persona;
      tone = settings.tone || tone;
    }
    
    const responses: Record<string, Record<string, string>> = {
      friendly: {
        "class": "Classes run between 8 AM and 5 PM on weekdays. You can check your personal schedule in the Timetable section! 😊",
        "event": "Exciting news! The Annual College Fest is coming up on November 15th. Check out the Events section for more fun activities!",
        "exam": "Don't worry about exam schedules yet! They'll be posted two weeks before exam period. Midterms usually happen in week 8 of each semester.",
        "deadline": "Assignment deadlines are set by each professor. Be sure to check your course syllabus or announcements section so you don't miss anything!",
        "admission": "For admission questions, you can email admissions@rgukt.ac.in or just drop by the Admin building during office hours. They're super helpful!",
        "library": "The library is open from 8 AM to 10 PM weekdays, and 9 AM to 6 PM on weekends. It's a great place to study!",
        "default": "I don't have specific info about that yet, but I'd be happy to help you find the answer! Maybe check the university website or contact the relevant department?"
      },
      professional: {
        "class": "Classes are scheduled between 8:00 AM and 5:00 PM on weekdays. You can access your specific timetable in the Timetable section.",
        "event": "The next major event is the Annual College Fest on November 15th. Please refer to the Events section for a complete calendar of upcoming activities.",
        "exam": "The final examination schedule will be released two weeks before the exam period. Midterm examinations typically take place during the 8th week of each semester.",
        "deadline": "Assignment submission deadlines vary by course. Please consult your course syllabus or the announcements section for specific deadline information.",
        "admission": "Admission inquiries should be directed to the Admissions Office at admissions@rgukt.ac.in or by visiting the Administration building during office hours.",
        "library": "The university library is open from 8:00 AM to 10:00 PM on weekdays, and 9:00 AM to 6:00 PM on weekends.",
        "default": "I don't have specific information about that. Please check the university website or contact the relevant department for more details."
      },
      casual: {
        "class": "Classes run 8 to 5 on weekdays. Check your timetable to see your specific schedule.",
        "event": "Big news - Annual College Fest is Nov 15th! Check the Events section for more cool stuff coming up.",
        "exam": "Final exam schedule drops about two weeks before exams start. Midterms usually hit around week 8. No need to stress yet.",
        "deadline": "Deadlines depend on your courses. Take a quick look at your syllabus or check announcements so you don't miss anything.",
        "admission": "For admission stuff, shoot an email to admissions@rgukt.ac.in or swing by the Admin building when they're open.",
        "library": "Library's open 8 AM to 10 PM weekdays, 9 to 6 on weekends. Great spot to get work done.",
        "default": "Don't have that info yet. Try the university website or maybe ask the department directly?"
      }
    };
    
    let responseText = responses[tone]?.default || responses.professional.default;
    Object.keys(responses[tone] || responses.professional).forEach(keyword => {
      if (query.toLowerCase().includes(keyword)) {
        responseText = responses[tone]?.[keyword] || responses.professional[keyword];
      }
    });
    
    if (persona === "mentor") {
      responseText = "As your academic mentor, I'd suggest: " + responseText;
    } else if (persona === "friend") {
      responseText = "Hey there! " + responseText;
    } else if (persona === "expert") {
      responseText = "Based on university policy, " + responseText;
    }
    
    setIsLoading(false);
    return responseText;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    
    setInput("");
    
    try {
      const responseText = await generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const createNewChat = () => {
    const title = newChatTitle.trim() || `New Chat ${chats.length + 1}`;
    const newChat: Chat = {
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
      messages: [
        {
          id: "welcome",
          content: "Hello! How can I assist you with your university-related questions today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    };
    
    setChats(prevChats => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
    setNewChatTitle("");
  };

  const deleteChat = (chatId: string) => {
    if (chats.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need to have at least one chat.",
        variant: "destructive",
      });
      return;
    }
    
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    
    if (activeChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setActiveChatId(remainingChats[0].id);
    }
    
    toast({
      title: "Chat deleted",
      description: "The chat has been deleted successfully.",
    });
  };

  const formatChatTitle = (chat: Chat) => {
    if (chat.messages.length > 1) {
      const firstUserMessage = chat.messages.find(msg => msg.sender === "user");
      if (firstUserMessage) {
        const title = firstUserMessage.content.length > 20
          ? firstUserMessage.content.substring(0, 20) + "..."
          : firstUserMessage.content;
        return title;
      }
    }
    
    return chat.title;
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-16rem)]">
        {showSidebar && (
          <div className="w-64 border-r flex flex-col h-full">
            <div className="p-4 border-b">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Chat</DialogTitle>
                    <DialogDescription>
                      Enter a title for your new chat session.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="name" className="text-right">
                      Chat Title
                    </Label>
                    <Input
                      id="name"
                      placeholder="E.g., Course Questions"
                      value={newChatTitle}
                      onChange={(e) => setNewChatTitle(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={createNewChat}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                    chat.id === activeChatId ? "bg-gray-100" : ""
                  }`}
                >
                  <div
                    className="flex-1 overflow-hidden"
                    onClick={() => setActiveChatId(chat.id)}
                  >
                    <p className="font-medium truncate">{formatChatTitle(chat)}</p>
                    <p className="text-xs text-gray-500">
                      {chat.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1">
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="max-w-3xl mx-auto space-y-4">
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-md items-start space-x-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border"
                    } p-3 rounded-lg shadow-sm`}
                  >
                    {message.sender === "bot" && (
                      <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                    )}
                    <div className="space-y-1">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <User className="h-5 w-5 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border p-3 rounded-lg flex items-center space-x-2 shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <div className="max-w-3xl mx-auto flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about class schedules, events, deadlines..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chatbot;
