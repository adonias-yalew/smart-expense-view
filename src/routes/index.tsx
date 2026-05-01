import { createFileRoute } from "@tanstack/react-router";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/expense/StatCard";
import { MonthlyChart } from "@/components/expense/MonthlyChart";
import { TransactionRow } from "@/components/expense/TransactionRow";
import { TransactionForm } from "@/components/expense/TransactionForm";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { selectTotals, useExpenseStore } from "@/store/expenseStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Finly Expense Tracker" },
      { name: "description", content: "Track your income, expenses and monthly cash flow at a glance." },
    ],
  }),
  component: Index,
});

function Index() {
  const transactions = useExpenseStore((s) => s.transactions);
  const totals = useMemo(() => selectTotals(transactions), [transactions]);
  const recent = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    [transactions]
  );
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Dashboard">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back, Alex</h2>
          <p className="text-sm text-muted-foreground mt-1">Here's a snapshot of your finances.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="shadow-[var(--shadow-md)]">
          <Plus className="h-4 w-4 mr-1" /> Add transaction
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard label="Total balance" value={totals.balance} icon={Wallet} variant="primary" trend="Across all accounts" />
        <StatCard label="Income" value={totals.income} icon={TrendingUp} variant="success" trend="All-time" />
        <StatCard label="Expenses" value={totals.expenses} icon={TrendingDown} variant="destructive" trend="All-time" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><MonthlyChart /></div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold tracking-tight">Recent activity</h3>
            <Link to="/transactions" className="text-xs font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recent.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} compact />
            ))}
          </div>
        </div>
      </div>

      <TransactionForm open={open} onOpenChange={setOpen} />
    </AppLayout>
  );
}
