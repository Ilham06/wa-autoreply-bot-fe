import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TimeoutRules() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          ⏳ Timeout Rules
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>AI Mode Timeout (minutes)</Label>
          <Input type="number" defaultValue={60} />
        </div>

        <div className="space-y-2">
          <Label>Owner Reply Timeout (minutes)</Label>
          <Input type="number" defaultValue={60} />
        </div>

        <p className="md:col-span-2 text-xs text-muted-foreground">
          Setelah waktu ini, state chat akan otomatis di-reset.
        </p>
      </CardContent>
    </Card>
  );
}
