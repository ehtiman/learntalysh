import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    category: "Colors",
    talysh_name: "",
    english_name: "",
    az_name: "",
    ru_name: ""
  });

  const fetchLessons = async () => {
    const { data } = await supabase.from("lessons").select("*").order("created_at");
    if (data) setLessons(data);
  };

  useEffect(() => { fetchLessons(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from("lessons").insert([formData]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Content updated!" });
      setFormData({ ...formData, talysh_name: "", english_name: "", az_name: "", ru_name: "" });
      fetchLessons();
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="grid gap-4 mb-10 p-4 border rounded">
        <Input placeholder="Talysh Name" value={formData.talysh_name} onChange={e => setFormData({...formData, talysh_name: e.target.value})} />
        <Input placeholder="English Name" value={formData.english_name} onChange={e => setFormData({...formData, english_name: e.target.value})} />
        <Input placeholder="Azerbaijani Name" value={formData.az_name} onChange={e => setFormData({...formData, az_name: e.target.value})} />
        <Input placeholder="Russian Name" value={formData.ru_name} onChange={e => setFormData({...formData, ru_name: e.target.value})} />
        <Button type="submit" disabled={loading}>Add Content</Button>
      </form>

      <div className="space-y-2">
        {lessons.map((item) => (
          <div key={item.id} className="p-2 border-b flex justify-between">
            <span>{item.talysh_name} ({item.english_name})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
