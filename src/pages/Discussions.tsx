
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { MessageCircle, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDiscussions();
    setupRealtimeSubscription();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          profiles:author_id (*),
          discussion_replies(count),
          discussion_likes(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDiscussions(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading discussions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('public:discussions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'discussions' },
        (payload) => {
          console.log('Change received!', payload);
          fetchDiscussions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleLike = async (discussionId: string) => {
    try {
      const { data: existingLike } = await supabase
        .from('discussion_likes')
        .select('id')
        .match({ discussion_id: discussionId, user_id: supabase.auth.user()?.id })
        .single();

      if (existingLike) {
        await supabase
          .from('discussion_likes')
          .delete()
          .match({ id: existingLike.id });
      } else {
        await supabase
          .from('discussion_likes')
          .insert({ discussion_id: discussionId, user_id: supabase.auth.user()?.id });
      }

      fetchDiscussions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {discussions.map((discussion: any) => (
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
                        Posted by {discussion.profiles?.username || 'Anonymous'} • {discussion.category}
                      </p>
                    </div>
                    <button className="rounded-full p-2 hover:bg-secondary transition-colors">
                      <Share2 className="h-5 w-5 text-foreground/60" />
                    </button>
                  </div>
                  <p className="text-foreground/80">{discussion.content}</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      {discussion.discussion_replies_count || 0} Replies
                    </button>
                    <button
                      onClick={() => handleLike(discussion.id)}
                      className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {discussion.discussion_likes_count || 0} Likes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Discussions;
