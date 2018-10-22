const jwt = require('jsonwebtoken')

const normal = function (req, res, next) {
  if (req.headers['content-type'] === "application/json") {
    if(req.headers['authorization'] === process.env.TOKEN_AUTHONRIZATION) {
      next()
    } else {
      return res.status(401).json({
        msg: 'authorization is not allow.'
      })
    }
  } else {
    return res.status(415).json({
      msg: "Not the specified content-type."
    })
  }
}

const auth = function (req, res, next) {
  if (req.headers['content-type'] === "application/json") {
    if(req.headers['authorization'] === process.env.TOKEN_AUTHONRIZATION) {
      jwt.verify(req.headers['login-token'], process.env.TOKEN_SECRET, function(err, decoded) {
        if(decoded) {
          next()
        } else {
          return res.status(401).json({
            msg: 'Login token is invalid or expired.'
          })
        }
      })
    } else {
      return res.status(401).json({
        msg: 'authorization is not allow.'
      })
    }
  } else {
    return res.status(415).json({
      msg: "Not the specified content-type."
    })
  }
}

module.exports = {
  auth,
  normal
}