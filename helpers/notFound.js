exports.notFound = ({
  res, data, message = 'Request data not found', code = 404,
}) => {
  if (!data) res.status(code).send(`${code} ${message}`)
}
