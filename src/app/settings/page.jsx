'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetConfigQuery, useUpdateConfigMutation } from '@/lib/wa-api';

function getErrorMessage(error) {
  return error?.data?.message || error?.data?.error || 'Gagal memperbarui konfigurasi';
}

export default function SettingsPage() {
  const { data: config, isFetching, isError, error } = useGetConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();
  const [saveMessage, setSaveMessage] = useState('');
  const [draft, setDraft] = useState(null);

  const initialForm = useMemo(
    () => ({
      botName: config?.name || '',
      timezone: config?.setting?.timezone || 'Asia/Jakarta',
      botCredit: config?.setting?.botCredit || '',
      aiCredit: config?.setting?.aiCredit || ''
    }),
    [config]
  );

  const form = draft || initialForm;

  const handleChange = key => event => {
    setSaveMessage('');
    setDraft(prev => ({
      ...(prev || initialForm),
      [key]: event.target.value
    }));
  };

  const handleSave = async () => {
    setSaveMessage('');

    try {
      await updateConfig({
        bot: {
          name: form.botName
        },
        setting: {
          timezone: form.timezone,
          botCredit: form.botCredit,
          aiCredit: form.aiCredit
        }
      }).unwrap();

      setDraft(null);
      setSaveMessage('Settings berhasil disimpan.');
    } catch (updateError) {
      setSaveMessage(getErrorMessage(updateError));
    }
  };

  const handleReset = () => {
    setDraft(null);
    setSaveMessage('');
  };

  if (isFetching && !config) {
    return <div className="text-sm text-muted-foreground">Memuat settings...</div>;
  }

  if (isError) {
    return (
      <div className="text-sm text-rose-600">
        {getErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🛠️ Settings</h2>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">General Bot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Bot Name</Label>
            <Input
              value={form.botName}
              onChange={handleChange('botName')}
              placeholder="Nama bot"
            />
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Input
              value={form.timezone}
              onChange={handleChange('timezone')}
              placeholder="Asia/Jakarta"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Reply Credit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Bot Credit</Label>
            <Textarea
              rows={3}
              value={form.botCredit}
              onChange={handleChange('botCredit')}
            />
          </div>

          <div className="space-y-2">
            <Label>AI Credit</Label>
            <Textarea
              rows={3}
              value={form.aiCredit}
              onChange={handleChange('aiCredit')}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Menyimpan...' : 'Simpan Settings'}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={isSaving}>
          Reset
        </Button>
        {saveMessage && (
          <p
            className={`text-sm ${
              saveMessage.toLowerCase().includes('berhasil')
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}
          >
            {saveMessage}
          </p>
        )}
      </div>
    </div>
  );
}
