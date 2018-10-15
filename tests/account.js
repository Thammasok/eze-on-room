const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/account/validate')

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
        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"username" is required')
          assert.equal(err.path[0], 'username')
        })
      })

      it('should return Error when the username value is null', async () => {
        this.body = {
          username: null
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"username" must be a string')
          assert.equal(err.path[0], 'username')
        })
      })

      it('should return Error when the username value has less 3 characters', async () => {
        this.body = {
          username: "na"
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"username" length must be at least 3 characters long')
          assert.equal(err.path[0], 'username')
        })
      })

      it('should return Error when the username value has more 30 characters', async () => {
        this.body = {
          username: "imagineyourunfacebookandyouwantvisitorstosignuponthewebsitewithrealnamesandnotsomethinglike"
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"username" length must be less than or equal to 30 characters long')
          assert.equal(err.path[0], 'username')
        })
      })

      it('should return Error when the username correct value but not send password', async () => {
        this.body = {
          username: "nat"
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"password" is required')
          assert.equal(err.path[0], 'password')
        })
      })

      it('should return Error when the password value have number type', async () => {
        this.body = {
          username: "nat",
          password: 123
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"password" must be a string')
          assert.equal(err.path[0], 'password')
        })
      })

      it('should return Error when the password value has less 3 characters', async () => {
        this.body = {
          username: "nat",
          password: "pa"
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"password" length must be at least 3 characters long')
          assert.equal(err.path[0], 'password')
        })
      })

      it('should return Error when the password value has more 30 characters', async () => {
        this.body = {
          username: "nat",
          password: "imagineyourunfacebookandyouwantvisitorstosignuponthewebsitewithrealnamesandnotsomethinglike"
        }

        await validate.createUser(this.body).catch(err => {
          assert.equal(err.message, '"password" length must be less than or equal to 30 characters long')
          assert.equal(err.path[0], 'password')
        })
      })

      it('should return Value when the username and password value is correct', async () => {
        this.body = {
          username: "nat",
          password: "password123"
        }

        await validate.createUser(this.body).then(value => {
          assert.equal(value.username, 'nat')
          assert.equal(value.password, 'password123')
          assert.typeOf(value, 'object')
        })
      })
    })

    describe('- Function', () => {
      
    })
  })
})