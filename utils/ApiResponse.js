function ApiResponse(statusCode, message, data = null) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
  export { ApiResponse }
  