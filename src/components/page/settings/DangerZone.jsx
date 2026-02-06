import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DangerZone() {
  return (
    <Card className="rounded-2xl border-rose-200">
      <CardHeader>
        <CardTitle className="text-rose-600">
          ☠️ Danger Zone
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Button variant="destructive">
          Reset All Chat States
        </Button>

        <p className="text-xs text-muted-foreground">
          Menghapus semua state chat & session (tidak bisa dibatalkan).
        </p>
      </CardContent>
    </Card>
  );
}
