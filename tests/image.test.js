const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")

chai.should()
chai.use(sinonChai)

// const expect = chai.expect
const assert = chai.assert

const validate = require('../controllers/upload/validate')
const func = require('../controllers/upload/func')

describe('Upload', () => {
  describe('- Validate', () => {
    let imageId = ""
    beforeEach(() => {
      imageId = ""
    })
  
    afterEach(() => {
      imageId = ""
    })

    it("Assert return Object type when calling imageId validate function throw errors", () => {
      validate.imageId().catch(err => {
        assert.typeOf(err, 'object')
      })
    })

    it('Assert return Object type when calling imageId validate function throw success', async () => {
      imageId = "201811024g236MzVDzDm0G0XoN6iTZuXYV8p6TYv"

      validate.imageId(imageId).catch(err => {
        assert.typeOf(err, 'object')
      })
    })
  })

  describe('- Function', () => {
    let mockImageFunc
    let imageId = ""

    before(()=> {
      mockImageFunc = sinon.mock(func)
    })

    after(() => {
      mockImageFunc = sinon.restore()
    })

    beforeEach(() => {
      imageId = ""
    })
  
    afterEach(() => {
      imageId = ""
    })

    it('should called function when calling newImage function ', async () => {
      const body = {
        "fieldname": "file",
        "originalname": "20181102eI3JjwOMGeVah7r2ILfbYPv1ksO9ZGIs.jpeg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "./public/uploads/",
        "filename": "201811021a84K8Ut4vgPWVZFnXqaxOhNUzoJEXnP.jpeg",
        "path": "public/uploads/201811021a84K8Ut4vgPWVZFnXqaxOhNUzoJEXnP.jpeg",
        "size": 1297670
      }

      mockImageFunc.expects("newImage").withArgs(body).once()
      func.newImage(body)
      mockImageFunc.verify()
    })

    it('should called function when calling imageLists function ', async () => {
      mockImageFunc.expects("imageLists").once()
      func.imageLists()
      mockImageFunc.verify()
    })

    it('should called function when calling imageDetail function ', async () => {
      imageId = "201811024g236MzVDzDm0G0XoN6iTZuXYV8p6TYv"

      mockImageFunc.expects("imageDetail").withArgs(imageId).once()
      func.imageDetail(imageId)
      mockImageFunc.verify()
    })

    it('should called function when calling deleteImage function ', async () => {
      imageId = "201811024g236MzVDzDm0G0XoN6iTZuXYV8p6TYv"

      mockImageFunc.expects("deleteImage").withArgs(imageId).once()
      func.deleteImage(imageId)
      mockImageFunc.verify()
    })
  })
})