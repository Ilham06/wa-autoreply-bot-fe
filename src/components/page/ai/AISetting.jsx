import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AISettings() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          AI Behavior
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Max Response Length</Label>
          <Input type="number" defaultValue={3} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Use Emoji</Label>
            <p className="text-xs text-muted-foreground">
              Emoji ringan di jawaban
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Casual Tone</Label>
            <p className="text-xs text-muted-foreground">
              Jawaban santai & friendly
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
