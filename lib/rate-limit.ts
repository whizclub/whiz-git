import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimit = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  rateLimit.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimit.delete(key);
    }
  });
}, 600000);

export function checkRateLimit(
  request: NextRequest,
  limit: number = 10,
  windowMs: number = 60000
): { limited: boolean; remaining: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { limited: false, remaining: limit - 1 };
  }

  if (userLimit.count >= limit) {
    return { limited: true, remaining: 0 };
  }

  userLimit.count++;
  return { limited: false, remaining: limit - userLimit.count };
}

