/**
 * Illustrated guide showing how to take the front/side assessment photos
 * and where to measure waist/hip — built from simple geometric shapes
 * (not real photos) so the pose reads clearly at a glance.
 */
function FrontFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      {/* head */}
      <circle cx="70" cy="26" r="20" fill="#0B0B0B" />
      {/* neck */}
      <rect x="63" y="42" width="14" height="10" fill="#0B0B0B" />
      {/* arms (angled out from the body) */}
      <rect x="18" y="58" width="16" height="78" rx="8" fill="#0B0B0B" transform="rotate(-14 26 97)" />
      <rect x="106" y="58" width="16" height="78" rx="8" fill="#0B0B0B" transform="rotate(14 114 97)" />
      {/* hands */}
      <circle cx="14" cy="140" r="9" fill="#0B0B0B" />
      <circle cx="126" cy="140" r="9" fill="#0B0B0B" />
      {/* torso (shoulders wide, waist narrower) */}
      <path d="M46 54 H94 L90 128 H50 Z" fill="#0B0B0B" />
      {/* hips */}
      <path d="M48 122 H92 L96 150 H44 Z" fill="#0B0B0B" />
      {/* legs, slightly apart */}
      <rect x="50" y="146" width="18" height="82" rx="9" fill="#0B0B0B" />
      <rect x="72" y="146" width="18" height="82" rx="9" fill="#0B0B0B" />
      {/* feet */}
      <ellipse cx="59" cy="233" rx="13" ry="6" fill="#0B0B0B" />
      <ellipse cx="81" cy="233" rx="13" ry="6" fill="#0B0B0B" />
    </svg>
  );
}

function SideFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      {/* head, profile with a small nose bump */}
      <circle cx="70" cy="26" r="20" fill="#0B0B0B" />
      <path d="M88 20 q8 3 5 10 q-2 4 -7 2 Z" fill="#0B0B0B" />
      {/* neck */}
      <rect x="64" y="42" width="14" height="10" fill="#0B0B0B" />
      {/* one arm, straight at the side */}
      <rect x="52" y="58" width="16" height="78" rx="8" fill="#0B0B0B" />
      <circle cx="60" cy="140" r="9" fill="#0B0B0B" />
      {/* torso, narrower (profile width) with a slight chest/back curve */}
      <path d="M58 54 H90 Q98 90 90 128 H64 Q58 90 58 54 Z" fill="#0B0B0B" />
      {/* hips */}
      <path d="M62 122 H92 L88 150 H60 Z" fill="#0B0B0B" />
      {/* one leg, straight */}
      <rect x="66" y="146" width="20" height="82" rx="10" fill="#0B0B0B" />
      {/* foot, pointing sideways */}
      <ellipse cx="86" cy="233" rx="16" ry="6" fill="#0B0B0B" />
    </svg>
  );
}

function GuideLine({ label, top, color }: { label: string; top: string; color: string }) {
  return (
    <div className="absolute inset-x-0 flex items-center gap-1.5" style={{ top }}>
      <div className="h-0.5 flex-1 border-t-2 border-dashed" style={{ borderColor: color }} />
      <span
        className="shrink-0 rounded-full border-2 border-club-black px-1.5 py-0.5 font-club-sans text-[9px] font-extrabold uppercase leading-none text-club-white"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </div>
  );
}

export function PhotoGuideAvatar() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { Figure: FrontFigure, label: "Frente", hint: "Olhando pra câmera" },
        { Figure: SideFigure, label: "Perfil", hint: "Vire 90° de lado" },
      ].map(({ Figure, label, hint }) => (
        <div key={label} className="relative rounded-2xl border-[3px] border-club-black bg-club-white p-4">
          <div className="relative mx-auto aspect-[140/240] w-28">
            <Figure className="h-full w-full" />
            <GuideLine label="Cintura" top="56%" color="#FF5DAE" />
            <GuideLine label="Quadril" top="68%" color="#9C6BFF" />
          </div>
          <p className="mt-3 text-center font-club-display text-sm font-extrabold uppercase tracking-widest text-club-black">
            {label}
          </p>
          <p className="text-center font-club-sans text-[11px] text-club-black/60">{hint}</p>
        </div>
      ))}
    </div>
  );
}
