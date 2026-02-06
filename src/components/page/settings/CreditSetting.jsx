import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function CreditSettings() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          ✍️ Reply Credit
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          rows={3}
          defaultValue="_(dibalas oleh AI Ilham 🤖)_"
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">
              Tampilkan credit di akhir pesan
            </p>
            <p className="text-xs text-muted-foreground">
              Berlaku untuk AI & bot reply
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
