const func = require('./func')
const validate = require('./validate')

const signup = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const passwordHash = await func.hashPassword(password)
  
  func.addNewUserToDB(username, passwordHash).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const signin = async (req, res) => {
  try {
    validate.signUser(req.body).then(data => {
      func.findUserAccount(data.username).then(user => {
        if(user) {
          func.comparePassword(data.password, user.password).then(isMatch => {
            if (!isMatch) return res.status(403).json({ message: 'Username or Password is wrong.'})
            
            func.generateToken(user.id).then((token) => {
              return res.status(200).json({
                token: token
              })
            })
          })
        } else {
          return res.status(403).json({
            message: "username or password is wrong."
          })
        }
      }, err => {
        return res.status(403).json(err)
      })
    }, err => {
      return res.status(403).json(err)
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = {
  signup,
  signin
}