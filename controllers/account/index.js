const createUser = function(req, res, next) {
  res.status(200).json({
    msg: "ok"
  })
}

module.exports = {
  createUser
}