const sgMail = require('@sendgrid/mail')
const { html } = require('../templates/welcomeEmail')

// todo - insertar los datos de la organizacion en el html
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  sendWelcomeEmail: async (email) => {
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
  },
  sendContactEmail: async (email) => {
    try {
      const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Thanks for your contact',
        html: html('Titulo dinamico', 'Texto de mail dinamico', 'Datos de contacto dinamicos'),
      }
      await sgMail.send(msg)
    } catch (error) {
      throw new Error(error)
    }
  },
}
