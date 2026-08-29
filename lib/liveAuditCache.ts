import { AuditReport } from './types';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'scratch', 'live_audit_cache.json');
const memoryCache = new Map<string, AuditReport>();

// Load initial disk cache if available
try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const data: Record<string, AuditReport> = JSON.parse(raw);
    Object.entries(data).forEach(([key, report]) => {
      memoryCache.set(key, report);
    });
  }
} catch {
  // Ignore disk cache load error
}

function persistDiskCache() {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const obj: Record<string, AuditReport> = {};
    memoryCache.forEach((value, key) => {
      obj[key] = value;
    });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2));
  } catch {
    // Ignore disk cache write error
  }
}

export function getCachedLiveAudit(repoSlug: string, iteration: string): AuditReport | null {
  const cacheKey = `${repoSlug}:${iteration}`;
  return memoryCache.get(cacheKey) || null;
}

export function setCachedLiveAudit(repoSlug: string, iteration: string, report: AuditReport): void {
  const cacheKey = `${repoSlug}:${iteration}`;
  memoryCache.set(cacheKey, report);
  persistDiskCache();
}
