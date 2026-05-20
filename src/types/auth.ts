export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
};

export type SignUpPayload = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};
