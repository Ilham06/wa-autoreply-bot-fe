import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StatCard() {
  return (
    <Card className="rounded-2xl hover:shadow-md transition">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          WhatsApp Status
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="text-xl font-semibold">
          Connected
        </div>
        <Badge className="bg-emerald-500 text-white">
          Online
        </Badge>
      </CardContent>
    </Card>
  )
}
