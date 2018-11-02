const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/account/validate')
const func = require('../controllers/account/func')

describe('Account', () => {
  describe('- Validate', () => {
    beforeEach(() => {
      this.body = {}
    })
  
    afterEach(() => {
      this.body = {}
    })

    it("Assert return Object type when calling signUser validate function throw errors", () => {
      validate.signUser(this.body).catch(err => {
        assert.typeOf(err, 'object')
      })
    })

    it('Assert return Object type when calling signUser validate function throw success', async () => {
      this.body = {
        username: "nat",
        password: "password123"
      }

      validate.signUser(this.body).catch(err => {
        assert.typeOf(err, 'object')
      })
    })

    it('should return Error when not send the username', async () => {
      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"username" is required')
        assert.equal(err.path[0], 'username')
      })
    })

    it('should return Error when the username value is null', async () => {
      this.body = {
        username: null
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"username" must be a string')
        assert.equal(err.path[0], 'username')
      })
    })

    it('should return Error when the username value has less 3 characters', async () => {
      this.body = {
        username: "na"
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"username" length must be at least 3 characters long')
        assert.equal(err.path[0], 'username')
      })
    })

    it('should return Error when the username value has more 30 characters', async () => {
      this.body = {
        username: "imagineyourunfacebookandyouwantvisitorstosignuponthewebsitewithrealnamesandnotsomethinglike"
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"username" length must be less than or equal to 30 characters long')
        assert.equal(err.path[0], 'username')
      })
    })

    it('should return Error when the username correct value but not send password', async () => {
      this.body = {
        username: "nat"
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"password" is required')
        assert.equal(err.path[0], 'password')
      })
    })

    it('should return Error when the password value have number type', async () => {
      this.body = {
        username: "nat",
        password: 123
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"password" must be a string')
        assert.equal(err.path[0], 'password')
      })
    })

    it('should return Error when the password value has less 3 characters', async () => {
      this.body = {
        username: "nat",
        password: "pa"
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"password" length must be at least 3 characters long')
        assert.equal(err.path[0], 'password')
      })
    })

    it('should return Error when the password value has more 30 characters', async () => {
      this.body = {
        username: "nat",
        password: "imagineyourunfacebookandyouwantvisitorstosignuponthewebsitewithrealnamesandnotsomethinglike"
      }

      await validate.signUser(this.body).catch(err => {
        assert.equal(err.message, '"password" length must be less than or equal to 30 characters long')
        assert.equal(err.path[0], 'password')
      })
    })

    it('should return Value when the username and password value is correct', async () => {
      this.body = {
        username: "nat",
        password: "password123"
      }

      await validate.signUser(this.body).then(value => {
        assert.equal(value.username, 'nat')
        assert.equal(value.password, 'password123')
        assert.typeOf(value, 'object')
      })
    })
  })

  describe('- Function', () => {
    let mockAccountFunc
    let username
    let password
    let passwordHash

    before(()=> {
      username = "nat"
      password = "password123"
      passwordHash = ''

      mockAccountFunc = sinon.mock(func)
    })

    after(() => {
      username = ''
      password = ''
      passwordHash = ''

      mockAccountFunc = sinon.restore()
    })

    it('should return Value when calling hashPassword function', async () => {
      await func.hashPassword(password).then(pwdHash => {
        passwordHash = pwdHash
        assert.typeOf(pwdHash, 'string')
      })
    })

    it('should return Value when calling comparePassword function', async () => {
      await func.comparePassword(password, passwordHash).then(pwdHash => {
        assert.equal(pwdHash, true)
        assert.typeOf(pwdHash, 'boolean')
      })
    })

    it('should called function when calling addNewUserToDB function ', async () => {
      mockAccountFunc.expects("addNewUserToDB").withArgs(username, password).once().returns({
        "_writeTime": {
            "_seconds": 1540711413,
            "_nanoseconds": 169010000
        }
      })
      
      func.addNewUserToDB(username, password)
      
      mockAccountFunc.verify()
    })

    it('should called function when calling findUserAccount function ', async () => {
      mockAccountFunc.expects("findUserAccount").withArgs(username).once()
      func.findUserAccount(username)
      mockAccountFunc.verify()
    })

    it('should called function when calling generateToken function ', async () => {
      const userId = '2gnup2on3thewebsitew43ithrealname77sandno'

      mockAccountFunc.expects("generateToken").withArgs(userId).once()
      func.generateToken(userId)
      mockAccountFunc.verify()
    })
  })
})