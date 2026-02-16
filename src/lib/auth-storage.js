const TOKEN_KEY = 'wa_bot_token';
const USER_KEY = 'wa_bot_user';

export function getAuthToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function getAuthUser() {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuthSession({ token, user }) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user || null));
  window.dispatchEvent(new Event('auth-changed'));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('auth-changed'));
}
