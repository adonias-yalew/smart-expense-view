import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenseStore, type Transaction } from "@/store/expenseStore";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  tx: Transaction;
  onEdit?: (t: Transaction) => void;
  compact?: boolean;
}

export function TransactionRow({ tx, onEdit, compact }: Props) {
  const { categories, deleteTransaction } = useExpenseStore();
  const cat = categories.find((c) => c.id === tx.categoryId);
  const isIncome = tx.type === "income";

  return (
    <div className="flex items-center gap-4 py-3 group">
      <div
        className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: (cat?.color ?? "#64748b") + "20", color: cat?.color ?? "#64748b" }}
      >
        {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{tx.title}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>{cat?.name ?? "Other"}</span>
          <span>·</span>
          <span>{formatDate(tx.date)}</span>
        </div>
      </div>
      <div className={cn("font-semibold tabular-nums text-sm", isIncome ? "text-success" : "text-foreground")}>
        {isIncome ? "+" : "−"}
        {formatCurrency(tx.amount)}
      </div>
      {!compact && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit?.(tx)} aria-label="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => deleteTransaction(tx.id)} aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}