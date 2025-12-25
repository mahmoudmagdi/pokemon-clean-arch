export const CACHE_TTL_DAYS = 7;

export function isCacheStale(updatedAt: Date, now: Date = new Date()): boolean {
    const diffMs = now.getTime() - updatedAt.getTime();
    const ttlMs = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
    return diffMs > ttlMs;
}
