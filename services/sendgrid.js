const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = async (email) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Welcome to the app',
      text: 'Welcome to the app, enjoy!',
    }
    await sgMail.send(msg)
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  sendWelcomeEmail,
}
