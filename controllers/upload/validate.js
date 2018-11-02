const Joi = require('joi')

const imageId = (imageId) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      imageId: Joi.string().alphanum().required()
    })
  
    Joi.validate({ 
      imageId: imageId
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

module.exports = {
  imageId
}