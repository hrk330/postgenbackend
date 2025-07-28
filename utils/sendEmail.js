const nodemailer = require('nodemailer');

// Use Gmail if EMAIL_USER contains gmail, otherwise use Ethereal for dev/testing
const isGmail = process.env.EMAIL_USER && process.env.EMAIL_USER.includes('gmail');

let transporter;
if (isGmail) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  // Fallback to Ethereal for dev/testing
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    if (!isGmail) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.error('Email send error:', err);
    throw err;
  }
};

module.exports = sendEmail; 