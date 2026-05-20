import type { SignUpPayload } from "../types/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[\p{L}\p{M}]+(?:[' -][\p{L}\p{M}]+)*$/u;
const phonePattern = /^\+[0-9]{1,4} [0-9\s().-]+$/;

export type SignUpFieldErrors = Partial<
  Record<keyof SignUpPayload | "phone", string>
>;

function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export function sanitizeName(value: string): string {
  return value
    .replace(/[^\p{L}\p{M}' -]/gu, "")
    .replace(/\s+/g, " ");
}

export function validateSignUpFields(
  payload: SignUpPayload,
): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
  const email = payload.email.trim().toLowerCase();
  const name = payload.name.trim();
  const phone = payload.phone.trim();

  if (!email) {
    errors.email = "Informe o e-mail.";
  } else if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!payload.password) {
    errors.password = "Informe a senha.";
  } else if (payload.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  } else if (payload.password.length > 72) {
    errors.password = "A senha deve ter no máximo 72 caracteres.";
  }

  if (!name) {
    errors.name = "Informe o nome.";
  } else if (name.length < 2 || name.length > 100) {
    errors.name = "O nome deve ter entre 2 e 100 caracteres.";
  } else if (!namePattern.test(name)) {
    errors.name =
      "Use apenas letras, espaços, hífen ou apóstrofo (sem números ou símbolos).";
  }

  if (phone) {
    const digits = countDigits(phone);
    if (!phonePattern.test(phone) || digits < 10 || digits > 15) {
      errors.phone =
        "Informe um telefone válido com DDD, ex.: (11) 98765-4321.";
    }
  }

  return errors;
}

export function getFirstSignUpError(errors: SignUpFieldErrors): string | null {
  const fields: (keyof SignUpFieldErrors)[] = [
    "email",
    "password",
    "name",
    "phone",
  ];
  for (const field of fields) {
    if (errors[field]) {
      return errors[field] ?? null;
    }
  }
  return null;
}

export function hasSignUpErrors(errors: SignUpFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
