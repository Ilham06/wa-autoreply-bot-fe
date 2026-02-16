'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetConfigQuery, useUpdateConfigMutation } from '@/lib/wa-api';
import {
  minutesToMs,
  minutesToTime,
  msToMinutes,
  msToSeconds,
  secondsToMs,
  timeToMinutes
} from '@/lib/config-utils';

function getErrorMessage(error) {
  return error?.data?.message || error?.data?.error || 'Gagal menyimpan bot rules';
}

export default function BotRulesPage() {
  const { data: config, isFetching, isError, error } = useGetConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(null);

  const initialForm = useMemo(
    () => ({
      isActive: Boolean(config?.isActive),
      offStart: minutesToTime(config?.setting?.offStartMinutes ?? 1230),
      offEnd: minutesToTime(config?.setting?.offEndMinutes ?? 600),
      spamLimit: String(config?.setting?.spamLimit ?? 5),
      spamWindowSeconds: String(msToSeconds(config?.setting?.spamWindowMs ?? 10000)),
      aiModeTimeoutMinutes: String(msToMinutes(config?.setting?.aiModeTimeoutMs ?? 3600000)),
      ownerReplyTimeoutMinutes: String(msToMinutes(config?.setting?.ownerReplyTimeoutMs ?? 3600000)),
      offlineReplyText: config?.setting?.offlineReplyText || '',
      outsideHoursReplyText: config?.setting?.outsideHoursReplyText || '',
      spamReplyText: config?.setting?.spamReplyText || '',
      aiOfferText: config?.setting?.aiOfferText || '',
      aiAcceptedText: config?.setting?.aiAcceptedText || ''
    }),
    [config]
  );

  const form = draft || initialForm;

  const handleChange = key => event => {
    setMessage('');
    setDraft(prev => ({
      ...(prev || initialForm),
      [key]: event.target.value
    }));
  };

  const handleSave = async () => {
    setMessage('');
    try {
      await updateConfig({
        bot: {
          isActive: form.isActive
        },
        setting: {
          offStartMinutes: timeToMinutes(form.offStart),
          offEndMinutes: timeToMinutes(form.offEnd),
          spamLimit: Number(form.spamLimit),
          spamWindowMs: secondsToMs(form.spamWindowSeconds),
          aiModeTimeoutMs: minutesToMs(form.aiModeTimeoutMinutes),
          ownerReplyTimeoutMs: minutesToMs(form.ownerReplyTimeoutMinutes),
          offlineReplyText: form.offlineReplyText,
          outsideHoursReplyText: form.outsideHoursReplyText,
          spamReplyText: form.spamReplyText,
          aiOfferText: form.aiOfferText,
          aiAcceptedText: form.aiAcceptedText
        }
      }).unwrap();

      setDraft(null);
      setMessage('Bot rules berhasil disimpan.');
    } catch (saveError) {
      setMessage(getErrorMessage(saveError));
    }
  };

  const handleReset = () => {
    setDraft(null);
    setMessage('');
  };

  if (isFetching && !config) {
    return <div className="text-sm text-muted-foreground">Memuat bot rules...</div>;
  }

  if (isError) {
    return <div className="text-sm text-rose-600">{getErrorMessage(error)}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">⚙️ Bot Rules</h2>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Bot Control</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Bot Active</p>
            <p className="text-xs text-muted-foreground">
              Matikan semua auto-reply bot
            </p>
          </div>
          <Switch
            checked={form.isActive}
            onCheckedChange={checked =>
              setDraft(prev => ({
                ...(prev || initialForm),
                isActive: checked
              }))
            }
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Working Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start</Label>
                <Input type="time" value={form.offStart} onChange={handleChange('offStart')} />
              </div>
              <div className="space-y-2">
                <Label>End</Label>
                <Input type="time" value={form.offEnd} onChange={handleChange('offEnd')} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Spam Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Spam Limit</Label>
              <Input
                type="number"
                value={form.spamLimit}
                onChange={handleChange('spamLimit')}
              />
            </div>
            <div className="space-y-2">
              <Label>Spam Window (seconds)</Label>
              <Input
                type="number"
                value={form.spamWindowSeconds}
                onChange={handleChange('spamWindowSeconds')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Timeout Rules</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>AI Mode Timeout (minutes)</Label>
            <Input
              type="number"
              value={form.aiModeTimeoutMinutes}
              onChange={handleChange('aiModeTimeoutMinutes')}
            />
          </div>
          <div className="space-y-2">
            <Label>Owner Reply Timeout (minutes)</Label>
            <Input
              type="number"
              value={form.ownerReplyTimeoutMinutes}
              onChange={handleChange('ownerReplyTimeoutMinutes')}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Reply Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Offline Reply Text</Label>
            <Textarea rows={3} value={form.offlineReplyText} onChange={handleChange('offlineReplyText')} />
          </div>
          <div className="space-y-2">
            <Label>Outside Hours Reply Text</Label>
            <Textarea rows={3} value={form.outsideHoursReplyText} onChange={handleChange('outsideHoursReplyText')} />
          </div>
          <div className="space-y-2">
            <Label>Spam Reply Text</Label>
            <Textarea rows={3} value={form.spamReplyText} onChange={handleChange('spamReplyText')} />
          </div>
          <div className="space-y-2">
            <Label>AI Offer Text</Label>
            <Textarea rows={3} value={form.aiOfferText} onChange={handleChange('aiOfferText')} />
          </div>
          <div className="space-y-2">
            <Label>AI Accepted Text</Label>
            <Textarea rows={3} value={form.aiAcceptedText} onChange={handleChange('aiAcceptedText')} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Menyimpan...' : 'Simpan Bot Rules'}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={isSaving}>
          Reset
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.toLowerCase().includes('berhasil')
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
