const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

// const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/account/validate')
const func = require('../controllers/account/func')

describe('Account', () => {
  describe('# Create User', () => {
    describe('- Validate', () => {
      beforeEach(() => {
        this.body = {}
      })
    
      afterEach(() => {
        this.body = {}
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
      let mockFunc
      let username
      let password
      let passwordHash

      before(()=> {
        username = "nat"
        password = "password123"
        passwordHash = ''

        mockfunc = sinon.mock(func)
      })

      after(() => {
        username = ''
        password = ''
        passwordHash = ''

        mockFunc = sinon.restore()
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
        mockFunc.expects("addNewUserToDB").withArgs(username, password).once()
        
        func.addNewUserToDB(username, password)
        
        mockFunc.verify()
        mockFunc.restore()
      })
    })
  })
})