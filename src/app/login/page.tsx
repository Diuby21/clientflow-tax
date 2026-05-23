import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Connexion | ClientFlow Tax",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-6 py-12">
      <Link
        href="/"
        className="mb-10 flex items-center gap-2.5 transition-opacity hover:opacity-80"
      >
        <Calculator className="size-7 text-primary" strokeWidth={1.75} />
        <span className="text-xl font-semibold tracking-tight text-[#1E3A5F]">
          ClientFlow Tax
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E3A5F]">
            Connexion
          </h1>
          <p className="text-sm text-muted-foreground">
            Accédez à votre espace comptable.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
