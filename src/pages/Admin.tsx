import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, X, Check } from "lucide-react";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
    if (!authLoading && !user) navigate("/auth");
    else if (user) fetchLessons();
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = editingId 
      ? await supabase.from("lessons").update(formData).eq('id', editingId)
      : await supabase.from("lessons").insert([formData]);

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

  if (authLoading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-6">{editingId ? "Edit Item" : "Admin Dashboard"}</h1>
      
      <form onSubmit={handleSubmit} className={`grid gap-4 mb-10 p-6 border rounded-lg shadow-sm transition-colors ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Talysh" value={formData.talysh_name} onChange={e => setFormData({...formData, talysh_name: e.target.value})} required />
          <Input placeholder="English" value={formData.english_name} onChange={e => setFormData({...formData, english_name: e.target.value})} required />
          <Input placeholder="Azerbaijani" value={formData.az_name} onChange={e => setFormData({...formData, az_name: e.target.value})} required />
          <Input placeholder="Russian" value={formData.ru_name} onChange={e => setFormData({...formData, ru_name: e.target.value})} required />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={loading}>
            {editingId ? <><Check className="w-4 h-4 mr-2"/> Update Item</> : "Add Content"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}><X className="w-4 h-4"/></Button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-sm uppercase text-gray-600">
            <tr>
              <th className="p-4 border-b">Talysh</th>
              <th className="p-4 border-b">English</th>
              <th className="p-4 border-b">Translations</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {lessons.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-primary">{item.talysh_name}</td>
                <td className="p-4">{item.english_name}</td>
                <td className="p-4 text-xs text-gray-500">AZ: {item.az_name} | RU: {item.ru_name}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)}><Pencil className="w-4 h-4 text-blue-600"/></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}><Trash2 className="w-4 h-4 text-red-600"/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
