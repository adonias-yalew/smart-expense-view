import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: { direction: "up" | "down"; text: string; inverse?: boolean };
  variant?: "primary" | "success" | "destructive";
}

export function StatCard({ label, value, icon: Icon, trend, variant = "primary" }: Props) {
  const tone = {
    primary: "from-primary/15 to-primary/5 text-primary",
    success: "from-success/15 to-success/5 text-success",
    destructive: "from-destructive/15 to-destructive/5 text-destructive",
  }[variant];

  // For "expenses", up is bad; trend.inverse flips the color semantics
  const isPositive = trend ? (trend.inverse ? trend.direction === "down" : trend.direction === "up") : true;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{formatCurrency(value)}</p>
          {trend && (
            <div className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
              isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {trend.direction === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.text}
            </div>
          )}
        </div>
        <div className={cn("h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center", tone)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}