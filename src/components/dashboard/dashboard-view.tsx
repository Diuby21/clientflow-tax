"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { NewClientDialog } from "@/components/dashboard/new-client-dialog";
import { RecentClientsList } from "@/components/dashboard/recent-clients-list";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, DashboardStats } from "@/types/client";

const emptyStats: DashboardStats = {
  totalClients: 0,
  documentsRecus: 0,
  documentsManquants: 0,
  dossiersCompletes: 0,
};

export function DashboardView() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [recentClients, setRecentClients] = useState<ClientRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      toast.error("Session invalide. Reconnectez-vous.");
      return;
    }

    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("*")
      .eq("comptable_id", user.id)
      .order("created_at", { ascending: false });

    if (clientsError) {
      setLoading(false);
      toast.error(clientsError.message);
      return;
    }

    const list = (clients ?? []) as ClientRecord[];
    setRecentClients(list.slice(0, 5));

    const clientIds = list.map((c) => c.id);
    let documentsRecus = 0;
    let documentsManquants = 0;

    if (clientIds.length > 0) {
      const { data: documents, error: docsError } = await supabase
        .from("documents")
        .select("statut")
        .in("client_id", clientIds);

      if (docsError) {
        toast.error(docsError.message);
      } else {
        documents?.forEach((doc) => {
          if (doc.statut === "recu" || doc.statut === "reçu") {
            documentsRecus++;
          } else if (doc.statut === "manquant") {
            documentsManquants++;
          }
        });
      }
    }

    const dossiersCompletes = list.filter(
      (c) => c.statut === "complete" || c.statut === "a_jour"
    ).length;

    setStats({
      totalClients: list.length,
      documentsRecus,
      documentsManquants,
      dossiersCompletes,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <main className="flex flex-1 flex-col gap-10 p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1E3A5F]">
            Tableau de bord
          </h1>
          <p className="mt-2 text-muted-foreground">
            Vue d&apos;ensemble de votre activité
          </p>
        </div>
        <Button
          className="shrink-0 shadow-sm"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="size-4" />
          Nouveau client
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Chargement…</p>
      ) : (
        <>
          <StatsCards stats={stats} />
          <RecentClientsList clients={recentClients} />
        </>
      )}

      <NewClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={loadDashboard}
      />
    </main>
  );
}
