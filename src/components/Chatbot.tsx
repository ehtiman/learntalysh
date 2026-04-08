import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Bot } from "lucide-react";

export const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const openai = new OpenAI({ 
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
        dangerouslyAllowBrowser: true 
      });

      // 1. Turn the user's question into AI numbers
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
      });
      const queryEmbedding = embeddingResponse.data[0].embedding;

      // 2. Call the "Match" function in Supabase
      const { data, error } = await (supabase.rpc as any)('match_talysh_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 3,
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setResponse(data[0].content); // Show the best match
      } else {
        setResponse("I couldn't find specific information about that in the Talysh knowledge base yet.");
      }
    } catch (err: any) {
      setResponse("Sorry, I encountered an error connecting to the AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-2xl mx-auto mt-10 shadow-lg">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <Bot className="w-6 h-6" />
        <h2 className="text-xl font-bold">Ask the Talysh Tutor</h2>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input 
          placeholder="e.g., How do you say hello in Talysh?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <Button onClick={handleAsk} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      {response && (
        <div className="p-4 bg-muted rounded-lg border">
          <p className="text-sm leading-relaxed">{response}</p>
        </div>
      )}
    </Card>
  );
};
