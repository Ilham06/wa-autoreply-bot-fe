'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const menus = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  // { name: 'Inbox', href: '/inbox', icon: '💬' },
  { name: 'WhatsApp', href: '/whatsapp', icon: '📱' },
  { name: 'AI Config', href: '/ai', icon: '🤖' },
  { name: 'Bot Rules', href: '/rules', icon: '⚙️' },
  { name: 'Settings', href: '/settings', icon: '🛠️' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="
      w-64
      bg-background
      border-r
      flex
      flex-col
    ">
      {/* Brand */}
      <div className="h-16 px-6 flex items-center gap-2 font-semibold text-lg">
        🤖 WA Bot
        <Badge variant="secondary" className="ml-auto">
          Beta
        </Badge>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menus.map(menu => {
          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <span className="text-lg">{menu.icon}</span>
              {menu.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-muted-foreground">
        © 2026 Ilham
      </div>
    </aside>
  );
}
