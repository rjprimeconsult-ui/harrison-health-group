import postalData from "@/content/zip-state-data.json";

// GeoNames postal-code administrative state, downloaded 2026-11-13, CC BY 4.0.
// Unambiguous USPS territory records supplement places outside its US archive.
// Exact known ZIP ranges, not approximate prefixes or mainland postal-facility states.
// Conflicting postal-state records use the manual fallback.
// No visitor ZIP is sent to a third-party geocoding API.
const ranges = postalData.ranges as [number, number, string][];
export const zipDataSource = postalData.source;

export function stateForZip(zip: string): string {
  if (!/^\d{5}$/.test(zip)) return "";
  const value = Number(zip);
  let low = 0, high = ranges.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const [first, last, state] = ranges[middle];
    if (value < first) high = middle - 1;
    else if (value > last) low = middle + 1;
    else return state;
  }
  return "";
}

/** Format as typed; +1 is supported and excess digits are retained for validation rather than silently truncated. */
export function formatPhoneInput(value: string): string {
  let digits = value.replace(/\D/g, "");
  const explicitCountryPrefix = value.trim().startsWith("+1") || value.trim().startsWith("1");
  if (explicitCountryPrefix && digits.startsWith("1") && (digits.length === 11 || value.trim().startsWith("+1"))) digits = digits.slice(1);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
