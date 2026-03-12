// lib/csvFetcher.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fetches a Google Sheet published as CSV and returns structured shop data.
// Google Sheet must be: File → Share → Publish to web → CSV format.
// ─────────────────────────────────────────────────────────────────────────────

export interface ShopRow {
  slug:    string;
  name:    string;
  phone:   string;
  address: string; // always overridden to FIXED_ADDRESS below
}

// ── Constants ─────────────────────────────────────────────────────────────────
export const FALLBACK_PHONE   = "+421 952 049 119";
export const FALLBACK_NAME    = "Prémiový Barber";
export const FIXED_ADDRESS    = "Slovakia, Bratislava";

// ── CSV Parser ────────────────────────────────────────────────────────────────
// Handles quoted fields and trailing whitespace — safe for Google Sheets output.
function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.replace(/^"|"$/g, "").trim().toLowerCase());

  return lines.slice(1).map((line) => {
    // Split on commas that are NOT inside quotes
    const values = line
      .match(/(".*?"|[^",]+)(?=,|$)|(?<=,|^)(?=,|$)/g)
      ?.map((v) => v.replace(/^"|"$/g, "").trim()) ?? [];

    return Object.fromEntries(
      headers.map((h, i) => [h, values[i] ?? ""])
    );
  });
}

// ── Main fetcher ──────────────────────────────────────────────────────────────
export async function getShopBySlug(
  csvUrl: string,
  slug: string
): Promise<ShopRow> {
  const fallback: ShopRow = {
    slug,
    name:    FALLBACK_NAME,
    phone:   FALLBACK_PHONE,
    address: FIXED_ADDRESS,
  };

  // Guard: if no CSV URL configured yet, return fallback silently
  if (!csvUrl || csvUrl.includes("PASTE_YOUR_CSV_URL_HERE")) {
    console.warn("[csvFetcher] No CSV URL configured — using fallback data.");
    return fallback;
  }

  try {
    const res = await fetch(csvUrl, {
      cache: "no-store", // always fresh — no CDN/ISR caching
    });

    if (!res.ok) {
      console.error(`[csvFetcher] HTTP ${res.status} fetching CSV.`);
      return fallback;
    }

    const raw  = await res.text();
    const rows = parseCSV(raw);

    if (rows.length === 0) {
      console.warn("[csvFetcher] CSV parsed 0 rows.");
      return fallback;
    }

    // Find the row matching this slug (case-insensitive, trimmed)
    const match = rows.find(
      (r) => r["slug"]?.toLowerCase().trim() === slug.toLowerCase().trim()
    );

    if (!match) {
      console.warn(`[csvFetcher] Slug "${slug}" not found in CSV.`);
      return fallback;
    }

    // Resolve phone — if empty in sheet, use fallback
    const phone =
      match["phone"]?.trim().length > 0
        ? match["phone"].trim()
        : FALLBACK_PHONE;

    return {
      slug:    match["slug"]?.trim()  || slug,
      name:    match["name"]?.trim()  || FALLBACK_NAME,
      phone,
      address: FIXED_ADDRESS, // always hardcoded regardless of sheet
    };
  } catch (err) {
    console.error("[csvFetcher] Unexpected error:", err);
    return fallback;
  }
}
