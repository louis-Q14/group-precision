import { Resend } from 'npm:resend@4.0.0';

Deno.serve(async (req) => {
  try {
    console.log('=== Début envoi email ===');
    
    const body = await req.json();
    console.log('Données reçues:', body);
    
    const { full_name, email, phone, company, interest, budget_range, message } = body;

    if (!full_name || !email || !message) {
      throw new Error('Champs obligatoires manquants');
    }

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY non configuré');
    }

    const resend = new Resend(apiKey);
    console.log('Resend initialisé, envoi en cours...');

    const emailData = {
      from: 'onboarding@resend.dev',
      to: 'contact@precisions.group',
      replyTo: email,
      subject: `[PRECISIONS] Nouveau message de ${full_name} - ${interest || 'Non spécifié'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0B; border-bottom: 3px solid #C9A86C; padding-bottom: 10px;">
            Nouveau message reçu via le formulaire de contact
          </h2>
          <div style="background: #FAFAFA; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${full_name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
            <p><strong>Entreprise :</strong> ${company || 'Non renseignée'}</p>
            <p><strong>Type de projet :</strong> ${interest || 'Non spécifié'}</p>
            <p><strong>Budget estimé :</strong> ${budget_range || 'Non renseigné'}</p>
          </div>
          <h3 style="color: #0A0A0B;">Message :</h3>
          <p style="background: white; padding: 15px; border-left: 4px solid #C9A86C;">
            ${message}
          </p>
        </div>
      `,
    };

    console.log('Configuration email:', { to: emailData.to, from: emailData.from, subject: emailData.subject });
    
    const result = await resend.emails.send(emailData);
    
    console.log('Email envoyé avec succès:', result);
    return Response.json({ success: true, emailId: result.id });
    
  } catch (error) {
    console.error('=== ERREUR ENVOI EMAIL ===');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    return Response.json({ 
      success: false, 
      error: error.message,
      details: error.stack 
    }, { status: 500 });
  }
});