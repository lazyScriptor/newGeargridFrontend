import { API_BASE } from "./urls";

// Lightweight fetch wrapper. Returns parsed JSON or throws an Error with the
// backend's `message` field. No retries — submit forms shouldn't auto-retry.
export const postJSON = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json;
};
