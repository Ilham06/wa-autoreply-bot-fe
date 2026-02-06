import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QRCard({ status }) {
  if (status === 'connected') {
    return (
      <Card className="rounded-3xl text-center">
        <CardContent className="py-16">
          <div className="text-4xl mb-3">✅</div>
          <p className="text-lg font-semibold">
            WhatsApp sudah terhubung
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Bot siap membalas pesan
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          Hubungkan WhatsApp
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 py-8">
        {/* Dummy QR */}
        <div className="
          w-56 h-56
          bg-muted
          rounded-2xl
          flex items-center justify-center
          text-muted-foreground
          text-sm
          animate-pulse
        ">
          QR Code
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Scan QR ini menggunakan WhatsApp di HP kamu
        </p>
      </CardContent>
    </Card>
  );
}
