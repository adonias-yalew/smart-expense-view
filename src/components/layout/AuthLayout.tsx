import { Link } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left visual panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-[image:var(--gradient-primary)] p-12 flex-col justify-between text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 -left-20 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        </div>
        <Link to="/" className="relative flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-lg">Finly</span>
        </Link>
        <div className="relative">
          <blockquote className="text-2xl font-medium leading-relaxed">
            "Finly turned my chaotic spending into a clear monthly story. I finally feel in control."
          </blockquote>
          <div className="mt-6">
            <div className="font-semibold">Sarah Chen</div>
            <div className="text-sm opacity-80">Designer at Linear</div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col">
        <header className="p-6 lg:p-8 flex items-center justify-between">
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)] flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Finly</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground ml-auto">← Back to home</Link>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
            <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}