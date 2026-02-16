import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function QRCard({ status, qrCode, isLoading }) {
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
        {qrCode ? (
          <Image
            src={qrCode}
            alt="WhatsApp QR Code"
            width={224}
            height={224}
            unoptimized
            className="w-56 h-56 rounded-2xl border object-contain bg-white p-2"
          />
        ) : (
          <div
            className="
              w-56 h-56
              bg-muted
              rounded-2xl
              flex items-center justify-center
              text-muted-foreground
              text-sm
            "
          >
            {isLoading ? 'Memuat QR...' : 'QR belum tersedia'}
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center">
          Scan QR ini menggunakan WhatsApp di HP kamu
        </p>
      </CardContent>
    </Card>
  );
}
