import { PartyPopper } from "lucide-react";

type ConfirmationBannerProps = {
  clientName: string;
};

export function ConfirmationBanner({ clientName }: ConfirmationBannerProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/80 p-6 text-emerald-900 shadow-md"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
        <PartyPopper className="size-6 text-emerald-600" />
      </div>
      <div>
        <p className="text-lg font-semibold">
          Merci {clientName}, votre comptable a été notifié.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-800">
          Votre dossier est complet. Vous recevrez un courriel si des précisions
          sont nécessaires avant la clôture fiscale.
        </p>
      </div>
    </div>
  );
}
