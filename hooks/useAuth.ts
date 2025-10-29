'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Try to get initial session from cookie (optimistic)
function getInitialSession(): UserSession | null {
  if (typeof document === 'undefined') return null;
  try {
    const cookieValue = getCookie('user_session');
    if (cookieValue) {
      const decoded = decodeURIComponent(cookieValue);
      const session = JSON.parse(decoded);
      // Validate session structure
      if (session && session.id && session.email) {
        return session as UserSession;
      }
    }
  } catch {
    // Cookie parse failed, will fetch from API
  }
  return null;
}

export function useAuth() {
  // Optimistically set initial state from cookie if available
  const initialSession = typeof window !== 'undefined' ? getInitialSession() : null;
  const [session, setSession] = useState<UserSession | null>(initialSession);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>(() => 
    initialSession ? 'authenticated' : 'loading'
  );

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session', {
        cache: 'no-store',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setSession(data.user);
          setStatus('authenticated');
        } else {
          setSession(null);
          setStatus('unauthenticated');
        }
      } else {
        setSession(null);
        setStatus('unauthenticated');
      }
    } catch (error) {
      console.error('Session check error:', error);
      setSession(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    // Start checking immediately but don't block UI
    checkSession();
  }, [checkSession]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setSession(null);
      setStatus('unauthenticated');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    session,
    status,
    logout,
    refresh: checkSession,
  };
}

