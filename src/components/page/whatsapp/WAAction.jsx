import { Button } from '@/components/ui/button';

export default function WAActions({ status }) {
  return (
    <div className="flex justify-center gap-3">
      {status !== 'connected' && (
        <Button className="rounded-xl">
          🔄 Refresh QR
        </Button>
      )}

      {status === 'connected' && (
        <Button variant="outline" className="rounded-xl">
          🔓 Logout WhatsApp
        </Button>
      )}
    </div>
  );
}
