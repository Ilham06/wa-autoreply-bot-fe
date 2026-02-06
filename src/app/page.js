import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold">
          Connected 📱
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Bot Status
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold">
          Active ⚙️
        </CardContent>
      </Card>
    </div>
  );
}
