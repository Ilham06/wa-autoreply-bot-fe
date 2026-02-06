import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function BotControl() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center justify-between py-6">
        <div>
          <h3 className="font-semibold">
            Bot Active
          </h3>
          <p className="text-sm text-muted-foreground">
            Matikan semua auto-reply bot
          </p>
        </div>

        <Switch defaultChecked />
      </CardContent>
    </Card>
  );
}
