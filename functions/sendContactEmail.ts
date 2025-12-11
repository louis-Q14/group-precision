import nodemailer from 'npm:nodemailer@6.9.7';

Deno.serve(async (req) => {
  try {
    const { full_name, email, phone, company, interest, budget_range, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Deno.env.get('SMTP_EMAIL'),
        pass: Deno.env.get('SMTP_PASSWORD'),
      },
    });

    await transporter.sendMail({
      from: Deno.env.get('SMTP_EMAIL'),
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