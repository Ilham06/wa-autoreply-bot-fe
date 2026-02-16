export function minutesToTime(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '00:00';

  const minutes = ((value % 1440) + 1440) % 1440;
  const hour = String(Math.floor(minutes / 60)).padStart(2, '0');
  const minute = String(minutes % 60).padStart(2, '0');
  return `${hour}:${minute}`;
}

export function timeToMinutes(value) {
  if (!value || !value.includes(':')) return 0;

  const [hourRaw, minuteRaw] = value.split(':');
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);

  if (Number.isNaN(hour) || Number.isNaN(minute)) return 0;
  return hour * 60 + minute;
}

export function msToMinutes(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.floor(value / 60000);
}

export function minutesToMs(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return num * 60000;
}

export function msToSeconds(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.floor(value / 1000);
}

export function secondsToMs(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return num * 1000;
}
