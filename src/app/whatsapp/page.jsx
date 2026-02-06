'use client';

import QRCard from '@/components/page/whatsapp/QRCard';
import WAStatus from '@/components/page/whatsapp/WAStatus';
import WAActions from '@/components/page/whatsapp/WAAction';

export default function WhatsAppPage() {
  // dummy state (nanti dari API)
  const waStatus = 'waiting'; 
  // 'connected' | 'waiting' | 'disconnected'

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <WAStatus status={waStatus} />
        <QRCard status={waStatus} />
        <WAActions status={waStatus} />
      </div>
    </div>
  );
}
