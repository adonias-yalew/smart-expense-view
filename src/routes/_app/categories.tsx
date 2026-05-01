import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useExpenseStore } from "@/store/expenseStore";
import { formatCurrency } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";

const palette = ["#f97316", "#3b82f6", "#ef4444", "#a855f7", "#ec4899", "#10b981", "#22c55e", "#0ea5e9", "#facc15", "#64748b"];

export const Route = createFileRoute("/_app/categories")({
  head: () => ({ meta: [{ title: "Categories — Finly" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, transactions, addCategory, deleteCategory } = useExpenseStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(palette[0]);

  const totalsById = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach((t) => { if (t.type === "expense") map[t.categoryId] = (map[t.categoryId] ?? 0) + t.amount; });
    return map;
  }, [transactions]);

  const submit = () => {
    if (!name.trim()) return;
    addCategory({ name: name.trim(), color });
    setName(""); setColor(palette[0]); setOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Organize where your money goes."
        action={<Button onClick={() => setOpen(true)} className="shadow-[var(--shadow-md)]"><Plus className="h-4 w-4 mr-1" /> New category</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const spent = totalsById[c.id] ?? 0;
          const count = transactions.filter((t) => t.categoryId === c.id).length;
          return (
            <div key={c.id} className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl" style={{ background: c.color + "25", border: `1px solid ${c.color}55` }} />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{count} transaction{count !== 1 && "s"}</div>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive" onClick={() => deleteCategory(c.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Spent</span>
                <span className="font-semibold tabular-nums">{formatCurrency(spent)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>New category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Subscriptions" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Color</label>
              <div className="flex flex-wrap gap-2">
                {palette.map((p) => (
                  <button key={p} type="button" onClick={() => setColor(p)}
                    className={`h-8 w-8 rounded-lg transition-transform ${color === p ? "ring-2 ring-offset-2 ring-foreground scale-110" : ""}`}
                    style={{ background: p }} aria-label={`Color ${p}`} />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}