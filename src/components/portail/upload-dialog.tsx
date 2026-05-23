"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type UploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName: string;
  onConfirm: () => void;
  accentColor?: string;
};

export function UploadDialog({
  open,
  onOpenChange,
  documentName,
  onConfirm,
  accentColor,
}: UploadDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setError(null);
    setIsDragging(false);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const validateAndSet = (f: File) => {
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Seuls les fichiers PDF sont acceptés.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSet(dropped);
  };

  const handleSubmit = () => {
    if (!file) return;
    onConfirm();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Téléverser — {documentName}</DialogTitle>
          <DialogDescription>
            Glissez-déposez votre fichier PDF ou cliquez pour le sélectionner.
          </DialogDescription>
        </DialogHeader>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 transition-colors",
            isDragging
              ? "border-[var(--portail-accent)] bg-[var(--portail-accent)]/5"
              : "border-muted-foreground/25 bg-muted/30",
            file && "border-emerald-400/50 bg-emerald-50/50"
          )}
        >
          {file ? (
            <>
              <FileText className="size-10 text-emerald-600" />
              <p className="max-w-full truncate text-center text-sm font-medium">
                {file.name}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                Changer de fichier
              </Button>
            </>
          ) : (
            <>
              <div
                className="flex size-14 items-center justify-center rounded-2xl shadow-sm"
                style={{ backgroundColor: `${accentColor ?? "#2E6DA4"}20` }}
              >
                <Upload
                  className="size-7"
                  style={{ color: accentColor ?? "#2E6DA4" }}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Déposez votre PDF ici
              </p>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) validateAndSet(selected);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Parcourir les fichiers
              </Button>
            </>
          )}
        </div>

        {error && (
          <p className="text-center text-sm font-medium text-red-600">{error}</p>
        )}

        <Button
          className="w-full"
          disabled={!file}
          style={
            file && accentColor
              ? { backgroundColor: accentColor }
              : undefined
          }
          onClick={handleSubmit}
        >
          Envoyer le document
        </Button>
      </DialogContent>
    </Dialog>
  );
}
