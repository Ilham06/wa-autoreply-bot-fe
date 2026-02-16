'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetConfigQuery, useUpdateConfigMutation } from '@/lib/wa-api';

function getErrorMessage(error) {
  return error?.data?.message || error?.data?.error || 'Gagal menyimpan AI config';
}

export default function AIConfigPage() {
  const { data: config, isFetching, isError, error } = useGetConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(null);

  const initialForm = useMemo(
    () => ({
      aiModel: config?.setting?.aiModel || '',
      aiTemperature: String(config?.setting?.aiTemperature ?? '0.6'),
      aiTopP: String(config?.setting?.aiTopP ?? '0.9'),
      aiMaxTokens: config?.setting?.aiMaxTokens == null ? '' : String(config?.setting?.aiMaxTokens),
      allowEmoji: Boolean(config?.setting?.allowEmoji),
      emojiStyle: config?.setting?.emojiStyle || 'light',
      systemPrompt: config?.setting?.systemPrompt || '',
      sourceOfTruth: config?.setting?.sourceOfTruth || '',
      aiBehavior: config?.setting?.aiBehavior || ''
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
        setting: {
          aiModel: form.aiModel,
          aiTemperature: Number(form.aiTemperature),
          aiTopP: Number(form.aiTopP),
          aiMaxTokens: form.aiMaxTokens === '' ? null : Number(form.aiMaxTokens),
          allowEmoji: form.allowEmoji,
          emojiStyle: form.emojiStyle,
          systemPrompt: form.systemPrompt,
          sourceOfTruth: form.sourceOfTruth,
          aiBehavior: form.aiBehavior
        }
      }).unwrap();

      setDraft(null);
      setMessage('AI configuration berhasil disimpan.');
    } catch (saveError) {
      setMessage(getErrorMessage(saveError));
    }
  };

  const handleReset = () => {
    setDraft(null);
    setMessage('');
  };

  if (isFetching && !config) {
    return <div className="text-sm text-muted-foreground">Memuat AI config...</div>;
  }

  if (isError) {
    return <div className="text-sm text-rose-600">{getErrorMessage(error)}</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold">🤖 AI Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>System Prompt</Label>
              <Textarea
                rows={9}
                value={form.systemPrompt}
                onChange={handleChange('systemPrompt')}
              />
            </div>

            <div className="space-y-2">
              <Label>Source of Truth</Label>
              <Textarea
                rows={9}
                value={form.sourceOfTruth}
                onChange={handleChange('sourceOfTruth')}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Model Setting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>AI Model</Label>
              <Input value={form.aiModel} onChange={handleChange('aiModel')} />
            </div>

            <div className="space-y-2">
              <Label>AI Temperature</Label>
              <Input
                type="number"
                step="0.1"
                value={form.aiTemperature}
                onChange={handleChange('aiTemperature')}
              />
            </div>

            <div className="space-y-2">
              <Label>AI Top P</Label>
              <Input
                type="number"
                step="0.1"
                value={form.aiTopP}
                onChange={handleChange('aiTopP')}
              />
            </div>

            <div className="space-y-2">
              <Label>AI Max Tokens (optional)</Label>
              <Input
                type="number"
                value={form.aiMaxTokens}
                onChange={handleChange('aiMaxTokens')}
              />
            </div>

            <div className="space-y-2">
              <Label>Emoji Style</Label>
              <Input
                value={form.emojiStyle}
                onChange={handleChange('emojiStyle')}
                placeholder="light / casual / formal"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Allow Emoji</p>
                <p className="text-xs text-muted-foreground">
                  Aktifkan emoji pada output AI
                </p>
              </div>
              <Switch
                checked={form.allowEmoji}
                onCheckedChange={checked =>
                  setDraft(prev => ({
                    ...(prev || initialForm),
                    allowEmoji: checked
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">AI Behavior</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={5}
            value={form.aiBehavior}
            onChange={handleChange('aiBehavior')}
            placeholder="Aturan perilaku AI"
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Menyimpan...' : 'Simpan AI Config'}
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
