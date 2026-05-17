// Canonical URLs for cross-app navigation.
// In dev, we point at the locally running revampedFrontend (Vite default :5173).
// In prod, the app lives at app.geargrid.live behind nginx with HSTS.
const isDev = import.meta.env.DEV;

const APP_BASE = isDev
  ? "http://localhost:5173"
  : "https://app.geargrid.live";

// API base — used for the contact form POST.
// In prod this site (geargrid.live) is on a different host than the API,
// but nginx proxies /api on BOTH geargrid.live and app.geargrid.live to the
// same backend, so a relative /api path works everywhere.
export const API_BASE = isDev
  ? "http://localhost:8086/api"
  : "/api";

export const URLS = {
  app: APP_BASE,
  login: `${APP_BASE}/login`,
  superAdminLogin: `${APP_BASE}/super-admin/login`,
};

// Opens a cross-origin URL safely.
// rel="noopener noreferrer" prevents the opened tab from manipulating
// window.opener (reverse tabnabbing) and strips the Referer header so the
// destination can't fingerprint where the click came from.
export const goToApp = (path = "/login") => {
  const target = `${APP_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  window.location.assign(target);
};
