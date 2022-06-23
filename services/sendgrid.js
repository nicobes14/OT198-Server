const sgMail = require('@sendgrid/mail')
const { html } = require('../templates/welcomeEmail')
const { Organization } = require('../database/models')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  sendWelcomeEmail: async (email) => {
    try {
      const dataOrg = await Organization.findAll()
      const msg = {
        to: email,
        from: {
          email: process.env.SENDGRID_EMAIL,
          name: 'SOMOS MAS',
        },
        subject: 'Bienvenido a SOMOS MAS',
        html: html(dataOrg[0]),
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
