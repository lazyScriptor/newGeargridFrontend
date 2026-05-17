// Small inline-SVG icon library. Avoids pulling in a 200KB icon package
// when we only need ~20 glyphs. All icons use currentColor + size prop.
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const IconBox = (p) => (
  <svg {...base(p.size)}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export const IconUsers = (p) => (
  <svg {...base(p.size)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconReceipt = (p) => (
  <svg {...base(p.size)}>
    <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 2V2" />
    <path d="M16 8H8" />
    <path d="M16 12H8" />
    <path d="M13 16H8" />
  </svg>
);

export const IconWrench = (p) => (
  <svg {...base(p.size)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  </svg>
);

export const IconChart = (p) => (
  <svg {...base(p.size)}>
    <path d="M3 3v18h18" />
    <path d="m7 16 4-4 4 4 5-5" />
  </svg>
);

export const IconShield = (p) => (
  <svg {...base(p.size)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconBolt = (p) => (
  <svg {...base(p.size)}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
  </svg>
);

export const IconLayers = (p) => (
  <svg {...base(p.size)}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);

export const IconGlobe = (p) => (
  <svg {...base(p.size)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base(p.size)}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const IconArrowRight = (p) => (
  <svg {...base(p.size)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...base(p.size)}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...base(p.size)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const IconMail = (p) => (
  <svg {...base(p.size)}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const IconPhone = (p) => (
  <svg {...base(p.size)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const IconMapPin = (p) => (
  <svg {...base(p.size)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconSparkles = (p) => (
  <svg {...base(p.size)}>
    <path d="M12 3v3" />
    <path d="M12 18v3" />
    <path d="M3 12h3" />
    <path d="M18 12h3" />
    <path d="m6 6 2 2" />
    <path d="m16 16 2 2" />
    <path d="m6 18 2-2" />
    <path d="m16 8 2-2" />
  </svg>
);
