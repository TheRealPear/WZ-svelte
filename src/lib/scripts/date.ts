// Format a timestamp (ms) into YYYY-MM-DD
export function formatDate(ms: number): string {
  return new Date(ms).toUTCString();
}

export function formatDateSimplified(ms: number): string {
  return new Date(ms).toISOString().split('T')[0];
}

// Convert timestamp (ms) into hours
export function formatHours(ms: number): number {
  return Math.floor(ms / (1000 * 60 * 60));
}
