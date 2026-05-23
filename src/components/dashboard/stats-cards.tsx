import {
  CheckCircle2,
  FileCheck,
  FileX,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { DashboardStats } from "@/types/client";

type StatsCardsProps = {
  stats: DashboardStats;
};

const items: {
  key: keyof DashboardStats;
  label: string;
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
}[] = [
  {
    key: "totalClients",
    label: "Clients total",
    icon: Users,
    iconClass: "text-[#1E3A5F]",
    bgClass: "bg-[#1E3A5F]/10",
  },
  {
    key: "documentsRecus",
    label: "Documents reçus",
    icon: FileCheck,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
  },
  {
    key: "documentsManquants",
    label: "Documents manquants",
    icon: FileX,
    iconClass: "text-red-600",
    bgClass: "bg-red-500/10",
  },
  {
    key: "dossiersCompletes",
    label: "Dossiers complétés",
    icon: CheckCircle2,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-500/10",
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ key, label, icon: Icon, iconClass, bgClass }) => (
        <Card
          key={key}
          className="flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-lg"
        >
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#1E3A5F]">
              {stats[key]}
            </p>
          </div>
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${bgClass}`}
          >
            <Icon className={`size-6 ${iconClass}`} strokeWidth={1.75} />
          </div>
        </Card>
      ))}
    </div>
  );
}
