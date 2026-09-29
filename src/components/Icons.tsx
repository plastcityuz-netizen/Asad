import type { SVGProps } from 'react';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

const PATHS: Record<string, React.ReactNode> = {
  shield: <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6l7-3zM9 12l2 2 4-4" />,
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18l4-5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16.5l8 4 8-4" />
    </>
  ),
  thermo: (
    <>
      <path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z" />
      <path d="M12 9v6" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V10l5 3V10l5 3V8l6 3.5V20z" />
      <path d="M3 20h18" />
    </>
  ),
  bolt: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />,
  home: (
    <>
      <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V4h9v17M14 10h5v11M5 21h15" />
      <path d="M8 8h3M8 12h3M8 16h3M17 14h0M17 17h0" />
    </>
  ),
  wall: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 12h18M9 5v7M15 12v7" />
    </>
  ),
  roof: (
    <>
      <path d="M2 13L12 5l10 8" />
      <path d="M5 13v6h14v-6" />
    </>
  ),
  floor: (
    <>
      <path d="M3 8h18v10H3z" />
      <path d="M3 13h18M8 8v5M16 13v5" />
    </>
  ),
  snow: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M9.5 4.6L12 6l2.5-1.4M9.5 19.4L12 18l2.5 1.4" />
    </>
  ),
  box: (
    <>
      <path d="M3 8l9-4 9 4v8l-9 4-9-4z" />
      <path d="M3 8l9 4 9-4M12 12v8" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L15 13l4 1.5V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
  ),
  telegram: <path d="M21 4.5L2.8 11.4c-.8.3-.8 1.4 0 1.7l4.5 1.5 1.7 5c.2.7 1.1.9 1.6.3l2.4-2.6 4.6 3.4c.6.4 1.4.1 1.6-.6L22 5.6c.2-.8-.5-1.4-1-1.1z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M4 12.5l5 5 11-11" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const node = PATHS[name] ?? PATHS.check;
  return (
    <svg {...base} aria-hidden="true" {...props}>
      {node}
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <path d="M4 9l8-4 8 4-8 4-8-4z" />
          <path d="M4 14l8 4 8-4" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[0.14em]">PENAPLAST</span>
        <span className="mt-1 block text-[9px] font-semibold tracking-[0.3em] text-ink-mute">
          ZAVODI
        </span>
      </span>
    </span>
  );
}
