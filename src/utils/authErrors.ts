const errorMap: Record<string, string> = {
  "User already registered": "Já existe uma conta com este e-mail.",
  "A user with this email address has already been registered":
    "Já existe uma conta com este e-mail.",
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "Email not confirmed": "Confirme seu e-mail antes de entrar.",
  "Password should be at least 6 characters":
    "A senha deve ter pelo menos 6 caracteres.",
  "Database error saving new user":
    "Não foi possível salvar o perfil. Verifique nome e telefone e tente de novo.",
  "Unable to validate email address: invalid format":
    "Informe um e-mail válido.",
};

export function translateAuthError(message: string): string {
  return errorMap[message] ?? message;
}
