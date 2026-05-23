"use client";

import { CircleCheck, CircleX, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isRelanceOverdue } from "@/lib/portail-config";
import { cn } from "@/lib/utils";

export type DocumentStatus = "received" | "missing";

type DocumentRowProps = {
  name: string;
  status: DocumentStatus;
  daysWaiting?: number;
  onUploadClick: () => void;
};

function formatDaysWaiting(days: number): string {
  return days === 1
    ? "En attente depuis 1 jour"
    : `En attente depuis ${days} jours`;
}

export function DocumentRow({
  name,
  status,
  daysWaiting,
  onUploadClick,
}: DocumentRowProps) {
  const isReceived = status === "received";
  const showRelance =
    !isReceived && daysWaiting !== undefined && isRelanceOverdue(daysWaiting);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-4">
          {isReceived ? (
            <CircleCheck
              className="mt-0.5 size-7 shrink-0 text-emerald-500"
              strokeWidth={2}
              aria-label="Reçu"
            />
          ) : (
            <CircleX
              className="mt-0.5 size-7 shrink-0 text-red-500"
              strokeWidth={2}
              aria-label="Manquant"
            />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold">{name}</p>
              {showRelance && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 shadow-sm">
                  Relance — +7 j
                </span>
              )}
            </div>
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                isReceived ? "text-emerald-600" : "text-red-600"
              )}
            >
              {isReceived ? "Reçu" : "Manquant"}
            </p>
            {!isReceived && daysWaiting !== undefined && (
              <p
                className={cn(
                  "mt-2 text-xs",
                  showRelance
                    ? "font-medium text-red-600"
                    : "text-muted-foreground"
                )}
              >
                {formatDaysWaiting(daysWaiting)}
              </p>
            )}
          </div>
        </div>
      </div>

      {!isReceived && (
        <Button
          variant="outline"
          size="default"
          className="shrink-0 rounded-xl border-[var(--portail-primary)] px-5 text-[var(--portail-primary)] shadow-sm hover:bg-[var(--portail-primary)]/5"
          onClick={onUploadClick}
        >
          <Upload className="size-4" />
          Uploader
        </Button>
      )}
    </div>
  );
}
