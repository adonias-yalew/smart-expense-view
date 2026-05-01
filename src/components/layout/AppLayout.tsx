import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, ArrowLeftRight, Tags, Wallet, Bell, Search } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/categories", label: "Categories", icon: Tags },
] as const;

export function AppLayout({ children, title }: { children: ReactNode; title: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-xl bg-[image:var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-lg)]">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold text-sidebar-foreground tracking-tight">Finly</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Expense tracker</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-sm)]"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 m-3 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
          <div className="text-xs opacity-80">Pro tip</div>
          <div className="text-sm font-medium mt-1">Track every expense to stay on budget</div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-20 flex items-center gap-4 px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="i-block w-5 h-0.5 bg-foreground relative before:content-[''] before:absolute before:w-5 before:h-0.5 before:bg-foreground before:-top-1.5 after:content-[''] after:absolute after:w-5 after:h-0.5 after:bg-foreground after:top-1.5" />
          </Button>
          <h1 className="text-lg font-semibold tracking-tight hidden sm:block">{title}</h1>
          <div className="flex-1 max-w-md ml-auto relative hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9 bg-background" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarFallback className="bg-[image:var(--gradient-primary)] text-primary-foreground text-sm font-semibold">
              AM
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}