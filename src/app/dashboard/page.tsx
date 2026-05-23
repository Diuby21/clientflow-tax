import { Plus } from "lucide-react";

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
import { cn } from "@/lib/utils";

type ClientStatus = "red" | "yellow" | "green";

type Client = {
  name: string;
  status: ClientStatus;
  statusLabel: string;
  missingDocuments: string;
  deadline: string;
};

const clients: Client[] = [
  {
    name: "Marie-Claire Tremblay",
    status: "green",
    statusLabel: "À jour",
    missingDocuments: "Aucun",
    deadline: "30 avr. 2026",
  },
  {
    name: "Jean-François Bouchard",
    status: "yellow",
    statusLabel: "En cours",
    missingDocuments: "T4, REER",
    deadline: "15 avr. 2026",
  },
  {
    name: "Sophie Gagnon",
    status: "red",
    statusLabel: "En retard",
    missingDocuments: "T4, TP1, relevé 31",
    deadline: "1 mars 2026",
  },
  {
    name: "Marc-André Lavoie",
    status: "yellow",
    statusLabel: "En cours",
    missingDocuments: "Relevé 31",
    deadline: "28 avr. 2026",
  },
];

const statusDotClass: Record<ClientStatus, string> = {
  red: "bg-red-500",
  yellow: "bg-amber-400",
  green: "bg-emerald-500",
};

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col p-8 lg:p-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1E3A5F]">
            Mes clients
          </h1>
          <p className="mt-2 text-muted-foreground">
            Vue d&apos;ensemble de votre portefeuille fiscal
          </p>
        </div>
        <Button className="shrink-0 shadow-sm">
          <Plus className="size-4" />
          Nouveau client
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <CardHeader className="border-b border-border/60 bg-card px-8 py-6">
          <CardTitle>Liste des clients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-8">Nom du client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Documents manquants</TableHead>
                <TableHead className="pr-8">Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.name} className="hover:bg-muted/40">
                  <TableCell className="px-8 font-medium">
                    {client.name}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2.5 shrink-0 rounded-full",
                          statusDotClass[client.status]
                        )}
                        aria-hidden
                      />
                      <span className="text-muted-foreground">
                        {client.statusLabel}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {client.missingDocuments}
                  </TableCell>
                  <TableCell className="pr-8">{client.deadline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
