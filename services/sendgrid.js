const sgMail = require('@sendgrid/mail')
const { html } = require('../templates/welcomeEmail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = async (email) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: 'Welcome to the app',
      html: html('Titulo dinamico', 'Texto de mail dinamino', 'Datos de contacto dinamicos'),
    }
    await sgMail.send(msg)
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  sendWelcomeEmail,
}
