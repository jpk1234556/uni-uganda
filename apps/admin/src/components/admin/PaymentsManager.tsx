import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Receipt, Search, CreditCard, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function PaymentsManager() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          users!payments_student_id_fkey(first_name, last_name)
        `)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      toast.error("Failed to load financial records");
    } finally {
      setIsLoading(false);
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

  const filteredPayments = payments.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.users?.first_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-emerald-500" />
            Financial Ledger
          </h2>
          <p className="text-slate-500 mt-2 text-lg">Track manual and automated mobile money transactions securely.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search by ID or Student..." 
            className="pl-10 h-11 bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-emerald-500" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden rounded-xl">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mb-4" />
              <span className="text-slate-400 font-medium">Loading secure ledger...</span>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 shadow-inner">
                <Receipt className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900">No transactions found</h3>
              <p className="text-slate-500 max-w-sm mt-2">When students complete their bookings via mobile money, their transaction receipts will appear securely here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-100">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="w-[150px] text-slate-500 font-semibold h-12">Txn ID</TableHead>
                    <TableHead className="text-slate-500 font-semibold">Origin Account</TableHead>
                    <TableHead className="text-slate-500 font-semibold">Net Amount</TableHead>
                    <TableHead className="text-slate-500 font-semibold">State</TableHead>
                    <TableHead className="text-right text-slate-500 font-semibold pr-6">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <motion.tbody 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="visible"
                  className="divide-y divide-slate-100"
                >
                  {filteredPayments.map((payment) => (
                    <motion.tr variants={itemVariants} key={payment.id} className="group hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                          <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {payment.id.split('-')[0].toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {payment.users ? `${payment.users.first_name} ${payment.users.last_name}` : "Unknown Origin"}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-slate-900 text-lg tracking-tight">
                          {parseInt(payment.amount).toLocaleString('en-UG')}
                        </span>
                        <span className="text-xs font-medium text-slate-500 ml-1">{payment.currency || 'UGX'}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'} className={payment.status === 'completed' ? "bg-emerald-100 text-emerald-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>
                          {payment.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-slate-700">{format(new Date(payment.created_at), "MMM d, yyyy")}</span>
                          <span className="text-xs text-slate-400">{format(new Date(payment.created_at), "h:mm a")}</span>
                        </div>
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
