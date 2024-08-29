const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
  const { name, email, message, phone, country } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vidura.in@gmail.com',
      pass: 'btts tvil fwvb vbau' // Use an App Password if 2-Step Verification is enabled
    },
    logger: true, // Enable logging
    debug: true,  // Enable debugging
    tls: {
      rejectUnauthorized: false // Note: use with caution in production
    }
  });

  let mailOptions = {
    from: 'vidura.in@gmail.com',
    to: email, // recipient's email
    subject: 'Quote Submission Confirmation',
    text: `Thank you for submitting your details, ${name}. We will get back to you soon.`,
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Country: ${country}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Send Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
