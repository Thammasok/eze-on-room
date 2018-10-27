const func = require('./func')
const validate = require('./validate')

const signup = async (req, res, next) => {
  const value = await validate.signUser(req.body).catch(err => res.status(403).json(err))
  const passwordHash = await func.hashPassword(value.password)
  
  func.addNewUserToDB(value.username, passwordHash).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const signin = async (req, res, next) => {
  const value = await validate.signUser(req.body).catch(err => res.status(403).json(err))
  const user = await func.findUserAccount(value.username).catch(err => res.status(403).json(err))

  func.comparePassword(user.password, value.password).then(isMatch => {
    if (isMatch) return res.status(403).json({ msg: 'Username or Password is wrong'})
    
    func.generateToken(user.id).then((token) => {
      return res.status(200).json({
        token: token
      })
    })
  })
}

module.exports = {
  signup,
  signin
}