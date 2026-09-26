export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-bold tracking-[0.3em]">
              DELEON
            </p>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/60">
              Esenciales premium hechos bajo demanda. Diseñados con restricción,
              construidos para durar.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/40">
              Ayuda
            </span>
            <span className="text-sm text-primary-foreground/70">
              Envíos y devoluciones
            </span>
            <span className="text-sm text-primary-foreground/70">
              Guía de tallas
            </span>
            <span className="text-sm text-primary-foreground/70">Contacto</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/40">
              Social
            </span>
            <span className="text-sm text-primary-foreground/70">Instagram</span>
            <span className="text-sm text-primary-foreground/70">TikTok</span>
          </div>
        </div>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">
          © 2026 Deleon Legend Club · deleonlegend.club
        </div>
      </div>
    </footer>
  );
}
