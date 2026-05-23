"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calculator,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/parametres", label: "Paramètres", icon: Settings },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#1E3A5F] text-white shadow-xl">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <Calculator className="size-6 shrink-0 text-white" strokeWidth={1.75} />
        <span className="text-lg font-semibold tracking-tight text-white">
          ClientFlow Tax
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="size-5 shrink-0" strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-4">
        <p className="px-1 text-xs text-white/50">Cabinet comptable — Québec</p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 rounded-xl px-4 text-white/85 hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="size-5" strokeWidth={1.75} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
