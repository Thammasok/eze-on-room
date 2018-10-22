const { comparePassword, addNewUserToDB, findUserAccount, generateToken, hashPassword } = require('./func')
const { signUser } = require('./validate')

const signup = async (req, res, next) => {
  const value = await signUser(req.body).catch(err => res.status(403).json(err))
  const passwordHash = await hashPassword(value.password)
  
  addNewUserToDB(value.username, passwordHash).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const signin = async (req, res, next) => {
  const value = await signUser(req.body).catch(err => res.status(403).json(err))
  const user = await findUserAccount(value.username).catch(err => res.status(403).json(err))

  comparePassword(user.password, value.password).then(isMatch => {
    if (isMatch) return res.status(403).json({ msg: 'Username or Password is wrong'})
    
    generateToken(user.id).then((token) => {
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