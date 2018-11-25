var Res = function(callback) {
  this._callback = callback;
  this.code = 200;
  this.jsonData = {};
};

Res.prototype = {
  status : function(code) {
    this.code = code;
    return this;
  },
  json : function(data) {
    this.jsonData = data;
    if (this._callback) {
      this._callback({
        code : this.code,
        jsonData : this.jsonData
      })
    }
    return this;
  },
  set: function () {
    return this;
  },
  send: function (data) {
    this.jsonData = data;

    if (this._callback) {
      this._callback({
        code : this.code,
        jsonData : this.jsonData
      })
    }
    return this;
  },
  setCallback : function(_callback) {
    this._callback = _callback;
  }
};

module.exports = function(callback) {
  return new Res(callback);
}