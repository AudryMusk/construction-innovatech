type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

const paths: Record<string, React.ReactNode> = {
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/></>,
  document: <><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
  hardhat: <><path d="M3 17h18M6 17v-3a6 6 0 0 1 12 0v3M9 13V8m6 5V8"/></>,
  building: <><rect x="4" y="5" width="16" height="16"/><path d="M8 5V2h8v3M8 9h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2M10 21v-4h4v4"/></>,
  bricks: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18M3 15h18M8 5v5m8-5v5m-5 0v5m-4 0v4m10-4v4"/></>,
  paint: <><path d="M4 4h12v6H4zM16 7h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-7v7H8v-7"/></>,
  expand: <><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5M3 8l6-5m12 5-6-5M3 16l6 5m12-5-6 5"/></>,
  brush: <><path d="m14 4 6 6-7 7-6-6zM5 13c-3 2-3 5-3 7 2 0 5 0 7-3"/><path d="m15.5 5.5 2-2 3 3-2 2"/></>,
  home: <><path d="m3 11 9-8 9 8v10H3z"/><path d="M9 21v-7h6v7"/></>,
  award: <><circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9"/></>,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z" />,
  timer: <><circle cx="12" cy="13" r="8"/><path d="M12 13V9m-3-7h6m3 3 2 2"/></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M8 10v7m0-10v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4"/></>,
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name] ?? paths.arrow}
    </svg>
  );
}
