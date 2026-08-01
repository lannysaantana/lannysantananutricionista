/**
 * Illustrated guide showing how to take the front/side assessment photos
 * and where to measure waist/hip — generic silhouettes, not real photos.
 */
function FrontSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden>
      <circle cx="60" cy="24" r="18" fill="#0B0B0B" />
      <path
        d="M60 42
           C 40 42 34 54 32 70
           L 26 96
           C 24 104 30 108 34 102
           L 40 78
           C 38 96 36 112 40 130
           C 34 150 34 172 38 198
           L 50 198 L 52 150
           L 68 150 L 70 198
           L 82 198
           C 86 172 86 150 80 130
           C 84 112 82 96 80 78
           L 86 102
           C 90 108 96 104 94 96
           L 88 70
           C 86 54 80 42 60 42 Z"
        fill="#0B0B0B"
      />
    </svg>
  );
}

function SideSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden>
      <circle cx="66" cy="24" r="18" fill="#0B0B0B" />
      <path
        d="M66 42
           C 50 42 44 52 46 66
           C 40 68 36 80 38 96
           L 44 96
           C 42 112 46 128 52 130
           C 46 150 46 172 50 198
           L 62 198 L 60 150
           L 72 150 L 76 198
           L 88 198
           C 84 172 80 150 74 130
           C 82 126 84 108 80 96
           C 84 80 82 66 76 60
           C 78 52 76 44 66 42 Z"
        fill="#0B0B0B"
      />
    </svg>
  );
}

export function PhotoGuideAvatar() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { Figure: FrontSilhouette, label: "Frente" },
        { Figure: SideSilhouette, label: "Perfil" },
      ].map(({ Figure, label }) => (
        <div key={label} className="relative rounded-2xl border-[3px] border-club-black bg-club-white p-4">
          <div className="relative mx-auto aspect-[120/220] w-24">
            <Figure className="h-full w-full" />
            {/* waist guide */}
            <div className="absolute inset-x-0 top-[62%] border-t-2 border-dashed border-club-pink" />
            {/* hip guide */}
            <div className="absolute inset-x-0 top-[72%] border-t-2 border-dashed border-club-purple" />
          </div>
          <p className="mt-3 text-center font-club-sans text-xs font-bold uppercase tracking-widest text-club-black">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
