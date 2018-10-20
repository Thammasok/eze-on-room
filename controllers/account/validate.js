const Joi = require('joi')

const signUser = body => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().min(3).max(30).required()
    })
  
    Joi.validate({ 
      username: body.username, 
      password: body.password
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

module.exports = {
  signUser
}