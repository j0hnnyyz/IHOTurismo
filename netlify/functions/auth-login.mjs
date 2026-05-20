import { getSupabaseAdmin, jsonResponse, corsHeaders } from "./_shared/supabase.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Método não permitido." });
  }

  try {
    const { email, password } = JSON.parse(event.body || "{}");

    if (!email?.trim() || !password) {
      return jsonResponse(400, {
        error: "E-mail e senha são obrigatórios.",
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
      return jsonResponse(500, {
        error: "Configuração do Supabase ausente no servidor.",
      });
    }

    const tokenResponse = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      },
    );

    const tokenPayload = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return jsonResponse(401, {
        error: tokenPayload.error_description || tokenPayload.msg || tokenPayload.error || "E-mail ou senha incorretos.",
      });
    }

    const supabase = getSupabaseAdmin();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("name, phone")
      .eq("user_id", tokenPayload.user.id)
      .maybeSingle();

    if (profileError) {
      return jsonResponse(500, { error: profileError.message });
    }

    return jsonResponse(200, {
      session: {
        access_token: tokenPayload.access_token,
        refresh_token: tokenPayload.refresh_token,
        expires_at: tokenPayload.expires_at,
      },
      user: {
        id: tokenPayload.user.id,
        email: tokenPayload.user.email,
        name: profile?.name ?? tokenPayload.user.user_metadata?.name ?? null,
        phone: profile?.phone ?? tokenPayload.user.user_metadata?.phone ?? null,
      },
    });
  } catch (err) {
    return jsonResponse(500, {
      error: err.message || "Erro ao fazer login.",
    });
  }
}
