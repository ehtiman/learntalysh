import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth"; // Using your existing hook
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    category: "Colors",
    talysh_name: "",
    english_name: "",
    az_name: "",
    ru_name: ""
  });

  const fetchLessons = async () => {
    const { data } = await supabase.from("lessons").select("*").order("created_at", { ascending: false });
    if (data) setLessons(data);
  };

  useEffect(() => {
    // If auth is finished and no user is found, redirect to login
    if (!authLoading && !user) {
      toast({
        title: "Access Denied",
        description: "Please login to access the admin panel.",
        variant: "destructive",
      });
      navigate("/auth");
    } else if (user) {
      fetchLessons();
    }
  }, [user, authLoading, navigate]);

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

  // Show loading spinner or empty div while checking authentication
  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not logged in, return null (the useEffect will handle navigation)
  if (!user) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <span className="text-sm text-gray-500 font-mono">{user.email}</span>
      </div>
      
      <form onSubmit={handleSubmit} className="grid gap-4 mb-10 p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-semibold">Add New Lesson Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Talysh Name" value={formData.talysh_name} onChange={e => setFormData({...formData, talysh_name: e.target.value})} required />
          <Input placeholder="English Name" value={formData.english_name} onChange={e => setFormData({...formData, english_name: e.target.value})} required />
          <Input placeholder="Azerbaijani Name" value={formData.az_name} onChange={e => setFormData({...formData, az_name: e.target.value})} required />
          <Input placeholder="Russian Name" value={formData.ru_name} onChange={e => setFormData({...formData, ru_name: e.target.value})} required />
        </div>
        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading ? "Saving..." : "Add Content"}
        </Button>
      </form>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b bg-gray-50 font-semibold">Current Lessons Data</div>
        <div className="divide-y">
          {lessons.length === 0 && <div className="p-4 text-center text-gray-500">No data found in Supabase.</div>}
          {lessons.map((item) => (
            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <span className="font-bold text-primary">{item.talysh_name}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-600">{item.english_name}</span>
              </div>
              <div className="text-xs text-gray-400 capitalize">{item.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
