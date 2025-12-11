import { Resend } from 'npm:resend@4.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const { full_name, email, phone, company, interest, budget_range, message } = await req.json();

    // Envoi de l'e-mail de notification à l'équipe
    const result = await resend.emails.send({
      from: 'PRECISIONS Contact <onboarding@resend.dev>',
      to: ['contact@precisions.group'],
      replyTo: email,
      subject: `Nouveau message de ${full_name} - ${interest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0B; border-bottom: 3px solid #C9A86C; padding-bottom: 10px;">Nouveau message reçu via le formulaire de contact</h2>
          <div style="background: #FAFAFA; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${full_name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
            <p><strong>Entreprise :</strong> ${company || 'Non renseignée'}</p>
            <p><strong>Type de projet :</strong> ${interest}</p>
            <p><strong>Budget estimé :</strong> ${budget_range || 'Non renseigné'}</p>
          </div>
          <h3 style="color: #0A0A0B;">Message :</h3>
          <p style="background: white; padding: 15px; border-left: 4px solid #C9A86C;">${message}</p>
        </div>
      `,
    });

    console.log('Email sent successfully:', result);
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});