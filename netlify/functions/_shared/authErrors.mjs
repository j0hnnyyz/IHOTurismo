const errorMap = {
  "User already registered": "Já existe uma conta com este e-mail.",
  "A user with this email address has already been registered":
    "Já existe uma conta com este e-mail.",
  "Database error saving new user":
    "Não foi possível salvar o perfil. Verifique nome e telefone e tente de novo.",
  "Unable to validate email address: invalid format":
    "Informe um e-mail válido.",
  "Password should be at least 6 characters":
    "A senha deve ter pelo menos 6 caracteres.",
};

export function translateAuthError(message) {
  if (!message) {
    return "Não foi possível concluir a operação.";
  }

  const mapped = errorMap[message];
  if (mapped) {
    return mapped;
  }

  if (message.includes("profiles_name_format")) {
    return "Nome inválido. Use entre 2 e 100 caracteres.";
  }

  if (message.includes("profiles_phone_format")) {
    return "Telefone inválido. Use o formato (11) 98765-4321.";
  }

  return message;
}
