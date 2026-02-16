'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { clearAuthSession, getAuthUser } from '@/lib/auth-storage';

export default function Topbar() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const syncUser = () => {
      const user = getAuthUser();
      setUserName(user?.name || user?.email || '');
    };

    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('auth-changed', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('auth-changed', syncUser);
    };
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.replace('/login');
  };

  return (
    <header className="
      h-16
      bg-background
      border-b
      px-6
      flex
      items-center
      justify-between
    ">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-lg">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-sm text-muted-foreground">{userName}</span>
        )}

        <Button variant="outline" className="rounded-xl" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
