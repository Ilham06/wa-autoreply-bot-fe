import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function WorkingHours() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          🕒 Working Hours
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start</Label>
            <Input type="time" defaultValue="10:00" />
          </div>

          <div className="space-y-2">
            <Label>End</Label>
            <Input type="time" defaultValue="20:30" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Di luar jam kerja, bot akan membalas otomatis.
        </p>
      </CardContent>
    </Card>
  );
}
