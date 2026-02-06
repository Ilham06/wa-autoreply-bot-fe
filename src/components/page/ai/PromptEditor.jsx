'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function PromptEditor() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          System Prompt
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Textarea
          rows={10}
          placeholder="Tulis system prompt AI di sini..."
          defaultValue={`Kamu adalah AI pribadi Ilham.
Jawab dengan gaya santai, manusiawi, dan ramah.`}
        />

        <p className="text-xs text-muted-foreground">
          Prompt ini menentukan kepribadian dan aturan AI.
        </p>
      </CardContent>
    </Card>
  );
}
