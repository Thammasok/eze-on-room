const admin = require('firebase-admin')
// const bcrypt = require('bcrypt')

const serviceAccountKey = require('../../config/sak.json')

const hashPassword = pwd => {
  // bcrypt.hash(pwd, 10, (err, hash) => {
  //   if (err) return false

  //   return hash
  // })
}

const comparePassword = (password, hashPassword) => {
  // bcrypt.compare(password, hashPassword).then(function(res) {
  //   return res
  // })
}

const addNewUserToDB = (username, password) => {
	return new Promise(resolve => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    const db = admin.firestore()
    const docReferAccount = db.collection('my-room').doc('account')

    const setAccount = docReferAccount.set({
      username: username,
      password: password
    })

    resolve(setAccount)
	})
}

const findUserAccount = (username) => {
  return new Promise (resolve => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    const db = admin.firestore()
    const docReferAccount = db.collection('my-room').doc('account')

    docReferAccount.orderByChild('username').equalTo('jaranchai').once('value').then( res => {
      resolve(res)
    })
  })
}

module.exports = {
  addNewUserToDB,
  comparePassword,
  hashPassword,
  findUserAccount
}