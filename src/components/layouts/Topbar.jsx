import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Topbar() {
  return (
    <header className="
      h-16
      bg-background
      border-b
      px-6
      flex
      items-center
      justify-between
    ">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-lg">
          Dashboard
        </h1>

        <Badge className="bg-emerald-500 text-white">
          Connected
        </Badge>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-xl">
          Logout
        </Button>

        <Button className="rounded-xl">
          🔌 Connect WA
        </Button>
      </div>
    </header>
  );
}
