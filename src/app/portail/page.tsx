import type { Metadata } from "next";

import { CabinetHeader } from "@/components/portail/cabinet-header";
import { PortailClient } from "@/components/portail/portail-client";
import {
  DEFAULT_PORTAIL_DATA,
  resolvePortailBranding,
} from "@/lib/portail-config";

export const metadata: Metadata = {
  title: "Portail client | ClientFlow Tax",
  description: "Déposez vos documents fiscaux pour votre comptable",
};

type PortailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PortailPage({ searchParams }: PortailPageProps) {
  const params = await searchParams;
  const branding = resolvePortailBranding(params);

  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={
        {
          "--portail-primary": branding.primaryColor,
          "--portail-accent": branding.accentColor,
        } as React.CSSProperties
      }
    >
      <CabinetHeader branding={branding} />
      <PortailClient
        branding={branding}
        clientName={DEFAULT_PORTAIL_DATA.clientName}
        initialDocuments={DEFAULT_PORTAIL_DATA.documents}
      />
    </div>
  );
}
