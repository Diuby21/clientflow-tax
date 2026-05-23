import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { ProCheckoutButton } from "@/components/pricing/pro-checkout-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href?: string;
  checkout?: boolean;
  highlighted?: boolean;
};

type PricingCardProps = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  const { highlighted } = plan;

  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        highlighted &&
          "border-2 border-primary shadow-lg ring-4 ring-primary/10"
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-md">
          Populaire
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-[#1E3A5F]">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {plan.description}
        </p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-[#1E3A5F]">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-muted-foreground">{plan.period}</span>
          )}
        </div>
      </div>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <CircleCheck
              className="mt-0.5 size-5 shrink-0 text-emerald-500"
              strokeWidth={2}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.checkout ? (
        <ProCheckoutButton variant={highlighted ? "default" : "outline"}>
          {plan.cta}
        </ProCheckoutButton>
      ) : (
        <Button
          asChild
          className="w-full rounded-xl"
          variant={highlighted ? "default" : "outline"}
          size="lg"
        >
          <Link href={plan.href ?? "/dashboard"}>{plan.cta}</Link>
        </Button>
      )}
    </Card>
  );
}
