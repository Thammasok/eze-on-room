class Req {
  constructor({
    params,
    query,
    body,
    headers,
  }) {
    this.params = params || {}
    this.query = query || {}
    this.body = body || {}
    this.headers = headers || {}
  }

  setAgrs(_name, value) {
    this[_name] = value
  }

  setHeader(key, value) {
    this.headers[key] = value
  }

  get(_key) {
    return (
      this.headers[_key] ||
      this.query[_key] ||
      this.params[_key] ||
      this.body[_key]
    )
  }
}

module.exports = function(options) {
  return new Req(options)
}