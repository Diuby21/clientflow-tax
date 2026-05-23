import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  accentColor?: string;
  primaryColor?: string;
  className?: string;
};

export function ProgressBar({
  value,
  accentColor = "#2E6DA4",
  primaryColor = "#1E3A5F",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-white p-8 shadow-md",
        className
      )}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Progression du dossier
          </p>
          <p className="mt-1 text-base font-semibold text-foreground">
            Documents complétés
          </p>
        </div>
        <p
          className="text-4xl font-bold tabular-nums tracking-tight"
          style={{ color: primaryColor }}
        >
          {clamped}
          <span className="text-2xl font-semibold text-muted-foreground">%</span>
        </p>
      </div>

      <div
        className="h-4 w-full overflow-hidden rounded-full bg-muted/80 shadow-inner"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped} pour cent des documents complétés`}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{
            width: `${clamped}%`,
            background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}
