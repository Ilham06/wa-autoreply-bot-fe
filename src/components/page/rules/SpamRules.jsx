import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SpamRules() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          🚨 Spam Protection
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Max Messages</Label>
          <Input type="number" defaultValue={5} />
        </div>

        <div className="space-y-2">
          <Label>Window (seconds)</Label>
          <Input type="number" defaultValue={10} />
        </div>

        <p className="text-xs text-muted-foreground">
          Jika user mengirim terlalu banyak pesan, bot akan menolak.
        </p>
      </CardContent>
    </Card>
  );
}
