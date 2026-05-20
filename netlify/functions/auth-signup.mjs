import { getSupabaseAdmin, jsonResponse, corsHeaders } from "./_shared/supabase.mjs";
import { translateAuthError } from "./_shared/authErrors.mjs";
import { validateSignUpPayload } from "./_shared/validation.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método não permitido." });
  }

  try {
    const { email, password, name, phone } = JSON.parse(event.body || "{}");

    const validationError = validateSignUpPayload({ email, password, name, phone });
    if (validationError) {
      return jsonResponse(400, { error: validationError });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();
    const normalizedPhone = phone?.trim() || null;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        name: normalizedName,
        phone: normalizedPhone,
      },
    });

    if (error) {
      return jsonResponse(400, { error: translateAuthError(error.message) });
    }

    return jsonResponse(201, {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name ?? normalizedName,
        phone: data.user.user_metadata?.phone ?? normalizedPhone,
      },
    });
  } catch (err) {
    return jsonResponse(500, {
      error: err.message || "Erro ao criar conta.",
    });
  }
}
