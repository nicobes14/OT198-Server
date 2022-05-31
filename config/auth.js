module.exports = {
  secret: process.env.AUTH_SECRET || 'secreto',
  expires: process.env.AUTH_EXPIRES || '24h',
}
