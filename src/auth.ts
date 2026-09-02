import { AUTH_BASE_URL } from './api/config';

const LOGIN_URL = `${AUTH_BASE_URL}/api/wanaka/accounts/login`;
const TOKEN_KEY = 'com.furia.auth';

type LoginResponse = {
  accesstoken: string;
  refreshtoken: string;
  tokentype: string;
};

type StoredTokens = {
  accesstoken: string;
  refreshtoken: string;
  tokentype: string;
};

/**
 * SECURITY NOTE — this is a downgrade from the React Native app, which kept
 * tokens in the iOS Keychain / Android Keystore (encrypted at rest). The web
 * platform offers no encrypted-at-rest store: anything reachable from JS is
 * readable by any script running on this origin, so an XSS bug exfiltrates the
 * token. sessionStorage is the narrowest of the bad options — it is scoped to
 * the tab and cleared when it closes, unlike localStorage which survives a
 * browser restart. The real fix is for the API to issue an httpOnly, Secure,
 * SameSite cookie so the token never reaches JS at all; move to that when the
 * backend can.
 */
function readTokens(): StoredTokens | null {
  const raw = sessionStorage.getItem(TOKEN_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as StoredTokens;
  } catch {
    // Corrupt or hand-edited entry — treat it as logged out.
    sessionStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

/**
 * btoa() only accepts Latin-1, so it throws on a non-ASCII email or password.
 * Encoding to UTF-8 bytes first keeps parity with the `base-64` package the
 * native app used.
 */
function encodeBasicCredentials(email: string, password: string): string {
  const bytes = new TextEncoder().encode(`${email}:${password}`);
  return btoa(String.fromCharCode(...bytes));
}

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(LOGIN_URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${encodeBasicCredentials(email, password)}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const { accesstoken, refreshtoken, tokentype }: LoginResponse =
    await response.json();

  sessionStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ accesstoken, refreshtoken, tokentype }),
  );
}

export function getAccessToken(): string | null {
  return readTokens()?.accesstoken ?? null;
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

export function logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}
