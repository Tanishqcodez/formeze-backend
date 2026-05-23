const { BrevoClient } = require("@getbrevo/brevo");
const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API,
});

let sendEmail = async (subject, html, to) => {
  const data = await brevo.transactionalEmails.sendTransacEmail({
    subject: subject,
    htmlContent: html,
    sender: {
      name: "Formeze",
      email: "formeze.service@gmail.com",
    },
    to: [
      {
        email: to,
      },
    ],
  });
};

module.exports = sendEmail