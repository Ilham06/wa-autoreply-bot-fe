'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function SourceEditor() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          Source of Truth
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Textarea
          rows={10}
          placeholder="Informasi faktual tentang owner..."
          defaultValue={`Nama: Ilham
Pekerjaan: Software Engineer
Domisili: Jakarta`}
        />

        <p className="text-xs text-muted-foreground">
          AI hanya boleh menjawab berdasarkan data ini.
        </p>
      </CardContent>
    </Card>
  );
}
