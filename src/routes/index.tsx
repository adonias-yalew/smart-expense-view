import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  Wallet, BarChart3, Target, Sparkles, ShieldCheck, Zap,
  Check, Star, ArrowRight, Twitter, Github, Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  head: () => ({
    meta: [
      { title: "Finly — The smartest way to track your money" },
      { name: "description", content: "Modern personal finance tracker with budgeting, analytics, and beautiful reports. Take control of your spending today." },
      { property: "og:title", content: "Finly — The smartest way to track your money" },
      { property: "og:description", content: "Modern personal finance tracker with budgeting and analytics built in." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto h-16 px-4 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-md)]">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">Finly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Customers</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Log in</Link></Button>
          <Button asChild size="sm" className="shadow-[var(--shadow-md)]">
            <Link to="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-[image:var(--gradient-primary)] opacity-10 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Sparkles className="h-3 w-3" /> Now with AI-powered insights
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          The smartest way to <span className="bg-gradient-to-r from-primary to-[oklch(0.68_0.17_265)] bg-clip-text text-transparent">track your money</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Beautiful dashboards, automatic categorization, and budgets that actually work.
          Personal finance, finally simple.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg" className="shadow-[var(--shadow-lg)]">
            <Link to="/signup">Get started free <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/login">Log in</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Free forever · No credit card required</p>

        {/* Hero visual */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_oklch(0.55_0.18_265_/_0.3)] overflow-hidden">
            <div className="h-10 border-b border-border bg-muted/40 flex items-center gap-1.5 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-4 bg-gradient-to-br from-background to-muted/30">
              {[
                { label: "Balance", value: "$12,480", color: "text-primary" },
                { label: "Income", value: "$8,200", color: "text-success" },
                { label: "Spent", value: "$3,540", color: "text-destructive" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl bg-card border border-border p-5 text-left">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className={`text-2xl font-semibold mt-1 ${c.color}`}>{c.value}</div>
                </div>
              ))}
              <div className="md:col-span-3 rounded-xl bg-card border border-border p-5">
                <div className="text-xs text-muted-foreground mb-3">Cash flow</div>
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 50, 80, 60, 90, 70, 95, 75, 85, 60, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-[image:var(--gradient-primary)] opacity-90" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: BarChart3, title: "Smart analytics", text: "See where your money goes with charts that actually make sense." },
  { icon: Target, title: "Flexible budgets", text: "Set monthly limits per category and stay on track effortlessly." },
  { icon: Wallet, title: "Track everything", text: "Income, expenses and recurring bills — all in one place." },
  { icon: ShieldCheck, title: "Bank-level security", text: "Your data is encrypted in transit and at rest. Always private." },
  { icon: Zap, title: "Lightning fast", text: "Add a transaction in two taps. Sync across all your devices." },
  { icon: Sparkles, title: "AI insights", text: "Personalized tips to help you save more without changing how you live." },
];

function Features() {
  return (
    <section id="features" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Features</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Everything you need, nothing you don't</h2>
          <p className="mt-4 text-muted-foreground">Built for people who want clarity over their finances without the spreadsheet headache.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Sarah Chen", role: "Designer at Linear", text: "Finly completely changed how I think about money. I've saved $4k in 6 months without feeling restricted." },
  { name: "Marcus Reed", role: "Founder, Beam", text: "The cleanest finance app I've ever used. It feels more like a Stripe dashboard than a budgeting tool." },
  { name: "Priya Patel", role: "Engineer at Vercel", text: "Setting category budgets used to be a chore. With Finly, it takes two minutes and just works." },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Loved by 50,000+ savers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started.",
      features: ["Unlimited transactions", "Up to 5 categories", "Basic reports", "Mobile + web access"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Premium",
      price: "$8",
      period: "per month",
      description: "For people serious about finances.",
      features: ["Everything in Free", "Unlimited categories & budgets", "Advanced analytics & exports", "AI-powered insights", "Priority support"],
      cta: "Upgrade to Premium",
      highlight: true,
    },
  ];
  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 transition-all ${
                t.highlight
                  ? "border-primary bg-card shadow-[var(--shadow-lg)] relative"
                  : "border-border bg-card shadow-[var(--shadow-sm)]"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-medium">
                  Most popular
                </div>
              )}
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">/ {t.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-8" variant={t.highlight ? "default" : "outline"}>
                <Link to="/signup">{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-[image:var(--gradient-primary)] p-12 text-center shadow-[var(--shadow-lg)]">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">Ready to take control?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">Join thousands of people building healthier money habits with Finly.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 shadow-[var(--shadow-lg)]">
            <Link to="/signup">Get started free <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)] flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Finly</span>
          </Link>
          <p className="text-sm text-muted-foreground">Personal finance, finally simple.</p>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
          { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
          { title: "Resources", links: ["Help center", "Contact", "Privacy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Finly. All rights reserved.</p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}