const admin = require('firebase-admin')

const newImage = image => {
  return new Promise((resolve, reject) => {
    const imageName = image.filename.split('.')[0]
    const path = image.path.replace('public','')

    admin.firestore().collection("images").doc(imageName).set({
      url: path
    })
    .then(result => {
      resolve(result)
    })
    .catch(err => reject(err))
	})
}

const imageLists = () => {
  return new Promise((resolve, reject) => {
    admin.firestore().collection("images").get().then(data => {
      let imageLists = [];

      data.forEach(doc => {
        imageLists.push({
          id: doc.id,
          ...doc.data()
        })
      })
    
      resolve(imageLists)
    }).catch(err => {
      reject(err)
    })
  })
}

const imageDetail = imageId => {
  return new Promise((resolve, reject) => {
    admin.firestore().collection("images").doc(imageId).get().then(doc => {
      resolve(doc.data())
    }).catch(err => {
      reject(err)
    })
  })
}

const deleteImage = imageId => {
  return new Promise((resolve) => {
    let deleteDoc = admin.firestore().collection("images").doc(imageId).delete()

    resolve(deleteDoc)
	})
}

module.exports = {
  newImage,
  imageLists,
  imageDetail,
  deleteImage
}