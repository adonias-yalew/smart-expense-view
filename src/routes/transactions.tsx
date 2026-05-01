import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Inbox } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionRow } from "@/components/expense/TransactionRow";
import { TransactionForm } from "@/components/expense/TransactionForm";
import { useExpenseStore, type Transaction } from "@/store/expenseStore";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — Finly" },
      { name: "description", content: "Browse, search and manage all of your transactions." },
    ],
  }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const { transactions, categories } = useExpenseStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [range, setRange] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    if (range === "7") cutoff.setDate(now.getDate() - 7);
    else if (range === "30") cutoff.setDate(now.getDate() - 30);
    else if (range === "90") cutoff.setDate(now.getDate() - 90);

    return transactions
      .filter((t) => (category === "all" ? true : t.categoryId === category))
      .filter((t) => (range === "all" ? true : new Date(t.date) >= cutoff))
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, search, category, range]);

  const handleEdit = (t: Transaction) => {
    setEditing(t);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  return (
    <AppLayout title="Transactions">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">All transactions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>
        <Button onClick={handleAdd} className="shadow-[var(--shadow-md)]">
          <Plus className="h-4 w-4 mr-1" /> Add transaction
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-sm)]">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="md:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="px-4 divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No transactions match your filters.</p>
            </div>
          ) : (
            filtered.map((tx) => <TransactionRow key={tx.id} tx={tx} onEdit={handleEdit} />)
          )}
        </div>
      </div>

      <TransactionForm open={open} onOpenChange={setOpen} editing={editing} />
    </AppLayout>
  );
}