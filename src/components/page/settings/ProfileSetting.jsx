import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileSettings() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          👤 Owner Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Owner Name</Label>
          <Input placeholder="Ilham" defaultValue="Ilham" />
        </div>

        <div className="space-y-2">
          <Label>Display Name</Label>
          <Input placeholder="Ilham (Auto Reply)" />
        </div>
      </CardContent>
    </Card>
  );
}
