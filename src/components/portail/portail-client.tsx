"use client";

import { useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";

import { ConfirmationBanner } from "@/components/portail/confirmation-banner";
import { DocumentRow } from "@/components/portail/document-row";
import { ProgressBar } from "@/components/portail/progress-bar";
import { UploadDialog } from "@/components/portail/upload-dialog";
import {
  DEFAULT_PORTAIL_DATA,
  PORTAIL_SUBMISSION_DEADLINE,
  type PortailBranding,
  type PortailDocument,
} from "@/lib/portail-config";

type PortailClientProps = {
  branding: PortailBranding;
  clientName?: string;
  initialDocuments?: PortailDocument[];
};

export function PortailClient({
  branding,
  clientName = DEFAULT_PORTAIL_DATA.clientName,
  initialDocuments = DEFAULT_PORTAIL_DATA.documents,
}: PortailClientProps) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const receivedCount = documents.filter((d) => d.status === "received").length;
  const progressPercent = Math.round(
    (receivedCount / documents.length) * 100
  );
  const isComplete = receivedCount === documents.length;

  const brandingStyle = useMemo(
    () =>
      ({
        "--portail-primary": branding.primaryColor,
        "--portail-accent": branding.accentColor,
      }) as React.CSSProperties,
    [branding.primaryColor, branding.accentColor]
  );

  const openUpload = (id: string, name: string) => {
    setActiveDocument({ id, name });
    setUploadOpen(true);
  };

  const handleUploadConfirm = () => {
    if (!activeDocument) return;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocument.id
          ? { ...doc, status: "received" as const, daysWaiting: undefined }
          : doc
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={brandingStyle}>
      <main className="mx-auto max-w-3xl space-y-10 px-6 py-12 sm:px-8">
        <div className="space-y-3">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: branding.primaryColor }}
          >
            Bonjour, {clientName}!
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Veuillez téléverser les documents fiscaux demandés par votre
            comptable pour compléter votre dossier {new Date().getFullYear()}.
          </p>
        </div>

        <ProgressBar
          value={progressPercent}
          accentColor={branding.accentColor}
          primaryColor={branding.primaryColor}
        />

        {isComplete && <ConfirmationBanner clientName={clientName} />}

        <section className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight">
            Documents à fournir
          </h2>
          <div className="space-y-4">
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                name={doc.name}
                status={doc.status}
                daysWaiting={doc.daysWaiting}
                onUploadClick={() => openUpload(doc.id, doc.name)}
              />
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-center shadow-sm">
          <CalendarClock className="size-5 shrink-0 text-red-600" />
          <p className="text-sm font-semibold text-red-700">
            Date limite de soumission : {PORTAIL_SUBMISSION_DEADLINE}
          </p>
        </div>

        <p className="pb-4 text-center text-xs text-muted-foreground">
          Propulsé par ClientFlow Tax — vos fichiers sont transmis de façon
          sécurisée à votre comptable.
        </p>
      </main>

      {activeDocument && (
        <UploadDialog
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          documentName={activeDocument.name}
          onConfirm={handleUploadConfirm}
          accentColor={branding.accentColor}
        />
      )}
    </div>
  );
}
