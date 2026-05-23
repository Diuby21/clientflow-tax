const faqItems = [
  {
    question: "Puis-je changer de forfait en tout temps?",
    answer:
      "Oui. Vous pouvez passer du forfait Gratuit au Pro ou Cabinet, ou rétrograder, à tout moment depuis les paramètres de votre compte. La facturation est ajustée au prorata.",
  },
  {
    question: "Mes données et celles de mes clients sont-elles sécurisées?",
    answer:
      "Tous les fichiers sont chiffrés en transit et au repos. ClientFlow Tax est hébergé au Canada et conçu pour respecter les exigences de confidentialité des cabinets comptables.",
  },
  {
    question: "ClientFlow Tax est-il adapté à la fiscalité québécoise?",
    answer:
      "Absolument. La plateforme prend en charge les documents T4, RL-1, TP1 et les échéances Revenu Québec, avec des listes de contrôle alignées sur la saison fiscale au Québec.",
  },
  {
    question: "Y a-t-il un essai gratuit du forfait Pro?",
    answer:
      "Le forfait Gratuit vous permet de tester la plateforme avec jusqu'à 3 clients. Le forfait Pro offre un essai de 14 jours sans carte de crédit pour explorer toutes les fonctionnalités avancées.",
  },
];

export function PricingFaq() {
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-bold tracking-tight text-[#1E3A5F]">
        Questions fréquentes
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Tout ce que vous devez savoir avant de choisir votre forfait.
      </p>

      <div className="mt-10 space-y-4">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-border/60 bg-card shadow-sm open:shadow-md"
          >
            <summary className="cursor-pointer list-none px-6 py-5 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4 text-[#1E3A5F]">
                {item.question}
                <span className="text-xl font-normal text-primary transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="px-6 pb-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
