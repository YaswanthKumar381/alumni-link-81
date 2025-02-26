
import MainLayout from "@/components/MainLayout";
import { MessageCircle, ThumbsUp, MessageSquare, Share2 } from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Academic Research Methods in Computer Science",
    author: "Dr. Sarah Johnson",
    category: "Academic",
    replies: 23,
    likes: 45,
    preview: "Looking for study partners for upcoming Algorithm exam...",
  },
  {
    id: 2,
    title: "Campus Cultural Festival Planning",
    author: "Student Council",
    category: "Events",
    replies: 56,
    likes: 89,
    preview: "Share your ideas for this year's cultural festival theme...",
  },
  {
    id: 3,
    title: "Internship Opportunities Summer 2024",
    author: "Career Cell",
    category: "Career",
    replies: 34,
    likes: 67,
    preview: "New internship openings at leading tech companies...",
  },
];

const Discussions = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-up">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Discussions</h1>
          <p className="text-foreground/60">
            Engage in meaningful conversations with your peers and faculty
          </p>
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
            Start New Discussion
          </button>
        </header>

        <div className="grid gap-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Posted by {discussion.author} • {discussion.category}
                    </p>
                  </div>
                  <button className="rounded-full p-2 hover:bg-secondary transition-colors">
                    <Share2 className="h-5 w-5 text-foreground/60" />
                  </button>
                </div>
                <p className="text-foreground/80">{discussion.preview}</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    {discussion.replies} Replies
                  </button>
                  <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    {discussion.likes} Likes
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

export default Discussions;
