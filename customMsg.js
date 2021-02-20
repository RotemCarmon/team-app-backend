class CustomMsg  {
  constructor (message, code = 0) {
    // super(message)
    // Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name
    this.status = 200
    this.type = 'Custom Message'
    this.message = message
    this.code = code
  }
  statusCode() {
    return this.status
  }
  setStatus(status) {
    this.status = status;
  }
}


module.exports = CustomMsg  