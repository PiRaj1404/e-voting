const nodemailer = require('nodemailer');

const sendRegistrationEmail = async (userEmail, publicKey) => {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Welcome to Your App!',
    html: `
      <p>Thank you for registering!</p>
      <p>Your public key:</p>
      <pre id="publicKey">${publicKey}</pre>
      <button onclick="copyPublicKey()">Copy Public Key</button>
      <script>
        function copyPublicKey() {
          const publicKeyElement = document.getElementById('publicKey');
          const textArea = document.createElement('textarea');
          textArea.value = publicKeyElement.textContent;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Public key copied to clipboard!');
        }
      </script>
    `,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: ', info.response);
    return { success: true, message: `Email sent: ${info.response}` };
  } catch (error) {
    // console.error('Error sending email: ', error);
    return { success: false, message: `Error sending email: ${error.message}` };
  }
};

module.exports = { sendRegistrationEmail };
