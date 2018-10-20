const { findUserAccount } = require('./func')

const signup = (req, res, next) => {
  return res.status(200).json({
    msg: "ok"
  })
}

const signin = async (req, res, next) => {
  await findUserAccount('jaranchai').then( res => {
    return res.status(200).json(res)
  })
}

module.exports = {
  signup,
  signin
}