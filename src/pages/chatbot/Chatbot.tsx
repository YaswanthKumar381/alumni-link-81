
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, User, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! How can I assist you with your university-related questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (query: string) => {
    // This would be replaced with an actual API call to your backend
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Example responses based on common university questions
    const responses: Record<string, string> = {
      "class": "Classes are typically scheduled between 8:00 AM and 5:00 PM on weekdays. You can check your specific timetable in the Timetable section.",
      "event": "Upcoming events can be found in the Events section. The next major event is the Annual College Fest on November 15th.",
      "exam": "The final examination schedule will be released two weeks before the exam period. Midterm exams are typically held in the 8th week of each semester.",
      "deadline": "Assignment submission deadlines vary by course. Please check your course syllabus or the announcements section for specific deadlines.",
      "admission": "Admission inquiries should be directed to the Admissions Office at admissions@rgukt.ac.in or by visiting the Admin building during office hours.",
      "library": "The university library is open from 8:00 AM to 10:00 PM on weekdays, and 9:00 AM to 6:00 PM on weekends.",
      "default": "I don't have specific information about that. Please check the university website or contact the relevant department for more details."
    };
    
    // Simple keyword matching for demo purposes
    let responseText = responses.default;
    Object.keys(responses).forEach(keyword => {
      if (query.toLowerCase().includes(keyword)) {
        responseText = responses[keyword];
      }
    });
    
    setIsLoading(false);
    return responseText;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Generate and add bot response
    try {
      const responseText = await generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
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

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 rounded-t-lg">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
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
                      : "bg-muted"
                  } p-3 rounded-lg`}
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
                <div className="bg-muted p-3 rounded-lg flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 bg-white border-t rounded-b-lg">
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
    </MainLayout>
  );
};

export default Chatbot;
