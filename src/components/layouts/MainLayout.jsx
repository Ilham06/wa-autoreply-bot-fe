'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getAuthToken } from '@/lib/auth-storage';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setHasToken(Boolean(getAuthToken()));
      setIsReady(true);
    };

    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('auth-changed', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('auth-changed', syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const isAuthPage = pathname === '/login';

    if (!hasToken && !isAuthPage) {
      router.replace('/login');
    } else if (hasToken && isAuthPage) {
      router.replace('/');
    }
  }, [hasToken, isReady, pathname, router]);

  if (!isReady) {
    return null;
  }

  const isAuthPage = pathname === '/login';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    );
  }

  if (!hasToken) {
    return null;
  }

  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="
          flex-1
          overflow-y-auto
          p-6
        ">
          {children}
        </main>
      </div>
    </div>
  );
}
