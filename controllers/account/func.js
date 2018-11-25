const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const hashPassword = pwd => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, 10, (err, hash) => {
      if (err) reject(err)
      
      resolve(hash)
    })
  })
}

const comparePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, result) => {
      if (err) reject(err)

      resolve(result)
    })
  })
}

const generateToken = (userid) => {
  return new Promise((resolve) => {
    var payload = {
      iss: process.env.TOKEN_ISS,
      sub: userid,
      iat: moment().unix(),
      exp: moment().add(12, 'hour').unix()
    }

    resolve(jwt.sign(payload, process.env.TOKEN_SECRET))
  })
}

const addNewUserToDB = (username, password) => {
	return new Promise((resolve, reject) => {
    admin.firestore().collection("account").doc(username).set({
      password: password
    })
    .then(result => {
      resolve(result)
    })
    .catch(err => reject(err))
	})
}

const findUserAccount = (username) => {
  return new Promise ((resolve, reject) => {
    admin.firestore().collection("account").doc(username).get().then( accountInfo => {
      resolve(accountInfo.data())
    }).catch(err => {
      // throw { message: "username or password is wrong." }
      reject ({ message: "username or password is wrong." })
      return
    })
  })
}

module.exports = {
  addNewUserToDB,
  comparePassword,
  findUserAccount,
  generateToken,
  hashPassword
}