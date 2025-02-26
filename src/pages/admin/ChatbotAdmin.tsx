
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  FileText, 
  FilePlus, 
  FileQuestion, 
  Trash2, 
  Edit, 
  Plus, 
  Save, 
  Database,
  MessageCircle,
  Settings 
} from "lucide-react";

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
};

type QA = {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

const ChatbotAdmin = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Academic Calendar 2023-2024.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: new Date("2023-08-15"),
    },
    {
      id: "2",
      name: "Course Catalog.csv",
      type: "CSV",
      size: "820 KB",
      uploadedAt: new Date("2023-09-01"),
    },
  ]);

  const [qaItems, setQaItems] = useState<QA[]>([
    {
      id: "1",
      question: "What are the library opening hours?",
      answer: "The university library is open from 8:00 AM to 10:00 PM on weekdays, and 9:00 AM to 6:00 PM on weekends.",
      createdAt: new Date("2023-08-20"),
      updatedAt: new Date("2023-08-20"),
    },
    {
      id: "2",
      question: "How do I apply for a hostel room?",
      answer: "To apply for a hostel room, you need to fill out the hostel application form available on the student portal. Submit it along with the required documents to the Hostel Administration Office.",
      createdAt: new Date("2023-08-25"),
      updatedAt: new Date("2023-09-02"),
    },
  ]);
  
  // Chatbot persona configuration
  const [persona, setPersona] = useState<string>("helpful");
  const [tone, setTone] = useState<string>("professional");
  const [botName, setBotName] = useState<string>("RGUKT Assistant");
  const [botDescription, setBotDescription] = useState<string>("Your helpful university assistant.");

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingQA, setEditingQA] = useState<QA | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Load chatbot settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("chatbotSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setPersona(settings.persona || "helpful");
      setTone(settings.tone || "professional");
      setBotName(settings.botName || "RGUKT Assistant");
      setBotDescription(settings.botDescription || "Your helpful university assistant.");
    }
  }, []);

  // Save chatbot settings to localStorage
  const saveChatbotSettings = () => {
    const settings = {
      persona,
      tone,
      botName,
      botDescription
    };
    
    localStorage.setItem("chatbotSettings", JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Chatbot settings have been updated successfully.",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newDocuments = Array.from(files).map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        size: (file.size / 1024).toFixed(2) + " KB",
        uploadedAt: new Date(),
      }));

      setDocuments((prev) => [...prev, ...newDocuments]);
      setIsUploading(false);

      toast({
        title: "Documents uploaded successfully",
        description: `${files.length} file(s) have been added to the knowledge base.`,
      });
    }, 1500);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from the knowledge base.",
    });
  };

  const handleAddQA = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Invalid input",
        description: "Both question and answer fields are required.",
        variant: "destructive",
      });
      return;
    }

    const newQA: QA = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setQaItems((prev) => [...prev, newQA]);
    setNewQuestion("");
    setNewAnswer("");

    toast({
      title: "Q&A added successfully",
      description: "The new question and answer have been added to the knowledge base.",
    });
  };

  const handleEditQA = () => {
    if (!editingQA || !editingQA.question.trim() || !editingQA.answer.trim()) return;

    setQaItems((prev) =>
      prev.map((item) =>
        item.id === editingQA.id
          ? { ...editingQA, updatedAt: new Date() }
          : item
      )
    );

    setEditingQA(null);

    toast({
      title: "Q&A updated",
      description: "The question and answer have been updated.",
    });
  };

  const handleDeleteQA = (id: string) => {
    setQaItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Q&A deleted",
      description: "The question and answer have been removed from the knowledge base.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Chatbot Knowledge Base</h1>
            <p className="text-gray-600">
              Manage the documents, Q&A, and personality of your university chatbot
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.open("/chatbot", "_blank")}>
              <Database className="mr-2 h-4 w-4" />
              Test Chatbot
            </Button>
          </div>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="qa">
              <FileQuestion className="mr-2 h-4 w-4" />
              Q&A Pairs
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Chatbot Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="mt-6">
            <div className="rounded-lg border bg-card">
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Knowledge Documents</h2>
                  <div className="relative">
                    <Button variant="default">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                      <Input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        multiple
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No documents yet. Upload some to enhance the chatbot's knowledge.
                          </TableCell>
                        </TableRow>
                      ) : (
                        documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-primary" />
                                {doc.name}
                              </div>
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell>
                              {doc.uploadedAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qa" className="mt-6">
            <div className="rounded-lg border bg-card">
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Q&A Knowledge Base</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Q&A Pair
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Add New Q&A Pair</DialogTitle>
                        <DialogDescription>
                          Create a question and answer pair to add to the chatbot's knowledge base.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="question">Question</Label>
                          <Input
                            id="question"
                            placeholder="E.g., What are the library hours?"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="answer">Answer</Label>
                          <Textarea
                            id="answer"
                            placeholder="Provide a detailed answer..."
                            rows={4}
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddQA}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Q&A
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {qaItems.length === 0 ? (
                    <div className="rounded-md border p-8 text-center">
                      <FilePlus className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium">No Q&A pairs yet</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add question and answer pairs to enhance the chatbot's knowledge.
                      </p>
                    </div>
                  ) : (
                    qaItems.map((item) => (
                      <div key={item.id} className="rounded-md border p-4">
                        {editingQA && editingQA.id === item.id ? (
                          <div className="space-y-3">
                            <div>
                              <Label>Question</Label>
                              <Input
                                value={editingQA.question}
                                onChange={(e) =>
                                  setEditingQA({
                                    ...editingQA,
                                    question: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label>Answer</Label>
                              <Textarea
                                value={editingQA.answer}
                                onChange={(e) =>
                                  setEditingQA({
                                    ...editingQA,
                                    answer: e.target.value,
                                  })
                                }
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingQA(null)}
                              >
                                Cancel
                              </Button>
                              <Button size="sm" onClick={handleEditQA}>
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <h3 className="font-semibold text-gray-800">
                                {item.question}
                              </h3>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingQA(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteQA(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-600">{item.answer}</p>
                            <p className="mt-2 text-xs text-gray-400">
                              Last updated:{" "}
                              {item.updatedAt.toLocaleDateString()}
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="rounded-lg border bg-card">
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Chatbot Personality Settings</h2>
                  <Button onClick={saveChatbotSettings} className="flex-shrink-0">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="botName">Chatbot Name</Label>
                      <Input
                        id="botName"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="RGUKT Assistant"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="botDescription">Bot Description</Label>
                      <Textarea
                        id="botDescription"
                        value={botDescription}
                        onChange={(e) => setBotDescription(e.target.value)}
                        placeholder="Your helpful university assistant."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="persona">Chatbot Persona</Label>
                      <Select value={persona} onValueChange={setPersona}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a persona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="helpful">Helpful Assistant</SelectItem>
                          <SelectItem value="mentor">Academic Mentor</SelectItem>
                          <SelectItem value="friend">Friendly Companion</SelectItem>
                          <SelectItem value="expert">University Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        How should the chatbot present itself to users?
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="tone">Conversation Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        How formal or casual should the chatbot's responses be?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border mt-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Preview
                  </h3>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-start space-x-2">
                      <Bot className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{botName}</p>
                        <p className="text-xs text-gray-500">{botDescription}</p>
                        <p className="text-sm mt-2">
                          {persona === "mentor" && "As your academic mentor, I'd suggest checking your class schedule for any changes this week."}
                          {persona === "friend" && "Hey there! Don't forget to check out the campus event happening this weekend!"}
                          {persona === "expert" && "Based on university policy, all assignment submissions are due by 11:59 PM on the due date."}
                          {persona === "helpful" && "I'm here to assist you with any questions about classes, events, or campus resources."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChatbotAdmin;
