const admin = require('firebase-admin')
// const serviceAccountKey = require('../config/serviceAccountKey.json')

const todoLists = sender => {
	return new Promise(resolve => {
    admin.initializeApp({
      // credential: admin.credential.cert(serviceAccountKey),
      credential: admin.credential.cert({
        projectId: '<PROJECT_ID>',
        clientEmail: 'foo@<PROJECT_ID>.iam.gserviceaccount.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n'
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    var db = admin.firestore()
    
    var docRef = db.collection('users').doc('Surin')

    var setAda = docRef.set({
      first: 'Surin',
      last: 'Thongkam',
      born: 1889
    })

	})
}