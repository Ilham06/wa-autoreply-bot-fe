import { Badge } from '@/components/ui/badge';

export default function WAStatus({ status }) {
  const map = {
    connected: {
      text: 'WhatsApp Connected',
      className: 'bg-emerald-500 text-white'
    },
    waiting: {
      text: 'Scan QR untuk Login',
      className: 'bg-amber-500 text-white'
    },
    disconnected: {
      text: 'WhatsApp Disconnected',
      className: 'bg-rose-500 text-white'
    }
  };

  const current = map[status];

  return (
    <div className="flex items-center justify-center gap-3">
      <Badge className={current.className}>
        {current.text}
      </Badge>
    </div>
  );
}
