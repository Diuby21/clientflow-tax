import Link from "next/link";
import { Calculator, FileText, Users } from "lucide-react";

import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-white px-6 py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,95,0.08),_transparent_50%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#1E3A5F]">
              SaaS pour comptables québécois
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-[#1E3A5F] sm:text-5xl lg:text-6xl">
              Gérez vos clients fiscaux en toute simplicité
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ClientFlow Tax centralise vos dossiers, déclarations et suivis pour
              les cabinets comptables au Québec. Conçu pour la fiscalité
              provinciale et fédérale.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/pricing">Voir les tarifs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Voir la démo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 sm:grid-cols-3">
          <FeatureCard
            icon={<Users className="size-5" strokeWidth={1.75} />}
            title="Clients"
            description="Portefeuille clients, contacts et historique des interactions."
          />
          <FeatureCard
            icon={<FileText className="size-5" strokeWidth={1.75} />}
            title="Dossiers fiscaux"
            description="Suivi des déclarations T1, TP1 et échéances Revenu Québec."
          />
          <FeatureCard
            icon={<Calculator className="size-5" strokeWidth={1.75} />}
            title="Calculs"
            description="Outils alignés sur les règles fiscales québécoises."
          />
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-[#1E3A5F]">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
