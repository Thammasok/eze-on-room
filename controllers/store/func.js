const admin = require('firebase-admin')

const addNewItem = item => {
  return new Promise((resolve, reject) => {
    admin.firestore().collection("store").doc(item.name).set({
      image: item.image,
      amount: item.amount,
      use: true
    })
    .then(result => {
      resolve(result)
    })
    .catch(err => reject(err))
	})
}

const updateItem = item => {
  return new Promise((resolve, reject) => {
    let itemRef = admin.firestore().collection("store").doc(item.itemId)

    let query = {}
    
    if (item.image !== undefined) {
      query.image = item.image
    }

    if (item.amount !== undefined) {
      query.amount = item.amount
    }

    itemRef.update(query).then(result => {
      resolve(result)
    })
    .catch(err => reject(err))
	})
}

const deleteItem = itemName => {
  return new Promise((resolve, reject) => {
    let itemRef = admin.firestore().collection("store").doc(itemName)

    itemRef.update({
      use:  false
    }).then(result => {
      resolve(result)
    })
    .catch(err => reject(err))
	})
}

const itemLists = () => {
  return new Promise((resolve, reject) => {
    admin.firestore().collection("store").where('use', '==', true).get().then(data => {
      let storeLists = [];

      data.forEach(doc => {
        storeLists.push({
          name: doc.id,
          ...doc.data()
        })
      })
    
      resolve(storeLists)
    }).catch(err => {
      reject(err)
    })
  })
}

const itemDetail = (itemId) => {
  return new Promise((resolve, reject) => {
    admin.firestore().collection("store").doc(itemId).get().then(doc => {    
      resolve(doc.data())
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  addNewItem,
  updateItem,
  deleteItem,
  itemLists,
  itemDetail
}