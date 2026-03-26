import { KnowledgeUpload } from "@/components/admin/KnowledgeUpload";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, X, Check, BookOpen, BrainCircuit } from "lucide-react";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ["Colors", "Numbers", "Greetings", "Animals", "Phrases"];

  const [formData, setFormData] = useState({
    category: "Colors",
    talysh_name: "",
    english_name: "",
    az_name: "",
    ru_name: ""
  });

  const fetchLessons = async () => {
    const { data } = await (supabase.from as any)("lessons").select("*").order("category").order("created_at", { ascending: false });
    if (data) setLessons(data);
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    else if (user) fetchLessons();
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = editingId 
      ? await (supabase.from as any)("lessons").update(formData).eq('id', editingId)
      : await (supabase.from as any)("lessons").insert([formData]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: editingId ? "Updated!" : "Added!" });
      resetForm();
      fetchLessons();
    }
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    const { error } = await supabase.from("lessons").delete().eq('id', id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else fetchLessons();
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      category: item.category,
      talysh_name: item.talysh_name,
      english_name: item.english_name,
      az_name: item.az_name,
      ru_name: item.ru_name
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ category: "Colors", talysh_name: "", english_name: "", az_name: "", ru_name: "" });
  };

  if (authLoading) return <div className="p-20 text-center font-sans">Loading Dashboard...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto pt-24 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{editingId ? "Edit Content" : "Admin Dashboard"}</h1>
        <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          Logged in as: {user?.email}
        </div>
      </div>
      
      <section className="mb-12 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <BrainCircuit className="w-5 h-5" />
          <h2 className="text-lg font-semibold">AI Training Sources</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Upload Talysh texts, book excerpts, or grammar rules here to train the AI.
        </p>
        <KnowledgeUpload />
      </section>

      <hr className="my-10" />

      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Manage Dictionary Items</h2>
      </div>

      <form onSubmit={handleSubmit} className={`grid gap-4 mb-10 p-6 border rounded-lg shadow-sm transition-all ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Section/Category</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Talysh Word</label>
            <Input value={formData.talysh_name} onChange={e => setFormData({...formData, talysh_name: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">English Meaning</label>
            <Input value={formData.english_name} onChange={e => setFormData({...formData, english_name: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Azerbaijani</label>
            <Input value={formData.az_name} onChange={e => setFormData({...formData, az_name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Russian</label>
            <Input value={formData.ru_name} onChange={e => setFormData({...formData, ru_name: e.target.value})} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? <><Check className="w-4 h-4 mr-1" /> Update</> : "Add Word"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {lessons.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
            <div>
              <span className="font-semibold text-primary">{item.talysh_name}</span>
              <span className="mx-2 text-muted-foreground">—</span>
              <span>{item.english_name}</span>
              <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">{item.category}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => startEdit(item)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => deleteItem(item.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
