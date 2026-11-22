// Edge Function Supabase : envoie par email (Resend) le formulaire de contact du site.
//
// Secrets à définir (Supabase > Edge Functions > Secrets, ou `supabase secrets set`) :
//   RESEND_API_KEY     clé API Resend (obligatoire)
//   RESEND_FROM_EMAIL  expéditeur sur un domaine vérifié chez Resend,
//                      ex. « PRECISIONS <noreply@precisions.group> »
//   CONTACT_TO_EMAIL   destinataire (défaut : contact@precisions.group)
//   ALLOWED_ORIGINS    origines autorisées, séparées par des virgules,
//                      ex. « https://precisions.group,http://localhost:5173 » (défaut : *)

const RESEND_TEST_SENDER = 'onboarding@resend.dev';
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || RESEND_TEST_SENDER;
const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') || 'contact@precisions.group';
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (FROM_EMAIL === RESEND_TEST_SENDER) {
  console.warn(
    "RESEND_FROM_EMAIL non défini : utilisation de l'adresse de test Resend, qui ne délivre " +
    "qu'au propriétaire du compte. Vérifiez votre domaine chez Resend puis définissez ce secret."
  );
}

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;
const MAX_LENGTH: Record<string, number> = {
  full_name: 200, email: 320, phone: 50, company: 200, interest: 50, budget_range: 50, message: 5000,
};

// Limite simple : 5 envois par adresse IP toutes les 10 minutes (par instance de la fonction)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

// Échappe les caractères spéciaux HTML pour empêcher l'injection de contenu dans l'email
const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Supprime les retours à la ligne (évite l'injection d'en-têtes dans le sujet)
const singleLine = (value: unknown): string => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allowAll = ALLOWED_ORIGINS.includes('*');
  return {
    'Access-Control-Allow-Origin': allowAll ? '*' : (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] ?? ''),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

Deno.serve(async (req) => {
  const headers = corsHeaders(req);
  const reply = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return reply({ success: false, error: 'Méthode non autorisée' }, 405);

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'inconnu';
    if (isRateLimited(ip)) {
      return reply({ success: false, error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' }, 429);
    }

    const body = await req.json().catch(() => null);
    const { full_name, email, phone, company, interest, budget_range, message } = body ?? {};

    if (!full_name || !email || !message) {
      return reply({ success: false, error: 'Champs obligatoires manquants' }, 400);
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return reply({ success: false, error: 'Adresse email invalide' }, 400);
    }
    for (const [field, max] of Object.entries(MAX_LENGTH)) {
      if (body[field] != null && String(body[field]).length > max) {
        return reply({ success: false, error: 'Un des champs est trop long' }, 400);
      }
    }

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      console.error('RESEND_API_KEY non configuré');
      return reply({ success: false, error: "Service d'envoi indisponible" }, 500);
    }

    const safe = {
      full_name: escapeHtml(full_name),
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : 'Non renseigné',
      company: company ? escapeHtml(company) : 'Non renseignée',
      interest: interest ? escapeHtml(interest) : 'Non spécifié',
      budget_range: budget_range ? escapeHtml(budget_range) : 'Non renseigné',
      // Conserve les retours à la ligne du message après échappement
      message: escapeHtml(message).replace(/\r?\n/g, '<br>'),
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `[PRECISIONS] Nouveau message de ${singleLine(full_name)} - ${singleLine(interest) || 'Non spécifié'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A0A0B; border-bottom: 3px solid #C9A86C; padding-bottom: 10px;">
              Nouveau message reçu via le formulaire de contact
            </h2>
            <div style="background: #FAFAFA; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>Nom :</strong> ${safe.full_name}</p>
              <p><strong>Email :</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
              <p><strong>Téléphone :</strong> ${safe.phone}</p>
              <p><strong>Entreprise :</strong> ${safe.company}</p>
              <p><strong>Type de projet :</strong> ${safe.interest}</p>
              <p><strong>Budget estimé :</strong> ${safe.budget_range}</p>
            </div>
            <h3 style="color: #0A0A0B;">Message :</h3>
            <p style="background: white; padding: 15px; border-left: 4px solid #C9A86C;">
              ${safe.message}
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Erreur Resend:', response.status, await response.text());
      return reply({ success: false, error: "Échec de l'envoi de l'email" }, 502);
    }

    const result = await response.json();
    return reply({ success: true, emailId: result.id });
  } catch (error) {
    // Détails conservés dans les logs uniquement, jamais renvoyés au visiteur
    console.error('Erreur envoi email:', (error as Error)?.message, (error as Error)?.stack);
    return reply({ success: false, error: 'Erreur interne du serveur' }, 500);
  }
});
