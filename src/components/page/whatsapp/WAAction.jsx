import { Button } from '@/components/ui/button';

export default function WAActions({
  status,
  isSubmitting,
  onConnect,
  onLogout,
  onReset
}) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {status !== 'connected' && (
        <Button className="rounded-xl" onClick={onConnect} disabled={isSubmitting}>
          🔌 {isSubmitting ? 'Memproses...' : 'Connect / Refresh QR'}
        </Button>
      )}

      {/* {status === 'connected' && (
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={onLogout}
          disabled={isSubmitting}
        >
          🔓 {isSubmitting ? 'Memproses...' : 'Logout WhatsApp'}
        </Button>
      )} */}

      <Button
        variant="destructive"
        className="rounded-lg"
        onClick={onReset}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Memproses...' : 'Reset Session'}
      </Button>
    </div>
  );
}
