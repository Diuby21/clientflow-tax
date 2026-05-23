import {
  getCabinetInitials,
  type PortailBranding,
} from "@/lib/portail-config";

type CabinetHeaderProps = {
  branding: PortailBranding;
};

export function CabinetHeader({ branding }: CabinetHeaderProps) {
  const initials = getCabinetInitials(branding.cabinetName);

  return (
    <header
      className="border-b border-border/60 bg-white shadow-sm"
      style={
        {
          "--portail-primary": branding.primaryColor,
          "--portail-accent": branding.accentColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4">
        {branding.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={branding.logoUrl}
            alt={`Logo ${branding.cabinetName}`}
            className="size-10 rounded-lg object-contain"
          />
        ) : (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {initials}
          </div>
        )}
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ color: branding.primaryColor }}
        >
          {branding.cabinetName}
        </span>
      </div>
    </header>
  );
}
