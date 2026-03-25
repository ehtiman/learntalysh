import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const KnowledgeUpload = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from('talysh_knowledge')
      .insert([{ content: text }]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Saved successfully!");
      setText("");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        className="w-full p-3 border rounded-lg h-40 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Paste Talysh book content or grammar rules here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {message && (
        <p className={`text-sm ${message.startsWith("Error") ? "text-destructive" : "text-green-600"}`}>
          {message}
        </p>
      )}
      <Button onClick={handleUpload} disabled={loading || !text.trim()}>
        {loading ? "Saving..." : "Save to Knowledge Base"}
      </Button>
    </div>
  );
};
