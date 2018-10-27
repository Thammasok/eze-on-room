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

const updateItem = (itemName, body) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      image: Joi.string().optional(),
      amount: Joi.number().optional()
    })
  
    Joi.validate({ 
      name: itemName, 
      image: body.image,
      amount: body.amount
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}

const deleteItem = (itemName) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      name: Joi.string().required()
    })
  
    Joi.validate({ 
      name: itemName
    }, schema, (err, value) => {
      if (err) reject(err.details[0])

      resolve(value)
    })
  })
}
module.exports = {
  newItem,
  updateItem,
  deleteItem
}