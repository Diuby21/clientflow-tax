"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { NewClientDialog } from "@/components/dashboard/new-client-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  type ClientRecord,
  formatDeadline,
  getStatutDisplay,
} from "@/types/client";

export function ClientsView() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadClients = useCallback(async () => {
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

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("comptable_id", user.id)
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setClients((data ?? []) as ClientRecord[]);
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  return (
    <main className="flex flex-1 flex-col p-8 lg:p-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1E3A5F]">
            Mes clients
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gérez l&apos;ensemble de votre portefeuille
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

      <Card className="overflow-hidden p-0">
        <CardHeader className="border-b border-border/60 px-8 py-6">
          <CardTitle>Liste des clients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="px-8 py-6 text-sm text-muted-foreground">
              Chargement…
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-8">Nom du client</TableHead>
                  <TableHead>Courriel</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="pr-8">Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="px-8 py-8 text-center text-muted-foreground"
                    >
                      Aucun client enregistré.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => {
                    const statut = getStatutDisplay(client.statut);
                    const dotClass =
                      statut.color === "green"
                        ? "bg-emerald-500"
                        : statut.color === "red"
                          ? "bg-red-500"
                          : "bg-amber-400";

                    return (
                      <TableRow
                        key={client.id}
                        className="hover:bg-muted/40"
                      >
                        <TableCell className="px-8 font-medium">
                          {client.nom}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {client.email ?? "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {client.type_client === "salarie"
                            ? "Salarié"
                            : client.type_client === "travailleur_autonome"
                              ? "Travailleur autonome"
                              : "—"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={cn(
                                "size-2.5 shrink-0 rounded-full",
                                dotClass
                              )}
                              aria-hidden
                            />
                            <span className="text-muted-foreground">
                              {statut.label}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell className="pr-8">
                          {formatDeadline(client.deadline)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <NewClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={loadClients}
      />
    </main>
  );
}
