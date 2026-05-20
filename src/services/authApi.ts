import type { AuthSession, AuthUser, SignInPayload, SignUpPayload } from "../types/auth";
import { translateAuthError } from "../utils/authErrors";

const sessionStorageKey = "iho_auth_session";
const userStorageKey = "iho_auth_user";

function getFunctionsBaseUrl(): string {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_NETLIFY_DEV_URL || "http://localhost:8888";
  }
  return "";
}

async function postAuth<T>(functionName: string, body: object): Promise<T> {
  const baseUrl = getFunctionsBaseUrl();
  const response = await fetch(`${baseUrl}/.netlify/functions/${functionName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(translateAuthError(data.error || "Não foi possível concluir a operação."));
  }

  return data as T;
}

export function getStoredAuth(): { user: AuthUser; session: AuthSession } | null {
  const sessionRaw = localStorage.getItem(sessionStorageKey);
  const userRaw = localStorage.getItem(userStorageKey);

  if (!sessionRaw || !userRaw) {
    return null;
  }

  try {
    return {
      session: JSON.parse(sessionRaw) as AuthSession,
      user: JSON.parse(userRaw) as AuthUser,
    };
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function clearStoredAuth(): void {
  localStorage.removeItem(sessionStorageKey);
  localStorage.removeItem(userStorageKey);
}

export function persistAuth(user: AuthUser, session: AuthSession): void {
  localStorage.setItem(sessionStorageKey, JSON.stringify(session));
  localStorage.setItem(userStorageKey, JSON.stringify(user));
}

export async function signUp(payload: SignUpPayload): Promise<AuthUser> {
  const data = await postAuth<{ user: AuthUser }>("auth-signup", payload);
  return data.user;
}

export async function signIn(
  payload: SignInPayload,
): Promise<{ user: AuthUser; session: AuthSession }> {
  const data = await postAuth<{ user: AuthUser; session: AuthSession }>(
    "auth-login",
    payload,
  );
  persistAuth(data.user, data.session);
  return data;
}

export function signOut(): void {
  clearStoredAuth();
}
