const Joi = require('joi')

const newItem = body => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      image: Joi.string().required(),
      amount: Joi.number().required()
    })
  
    Joi.validate({ 
      name: body.name, 
      image: body.image,
      amount: body.amount
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

const itemId = (itemId) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      itemId: Joi.string().required()
    })
  
    Joi.validate({ 
      itemId: itemId
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

const updateItem = (itemId, body) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      itemId: Joi.string().required(),
      image: Joi.string().optional(),
      amount: Joi.number().optional()
    })
  
    Joi.validate({ 
      itemId: itemId, 
      image: body.image,
      amount: body.amount
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

module.exports = {
  newItem,
  itemId,
  updateItem
}