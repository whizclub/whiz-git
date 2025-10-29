import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

// Secure password hashing with bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
  hasPaid?: boolean;
}

// Unified session management
export async function setUserSession(user: UserSession): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('user_session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getUserSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('user_session');
    if (!session) return null;
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

export async function clearUserSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('user_session');
}

export async function requireUser(): Promise<UserSession> {
  const session = await getUserSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

// Admin-specific functions (backward compatibility)
export type AdminSession = UserSession;

export async function setAdminSession(admin: AdminSession): Promise<void> {
  return setUserSession(admin);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  return getUserSession();
}

export async function clearAdminSession(): Promise<void> {
  return clearUserSession();
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getUserSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('Unauthorized - Admin access required');
  }
  return session;
}

