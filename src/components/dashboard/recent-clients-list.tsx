import { CircleCheck, CircleX } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  type ClientRecord,
  formatDeadline,
  getStatutDisplay,
} from "@/types/client";

type RecentClientsListProps = {
  clients: ClientRecord[];
};

export function RecentClientsList({ clients }: RecentClientsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#1E3A5F]">5 derniers clients ajoutés</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {clients.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun client pour le moment.
          </p>
        ) : (
          clients.map((client) => {
            const statut = getStatutDisplay(client.statut);
            const isOk = statut.color === "green";

            return (
              <div
                key={client.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{client.nom}</p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {client.email ?? "—"} ·{" "}
                    {client.type_client === "salarie"
                      ? "Salarié"
                      : client.type_client === "travailleur_autonome"
                        ? "Travailleur autonome"
                        : "—"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    {isOk ? (
                      <CircleCheck
                        className="size-5 text-emerald-500"
                        strokeWidth={2}
                      />
                    ) : (
                      <CircleX
                        className={cn(
                          "size-5",
                          statut.color === "red"
                            ? "text-red-500"
                            : "text-amber-400"
                        )}
                        strokeWidth={2}
                      />
                    )}
                    <span
                      className={cn(
                        statut.color === "green" && "text-emerald-600",
                        statut.color === "red" && "text-red-600",
                        statut.color === "yellow" && "text-amber-600"
                      )}
                    >
                      {statut.label}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDeadline(client.deadline)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
