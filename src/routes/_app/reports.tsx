import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { useExpenseStore } from "@/store/expenseStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — Finly" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const { transactions, categories } = useExpenseStore();

  const byCategory = useMemo(() => {
    return categories
      .map((c) => ({
        name: c.name,
        value: transactions.filter((t) => t.categoryId === c.id && t.type === "expense").reduce((a, b) => a + b.amount, 0),
        color: c.color,
      }))
      .filter((c) => c.value > 0);
  }, [transactions, categories]);

  const monthly = useMemo(() => {
    const months: { key: string; label: string; total: number }[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString("en-US", { month: "short" }), total: 0 });
    }
    transactions.forEach((t) => {
      if (t.type !== "expense") return;
      const d = new Date(t.date);
      const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m.total += t.amount;
    });
    return months;
  }, [transactions]);

  return (
    <>
      <PageHeader title="Reports" subtitle="Visualize your spending patterns over time." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <h3 className="font-semibold tracking-tight mb-1">Expenses by category</h3>
          <p className="text-sm text-muted-foreground mb-4">All-time breakdown</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {byCategory.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <h3 className="font-semibold tracking-tight mb-1">Monthly trend</h3>
          <p className="text-sm text-muted-foreground mb-4">Expenses over the last 12 months</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
                <XAxis dataKey="label" stroke="oklch(0.52 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.52 0.03 257)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="total" stroke="oklch(0.55 0.18 265)" strokeWidth={3} dot={{ fill: "oklch(0.55 0.18 265)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}