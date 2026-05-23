import type { Metadata } from "next";
import Link from "next/link";

import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { PricingCard, type PricingPlan } from "@/components/pricing/pricing-card";
import { PricingFaq } from "@/components/pricing/faq";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tarifs | ClientFlow Tax",
  description:
    "Forfaits Gratuit, Pro et Cabinet pour comptables québécois — choisissez l'offre adaptée à votre cabinet.",
};

const plans: PricingPlan[] = [
  {
    name: "Gratuit",
    price: "0 $",
    period: "/ mois",
    description: "Pour démarrer et tester la plateforme avec quelques clients.",
    features: [
      "Jusqu'à 3 clients",
      "Upload de documents",
      "Checklist basique",
    ],
    cta: "Commencer gratuitement",
    href: "/dashboard",
  },
  {
    name: "Pro",
    price: "49 $",
    period: "/ mois",
    description: "Pour les comptables actifs qui gèrent un portefeuille complet.",
    features: [
      "Clients illimités",
      "Relances automatiques",
      "Identification IA des documents",
      "Support prioritaire",
    ],
    cta: "Commencer",
    checkout: true,
    highlighted: true,
  },
  {
    name: "Cabinet",
    price: "99 $",
    period: "/ mois",
    description: "Pour les cabinets qui veulent une expérience brandée et collaborative.",
    features: [
      "Tout du forfait Pro",
      "Portail brandé au logo du cabinet",
      "Multi-comptables (jusqu'à 5)",
      "Rapports d'avancement",
    ],
    cta: "Contacter les ventes",
    href: "/dashboard",
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader showPricing={false} />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-white px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#1E3A5F]">
                Tarification simple
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1E3A5F] sm:text-5xl">
                Choisissez le forfait adapté à votre pratique
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Des outils pensés pour les comptables québécois, du solo
                practitioner au cabinet multi-comptables.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>

          <div className="mt-24">
            <PricingFaq />
          </div>

          <div className="mt-12 text-center">
            <Button variant="ghost" asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
