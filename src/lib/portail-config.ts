export type PortailBranding = {
  cabinetName: string;
  primaryColor: string;
  accentColor: string;
  /** URL du logo (optionnel). Sinon, initiales du cabinet. */
  logoUrl?: string | null;
};

export type PortailDocument = {
  id: string;
  name: string;
  status: "received" | "missing";
  /** Jours en attente — uniquement pour les documents manquants */
  daysWaiting?: number;
};

export type PortailClientData = {
  clientName: string;
  branding: PortailBranding;
  documents: PortailDocument[];
};

export const PORTAIL_SUBMISSION_DEADLINE = "30 avril 2026";

export const DEFAULT_PORTAIL_DATA: PortailClientData = {
  clientName: "Martin",
  branding: {
    cabinetName: "Cabinet Tremblay & Associés CPA",
    primaryColor: "#1E3A5F",
    accentColor: "#2E6DA4",
    logoUrl: null,
  },
  documents: [
    { id: "t4", name: "T4", status: "received" },
    { id: "t5", name: "T5", status: "missing", daysWaiting: 12 },
    { id: "rl1", name: "RL-1", status: "received" },
    {
      id: "releve-bancaire",
      name: "Relevé bancaire",
      status: "missing",
      daysWaiting: 4,
    },
    { id: "recus-dons", name: "Reçus de dons", status: "missing", daysWaiting: 9 },
  ],
};

const RELANCE_THRESHOLD_DAYS = 7;

export function isRelanceOverdue(daysWaiting: number): boolean {
  return daysWaiting > RELANCE_THRESHOLD_DAYS;
}

export function getCabinetInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/^(et|&|cpa)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Fusionne la config par défaut avec des paramètres URL (personnalisation cabinet). */
export function resolvePortailBranding(
  searchParams: Record<string, string | string[] | undefined>
): PortailBranding {
  const { branding } = DEFAULT_PORTAIL_DATA;
  const primary =
    typeof searchParams.primary === "string"
      ? searchParams.primary.startsWith("#")
        ? searchParams.primary
        : `#${searchParams.primary}`
      : branding.primaryColor;
  const accent =
    typeof searchParams.accent === "string"
      ? searchParams.accent.startsWith("#")
        ? searchParams.accent
        : `#${searchParams.accent}`
      : branding.accentColor;
  const logo =
    typeof searchParams.logo === "string" ? searchParams.logo : branding.logoUrl;
  const cabinet =
    typeof searchParams.cabinet === "string"
      ? searchParams.cabinet
      : branding.cabinetName;

  return {
    cabinetName: cabinet,
    primaryColor: primary,
    accentColor: accent,
    logoUrl: logo,
  };
}
