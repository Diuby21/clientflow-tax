export type ClientRecord = {
  id: string;
  comptable_id: string;
  nom: string;
  email: string | null;
  type_client: string | null;
  statut: string | null;
  deadline: string | null;
  created_at: string;
};

export type DashboardStats = {
  totalClients: number;
  documentsRecus: number;
  documentsManquants: number;
  dossiersCompletes: number;
};

export const CLIENT_TYPES = [
  { value: "salarie", label: "Salarié" },
  { value: "travailleur_autonome", label: "Travailleur autonome" },
] as const;

export function getStatutDisplay(statut: string | null): {
  label: string;
  color: "green" | "yellow" | "red";
} {
  switch (statut) {
    case "complete":
    case "a_jour":
      return { label: "À jour", color: "green" };
    case "en_retard":
      return { label: "En retard", color: "red" };
    default:
      return { label: "En cours", color: "yellow" };
  }
}

export function formatDeadline(date: string | null): string {
  if (!date) return "—";
  return new Date(date + "T12:00:00").toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
