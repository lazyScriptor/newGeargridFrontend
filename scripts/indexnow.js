#!/usr/bin/env node
// IndexNow submission script.
// Notifies Bing, Yandex, DuckDuckGo, Naver, and Seznam that URLs have new or
// updated content. Bing checks ownership by GET-ing the key file at
// https://geargrid.live/<KEY>.txt and comparing its content to KEY below.
//
// Usage:
//   npm run indexnow                       # submits the default URL list
//   npm run indexnow -- <url> [<url>...]   # submits the URLs you pass
//
// Requires Node 18+ for global fetch.

const KEY = "22d28e47c5184c3ea50bd6cc20429dc9";
const HOST = "geargrid.live";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

const DEFAULT_URLS = [
  `${ORIGIN}/`,
  `${ORIGIN}/rental-management-software`,
  `${ORIGIN}/features`,
  `${ORIGIN}/pricing`,
  `${ORIGIN}/contact`,
];

const argv = process.argv.slice(2);
const urls = argv.length ? argv : DEFAULT_URLS;

// Pre-flight: confirm the key file is actually live at the expected URL.
// Without this Bing rejects the whole submission with 403, so checking first
// gives a clearer error than the IndexNow API does.
console.log(`→ Verifying key file at ${KEY_LOCATION}`);
try {
  const keyRes = await fetch(KEY_LOCATION, { redirect: "follow" });
  if (!keyRes.ok) {
    console.error(
      `✗ Key file not reachable: HTTP ${keyRes.status}. Make sure the latest build is deployed.`,
    );
    process.exit(1);
  }
  const body = (await keyRes.text()).trim();
  if (body !== KEY) {
    console.error(
      `✗ Key file content mismatch.\n  Expected: ${KEY}\n  Got:      ${body || "(empty)"}`,
    );
    process.exit(1);
  }
  console.log("  ✓ Key file verified.\n");
} catch (err) {
  console.error(`✗ Could not fetch key file: ${err.message}`);
  process.exit(1);
}

console.log(`→ Submitting ${urls.length} URL(s) to IndexNow:`);
urls.forEach((u) => console.log(`  ${u}`));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

// IndexNow status codes:
//   200 — URLs received
//   202 — Accepted; key validation pending (normal on first submission)
//   400 — Bad request
//   403 — Key/file mismatch
//   422 — URLs outside host, malformed
//   429 — Rate limited
const text = await res.text().catch(() => "");
if (res.status === 200 || res.status === 202) {
  console.log(
    `\n✓ ${res.status === 200 ? "Accepted" : "Pending validation"} (HTTP ${res.status}). Bing, Yandex, DuckDuckGo, Naver, and Seznam notified.`,
  );
  process.exit(0);
}

console.error(`\n✗ Rejected: HTTP ${res.status} ${res.statusText}`);
if (text) console.error(`  Response: ${text}`);
process.exit(1);
