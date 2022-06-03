class ApiError extends Error {
   /**
   *  Create a Api error
   * @param {number} statusCode - HTTP status code of error
   * @param {string} message - Error message
   */
  constructor(statusCode, message, status = false, isOperational = true, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.status = status
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = ApiError
