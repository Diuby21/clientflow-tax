"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProCheckoutButtonProps = {
  className?: string;
  variant?: "default" | "outline";
  children: React.ReactNode;
};

export function ProCheckoutButton({
  className,
  variant = "default",
  children,
}: ProCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Erreur checkout");
      }

      window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className={cn("w-full rounded-xl", className)}
      variant={variant}
      size="lg"
      disabled={loading}
      onClick={handleCheckout}
    >
      {loading ? "Redirection…" : children}
    </Button>
  );
}
