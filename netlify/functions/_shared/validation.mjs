const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[\p{L}\p{M}]+(?:[' -][\p{L}\p{M}]+)*$/u;
const phonePattern = /^\+[0-9]{1,4} [0-9\s().-]+$/;

function countDigits(value) {
  return value.replace(/\D/g, "").length;
}

export function validateSignUpPayload({ email, password, name, phone }) {
  const normalizedEmail = email?.trim().toLowerCase() ?? "";
  const normalizedName = name?.trim() ?? "";
  const normalizedPhone = phone?.trim() ?? "";

  if (!normalizedEmail || !emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return "Informe um e-mail válido.";
  }

  if (!password || password.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  if (password.length > 72) {
    return "A senha deve ter no máximo 72 caracteres.";
  }

  if (!normalizedName || normalizedName.length < 2 || normalizedName.length > 100) {
    return "O nome deve ter entre 2 e 100 caracteres.";
  }

  if (!namePattern.test(normalizedName)) {
    return "O nome deve conter apenas letras, espaços, hífen ou apóstrofo.";
  }

  if (normalizedPhone) {
    const digits = countDigits(normalizedPhone);
    if (!phonePattern.test(normalizedPhone) || digits < 10 || digits > 15) {
      return "Informe um telefone válido com DDD, ex.: +55 (11) 98765-4321.";
    }
  }

  return null;
}
