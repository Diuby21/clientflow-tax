import type { Metadata } from "next";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Tableau de bord | ClientFlow Tax",
  description: "Espace comptable — gestion des clients fiscaux",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Toaster />
    </div>
  );
}
