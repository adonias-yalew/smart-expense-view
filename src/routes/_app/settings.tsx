import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuthStore, userInitials } from "@/store/authStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Finly" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const save = () => {
    updateProfile({ name, email });
    toast.success("Profile updated");
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your account and preferences." />
      <div className="space-y-6 max-w-3xl">
        <Section title="Profile" description="Your personal information.">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarFallback className="bg-[image:var(--gradient-primary)] text-primary-foreground font-semibold text-lg">
                {user ? userInitials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change avatar</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={save}>Save changes</Button>
          </div>
        </Section>

        <Section title="Appearance" description="Customize how Finly looks.">
          <Row
            label="Theme"
            description="Toggle between light and dark mode (UI only)."
            control={
              <div className="flex items-center gap-2">
                <Sun className={`h-4 w-4 ${!darkMode ? "text-primary" : "text-muted-foreground"}`} />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className={`h-4 w-4 ${darkMode ? "text-primary" : "text-muted-foreground"}`} />
              </div>
            }
          />
        </Section>

        <Section title="Notifications" description="Choose what you want to hear about.">
          <Row label="Email notifications" description="Weekly spending summary." control={<Switch checked={emailNotif} onCheckedChange={setEmailNotif} />} />
          <Row label="Push notifications" description="Real-time budget alerts." control={<Switch checked={pushNotif} onCheckedChange={setPushNotif} />} />
        </Section>

        <Section title="Danger zone" description="Irreversible actions." danger>
          <Row
            label="Delete account"
            description="Permanently remove your account and all data."
            control={<Button variant="destructive" size="sm">Delete</Button>}
          />
        </Section>
      </div>
    </>
  );
}

function Section({ title, description, children, danger }: { title: string; description: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card p-6 shadow-[var(--shadow-sm)] ${danger ? "border-destructive/30" : "border-border"}`}>
      <h3 className={`font-semibold tracking-tight ${danger ? "text-destructive" : ""}`}>{title}</h3>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>
      {children}
    </div>
  );
}

function Row({ label, description, control }: { label: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-border first:border-t-0 first:pt-0">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      {control}
    </div>
  );
}