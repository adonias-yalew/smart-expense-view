import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { StatCard } from "@/components/expense/StatCard";
import { MonthlyChart } from "@/components/expense/MonthlyChart";
import { TransactionRow } from "@/components/expense/TransactionRow";
import { TransactionForm } from "@/components/expense/TransactionForm";
import { Button } from "@/components/ui/button";
import { selectTotals, useExpenseStore } from "@/store/expenseStore";
import { useAuthStore } from "@/store/authStore";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Finly" }] }),
  component: Dashboard,
});

function Dashboard() {
  const transactions = useExpenseStore((s) => s.transactions);
  const user = useAuthStore((s) => s.user);
  const totals = useMemo(() => selectTotals(transactions), [transactions]);
  const [open, setOpen] = useState(false);

  const recent = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    [transactions]
  );

  const trends = useMemo(() => {
    const now = Date.now();
    const day = 86400000;
    const last30 = transactions.filter((t) => now - new Date(t.date).getTime() < 30 * day);
    const prev30 = transactions.filter((t) => {
      const diff = now - new Date(t.date).getTime();
      return diff >= 30 * day && diff < 60 * day;
    });
    const sumExp = (arr: typeof transactions) => arr.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
    const sumInc = (arr: typeof transactions) => arr.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
    const pct = (cur: number, prev: number) => (prev === 0 ? (cur > 0 ? 100 : 0) : ((cur - prev) / prev) * 100);
    return {
      expense: pct(sumExp(last30), sumExp(prev30)),
      income: pct(sumInc(last30), sumInc(prev30)),
    };
  }, [transactions]);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        subtitle="Here's a snapshot of your finances."
        action={
          <Button onClick={() => setOpen(true)} className="shadow-[var(--shadow-md)]">
            <Plus className="h-4 w-4 mr-1" /> Add transaction
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard
          label="Total balance"
          value={totals.balance}
          icon={Wallet}
          variant="primary"
          trend={{ direction: totals.balance >= 0 ? "up" : "down", text: "Net position" }}
        />
        <StatCard
          label="Income"
          value={totals.income}
          icon={TrendingUp}
          variant="success"
          trend={{
            direction: trends.income >= 0 ? "up" : "down",
            text: `${trends.income >= 0 ? "+" : ""}${trends.income.toFixed(1)}% vs prev 30d`,
          }}
        />
        <StatCard
          label="Expenses"
          value={totals.expenses}
          icon={TrendingDown}
          variant="destructive"
          trend={{
            direction: trends.expense >= 0 ? "up" : "down",
            text: `${trends.expense >= 0 ? "+" : ""}${trends.expense.toFixed(1)}% vs prev 30d`,
            inverse: true,
          }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><MonthlyChart /></div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold tracking-tight">Recent activity</h3>
            <Link to="/transactions" className="text-xs font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recent.map((tx) => <TransactionRow key={tx.id} tx={tx} compact />)}
          </div>
        </div>
      </div>

      <TransactionForm open={open} onOpenChange={setOpen} />
    </>
  );
}