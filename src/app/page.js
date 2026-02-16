'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetConfigQuery, useGetQrQuery } from '@/lib/wa-api';

function waStatusMeta(status) {
  if (status === 'connected') {
    return { label: 'Connected', className: 'bg-emerald-500 text-white' };
  }

  if (status === 'waiting') {
    return { label: 'Waiting QR', className: 'bg-amber-500 text-white' };
  }

  return { label: 'Disconnected', className: 'bg-rose-500 text-white' };
}

export default function DashboardPage() {
  const { data: config, isFetching: isConfigLoading } = useGetConfigQuery();
  const { data: waData, isFetching: isWaLoading } = useGetQrQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true
  });

  const status = waData?.status || 'disconnected';
  const statusMeta = waStatusMeta(status);
  const setting = config?.setting;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">📊 Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Ringkasan status bot, WhatsApp, dan AI configuration.
          </p>
        </div>

        <Badge className={statusMeta.className}>
          WA {statusMeta.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-xl font-semibold">{statusMeta.label}</p>
            <p className="text-xs text-muted-foreground">
              {isWaLoading ? 'Sinkronisasi status...' : 'Update otomatis tiap 10 detik'}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Bot Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-xl font-semibold">
              {config?.isActive ? 'Active' : 'Paused'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isConfigLoading ? 'Memuat konfigurasi...' : `Timezone: ${setting?.timezone || '-'}`}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">AI Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-xl font-semibold">{setting?.aiModel || '-'}</p>
            <p className="text-xs text-muted-foreground">
              Temp {setting?.aiTemperature ?? '-'} • TopP {setting?.aiTopP ?? '-'}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Spam Guard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-xl font-semibold">{setting?.spamLimit ?? '-'} msg</p>
            <p className="text-xs text-muted-foreground">
              Window {(setting?.spamWindowMs ?? 0) / 1000 || '-'} detik
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <Link href="/whatsapp">Buka WhatsApp Panel</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/rules">Atur Bot Rules</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/ai">Edit AI Config</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/settings">Edit Settings</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Current Configuration Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p><span className="text-muted-foreground">Bot Name:</span> {config?.name || '-'}</p>
            <p><span className="text-muted-foreground">Timezone:</span> {setting?.timezone || '-'}</p>
            <p><span className="text-muted-foreground">AI Timeout:</span> {((setting?.aiModeTimeoutMs ?? 0) / 60000) || '-'} menit</p>
          </div>
          <div className="space-y-1">
            <p><span className="text-muted-foreground">Owner Timeout:</span> {((setting?.ownerReplyTimeoutMs ?? 0) / 60000) || '-'} menit</p>
            <p><span className="text-muted-foreground">Allow Emoji:</span> {setting?.allowEmoji ? 'Yes' : 'No'}</p>
            <p><span className="text-muted-foreground">Emoji Style:</span> {setting?.emojiStyle || '-'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
