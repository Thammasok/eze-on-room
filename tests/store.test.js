const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/store/validate')
const func = require('../controllers/account/func')

describe('Store', () => {
  describe('# Item Lists', () => {
    describe('- Function', () => {
      let mockFunc

      before(()=> {
        mockfunc = sinon.mock(func)
      })

      after(() => {
        mockFunc = sinon.restore()
      })

      // it('should called function when calling itemLists function ', async () => {
      //   mockFunc.expects("itemLists").once()
      //   func.itemLists()
      //   mockFunc.verify()
      // })
    })
  })
})