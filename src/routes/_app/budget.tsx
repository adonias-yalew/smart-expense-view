import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import { useExpenseStore } from "@/store/expenseStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatCurrency } from "@/lib/format";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/budget")({
  head: () => ({ meta: [{ title: "Budget — Finly" }] }),
  component: BudgetPage,
});

function BudgetPage() {
  const { categories, transactions, budgets, monthlyBudget, setBudget, setMonthlyBudget } = useExpenseStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [draftAmount, setDraftAmount] = useState("");
  const [editingMonthly, setEditingMonthly] = useState(false);
  const [draftMonthly, setDraftMonthly] = useState("");

  // current month spend
  const monthSpend = useMemo(() => {
    const now = new Date();
    const map: Record<string, number> = {};
    let total = 0;
    transactions.forEach((t) => {
      const d = new Date(t.date);
      if (t.type !== "expense" || d.getMonth() !== now.getMonth() || d.getFullYear() !== now.getFullYear()) return;
      map[t.categoryId] = (map[t.categoryId] ?? 0) + t.amount;
      total += t.amount;
    });
    return { byCat: map, total };
  }, [transactions]);

  const overallPct = Math.min(100, (monthSpend.total / Math.max(monthlyBudget, 1)) * 100);

  const openEdit = (id: string) => {
    setEditing(id);
    setDraftAmount(String(budgets[id] ?? 0));
  };

  const saveEdit = () => {
    if (editing) setBudget(editing, parseFloat(draftAmount) || 0);
    setEditing(null);
  };

  const saveMonthly = () => {
    setMonthlyBudget(parseFloat(draftMonthly) || 0);
    setEditingMonthly(false);
  };

  return (
    <>
      <PageHeader
        title="Budget"
        subtitle="Set spending targets and track your progress this month."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)] mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Monthly budget</p>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {formatCurrency(monthSpend.total)} <span className="text-base text-muted-foreground font-normal">/ {formatCurrency(monthlyBudget)}</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => { setDraftMonthly(String(monthlyBudget)); setEditingMonthly(true); }}>
            <Pencil className="h-4 w-4 mr-1" /> Edit budget
          </Button>
        </div>
        <Progress value={overallPct} className="h-3" />
        <p className="mt-2 text-xs text-muted-foreground">
          {overallPct >= 100 ? "Over budget" : `${(100 - overallPct).toFixed(0)}% remaining`}
        </p>
      </div>

      <h3 className="font-semibold tracking-tight mb-3">By category</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((c) => {
          const limit = budgets[c.id] ?? 0;
          const spent = monthSpend.byCat[c.id] ?? 0;
          const pct = limit > 0 ? Math.min(100, (spent / limit) * 100) : 0;
          const over = limit > 0 && spent > limit;
          return (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                  <span className="font-medium">{c.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => openEdit(c.id)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
              </div>
              <div className="flex items-baseline justify-between text-sm mb-2">
                <span className={over ? "text-destructive font-medium" : "text-foreground"}>{formatCurrency(spent)}</span>
                <span className="text-muted-foreground">of {formatCurrency(limit)}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: over ? "var(--destructive)" : c.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Set budget limit</DialogTitle></DialogHeader>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Monthly limit</label>
            <Input type="number" value={draftAmount} onChange={(e) => setDraftAmount(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editingMonthly} onOpenChange={setEditingMonthly}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Monthly budget</DialogTitle></DialogHeader>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Total monthly limit</label>
            <Input type="number" value={draftMonthly} onChange={(e) => setDraftMonthly(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingMonthly(false)}>Cancel</Button>
            <Button onClick={saveMonthly}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}