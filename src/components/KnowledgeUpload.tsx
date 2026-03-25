import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const KnowledgeUpload = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    
    // 1. In a real app, you'd call OpenAI here to get the 'embedding'
    // For now, we'll just save the text so you can see it in Supabase
    const { error } = await supabase
      .from('talysh_knowledge')
      .insert([{ content: text }]);

    if (error) alert(error.message);
    else {
      alert("Text saved! Next step: Generate AI Embeddings.");
      setText("");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Talysh Knowledge</h2>
      <textarea 
        className="w-full p-2 border rounded h-40"
        placeholder="Paste Talysh book content or grammar rules here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        {loading ? "Saving..." : "Save to Knowledge Base"}
      </button>
    </div>
  );
};
