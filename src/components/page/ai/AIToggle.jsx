import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function AIToggle() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center justify-between py-6">
        <div>
          <h3 className="font-semibold">
            AI Mode
          </h3>
          <p className="text-sm text-muted-foreground">
            Aktifkan atau matikan AI secara global
          </p>
        </div>

        <Switch defaultChecked />
      </CardContent>
    </Card>
  );
}
