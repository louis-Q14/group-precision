import { Resend } from 'npm:resend@4.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const { full_name, email, phone, company, interest, budget_range, message } = await req.json();

    // Envoi de l'e-mail de notification à l'équipe
    await resend.emails.send({
      from: 'PRECISIONS Group <onboarding@resend.dev>',
      to: 'contact@precisions.group',
      subject: `Nouveau message de ${full_name} - ${interest}`,
      html: `
        <h2>Nouveau message reçu via le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${full_name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Entreprise :</strong> ${company || 'Non renseignée'}</p>
        <p><strong>Type de projet :</strong> ${interest}</p>
        <p><strong>Budget estimé :</strong> ${budget_range || 'Non renseigné'}</p>
        <h3>Message :</h3>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});