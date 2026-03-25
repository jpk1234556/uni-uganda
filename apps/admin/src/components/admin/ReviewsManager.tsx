import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Star, ShieldAlert, Trash2, Home } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id, rating, comment, created_at,
          users!reviews_student_id_fkey(first_name, last_name),
          hostels!reviews_hostel_id_fkey(name)
        `)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      toast.error("Failed to load reviews ledger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this review for violating platform terms?")) return;
    
    try {
      setIsDeleting(id);
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
      toast.success("Abusive review removed permanently");
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      toast.error("Failed to delete review");
    } finally {
      setIsDeleting(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-amber-500" />
            Moderation & Reviews
          </h2>
          <p className="text-slate-500 mt-2 text-lg">Moderate platform feedback, remove spam, and enforce community guidelines.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden rounded-xl">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-400 mb-4" />
              <span className="text-slate-400 font-medium">Scanning platform data...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                <Star className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-medium text-slate-900">No reviews found</h3>
              <p className="text-slate-500 max-w-md mt-2">When students start leaving reviews and ratings on properties, they will appear here for moderation monitoring.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-100">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="w-[200px] text-slate-500 font-semibold h-12">Author</TableHead>
                    <TableHead className="w-[200px] text-slate-500 font-semibold">Target Property</TableHead>
                    <TableHead className="w-[120px] text-slate-500 font-semibold">Rating</TableHead>
                    <TableHead className="text-slate-500 font-semibold">Feedback Snippet</TableHead>
                    <TableHead className="text-right text-slate-500 font-semibold pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <motion.tbody 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="visible"
                  className="divide-y divide-slate-100"
                >
                  {reviews.map((review) => (
                    <motion.tr variants={itemVariants} key={review.id} className="group hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {review.users ? `${review.users.first_name} ${review.users.last_name}` : "Unknown Student"}
                          </span>
                          <span className="text-xs text-slate-400">{format(new Date(review.created_at), "MMM d, yyyy")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="p-1.5 bg-indigo-50 rounded-md"><Home className="h-3 w-3 text-indigo-500"/></div>
                           <span className="font-medium text-indigo-900 text-sm">
                             {review.hostels?.name || "Deleted Property"}
                           </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded w-fit text-sm">
                          <Star className="h-4 w-4 fill-amber-500" /> {review.rating}.0
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-slate-600 italic line-clamp-2 max-w-sm">"{review.comment}"</p>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={isDeleting === review.id}
                          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-medium group"
                        >
                          {isDeleting === review.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2 opacity-50 group-hover:opacity-100" />}
                          Remove
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
