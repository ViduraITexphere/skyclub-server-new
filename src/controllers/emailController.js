// const nodemailer = require('nodemailer');

// exports.sendEmail = async (req, res) => {
//   const { name, email, message, phone, country } = req.body;

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'vidura.in@gmail.com',
//       pass: 'btts tvil fwvb vbau' // Use an App Password if 2-Step Verification is enabled
//     },
//     logger: true, // Enable logging
//     debug: true,  // Enable debugging
//     tls: {
//       rejectUnauthorized: false // Note: use with caution in production
//     }
//   });

//   let mailOptions = {
//     from: 'vidura.in@gmail.com',
//     to: email, // recipient's email
//     subject: 'Quote Submission Confirmation',
//     text: `Thank you for submitting your details, ${name}. We will get back to you soon.`,
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Country: ${country}</p>
//            <p>Message: ${message}</p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error('Send Error:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// };

const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { name, email, message, phone, country } = req.body;

  let transporter = nodemailer.createTransport({
    host: "mail.skytravelclub.com", // Replace with your cPanel domain's mail server
    port: 465, // Use 465 for SSL or 587 for TLS
    secure: true, // Set to true for SSL (false for TLS on port 587)
    auth: {
      user: "temp@skytravelclub.com", // Your cPanel email address
      pass: "L5QPOGssQqCI", // Your cPanel email password
    },
    logger: true, // Enable logging for debugging
    debug: true, // Enable debugging output
    tls: {
      rejectUnauthorized: false, // Use with caution, but often needed with shared hosting
    },
  });

  let mailOptions = {
    from: email, // Sender's email (your cPanel email)
    to: "temp@skytravelclub.com", // Recipient's email
    subject: "Quote Submission Confirmation",
    text: `Thank you for submitting your details, ${name}. We will get back to you soon.`,
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Country: ${country}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Send Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
