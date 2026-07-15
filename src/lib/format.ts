const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** Formats a number as Indian rupees, e.g. 120000 -> "₹1,20,000". */
export function formatInr(value: number): string {
  return `₹${inrFormatter.format(value)}`;
}

/** Pads a count to two digits, e.g. 4 -> "04". */
export function padCount(value: number): string {
  return String(value).padStart(2, "0");
}
