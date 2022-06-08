const db = require('../database/models')
const { sendContactEmail } = require('./sendgrid')

const { Contact } = db

module.exports = {
  listAllContacts: async () => {
    try {
      const contacts = await Contact.findAll()
      return contacts
        ? {
          code: 200, status: true, message: 'Contacts listed', body: contacts,
        }
        : { code: 404, status: false, message: 'Contacts not found' }
    } catch (error) {
      throw new Error(error)
    }
  },
  createContact: async (body) => {
    try {
      const newContact = await Contact.create(body)
      await sendContactEmail(body.email)
      return newContact
    } catch (error) {
      throw new Error(error)
    }
  },
}
