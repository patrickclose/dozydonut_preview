import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, workEmail, businessPhone, companyWebsite, businessChallenges } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,  // Email sent to the same address
            subject: 'New Contact Form Submission',
            text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Work Email: ${workEmail}
                Business Phone: ${businessPhone}
                Company Website: ${companyWebsite}
                Business Challenges: ${businessChallenges}
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send email.', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
