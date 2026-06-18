const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestLog = new Map<string, number[]>();

function pruneOldTimestamps(timestamps: number[], now: number) {
  return timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
}

export function isContactRateLimited(key: string) {
  const now = Date.now();
  const recent = pruneOldTimestamps(requestLog.get(key) ?? [], now);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);
  return false;
}
