import Link from "next/link";
import { Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";

type MarketingHeaderProps = {
  showPricing?: boolean;
};

export function MarketingHeader({ showPricing = true }: MarketingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Calculator className="size-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight text-[#1E3A5F]">
            ClientFlow Tax
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {showPricing && (
            <Button variant="ghost" asChild>
              <Link href="/pricing">Tarifs</Link>
            </Button>
          )}
          <Button variant="ghost" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Démarrer</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
