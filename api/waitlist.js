import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    await resend.emails.send({
      from: 'waitlist@trovally.io',
      to: 'trovallyinfo@gmail.com',
      subject: 'New Trovally Waitlist Signup',
      html: `<p>New signup: <strong>${email}</strong></p>`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send' });
  }
}
