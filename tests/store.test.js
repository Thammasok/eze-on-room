const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

// const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/store/validate')
const func = require('../controllers/store/func')

describe('Store', () => {
  describe('# Item Lists', () => {
    describe('- Validate', () => {
      beforeEach(() => {
        this.body = {}
      })
    
      afterEach(() => {
        this.body = {}
      })

      // this.body = {
      //   name: "razor",
      //   image: "https://eze-line-bot.herokuapp.com/images/bear-rectangle.png",
      //   amount: 2
      // }

      it("Assert return Object type when calling newItem function throw errors", () => {
        validate.newItem(this.body).catch(err => {
          assert.typeOf(err, 'object')
        })
      })

      it('should return Error when not send the name', async () => {
        await validate.newItem(this.body).catch(err => {
          assert.equal(err.message, '"name" is required')
          assert.equal(err.path[0], 'name')
        })
      })
    })

    describe('- Function', () => {
      let mockStoreFunc

      before(()=> {
        mockStoreFunc = sinon.mock(func)
      })

      after(() => {
        mockStoreFunc = sinon.restore()
      })

      beforeEach(() => {
        this.body = {}
      })
    
      afterEach(() => {
        this.body = {}
      })

      it('should called function when calling itemLists function ', async () => {
        mockStoreFunc.expects("itemLists").once()
        func.itemLists()
        mockStoreFunc.verify()
      })

      it('should called function when calling addNewItem function ', async () => {
        this.body = {
          name: "razor",
          image: "https://eze-line-bot.herokuapp.com/images/bear-rectangle.png",
          amount: 2
        }

        mockStoreFunc.expects("addNewItem").withArgs(this.body).once()
        func.addNewItem(this.body)
        mockStoreFunc.verify()
      })

      it('should called function when calling updateItem function ', async () => {
        this.body = {
          name: "razor",
          image: "https://eze-line-bot.herokuapp.com/images/bear-rectangle.png",
          amount: 1
        }

        mockStoreFunc.expects("updateItem").withArgs(this.body).once()
        func.updateItem(this.body)
        mockStoreFunc.verify()
      })

      it('should called function when calling deleteItem function ', async () => {
        this.body = {
          name: "razor"
        }

        mockStoreFunc.expects("deleteItem").withArgs(this.body.name).once()
        func.deleteItem(this.body.name)
        mockStoreFunc.verify()
      })
    })
  })
})