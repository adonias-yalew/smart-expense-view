import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useExpenseStore } from "@/store/expenseStore";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/format";

export function MonthlyChart() {
  const transactions = useExpenseStore((s) => s.transactions);

  const data = useMemo(() => {
    const months: { key: string; label: string; income: number; expense: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-US", { month: "short" }),
        income: 0,
        expense: 0,
      });
    }
    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === key);
      if (!m) return;
      if (t.type === "income") m.income += t.amount;
      else m.expense += t.amount;
    });
    return months;
  }, [transactions]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold tracking-tight">Cash flow</h3>
          <p className="text-sm text-muted-foreground">Last 6 months</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Income</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Expense</span>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
            <XAxis dataKey="label" stroke="oklch(0.52 0.03 257)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.52 0.03 257)" fontSize={12} tickLine={false} axisLine={false}
              tickFormatter={(v) => `$${v}`} />
            <Tooltip
              cursor={{ fill: "oklch(0.95 0.01 250)" }}
              contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }}
              formatter={(v: number) => formatCurrency(v)}
            />
            <Bar dataKey="income" fill="oklch(0.55 0.18 265)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="oklch(0.62 0.22 27)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}