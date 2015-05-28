var assert = require('assert')
var stubo = require('./')

/* global describe, it */

describe('stubo', function () {
  it('should stub an object', function () {
    var stubs = {}

    var someMethod = function () {
      return 5
    }

    stubo(stubs, '../somefile', 'someobj.somemethod', someMethod)

    var exp = {
      '../somefile': {
        someobj: {
          somemethod: someMethod
        }
      }
    }
    assert.deepEqual(stubs, exp)
  })

  describe('> when only one subkey', function () {
    it('should stub it', function () {
      var stubs = {}
      stubo(stubs, '../somefile', 'theValue5', 5)

      var exp = {
        '../somefile': {
          theValue5: 5
        }
      }
      assert.deepEqual(stubs, exp)
    })
  })

  describe('> when stubs already exist', function () {
    it('should not touch them unless it explicitly matches', function () {
      var stubs = {
        '../somefile': {
          someobj: {
            theValue5: 3
          }
        },
        'somemodule': {secretData: 4}
      }

      stubo(stubs, '../somefile', 'someobj.theValue5', 5)

      var expected = {
        '../somefile': {
          someobj: {
            theValue5: 5
          }
        },
        'somemodule': {secretData: 4}
      }

      assert.deepEqual(stubs, expected)
    })
  })

  describe('> when stubs object is not passed', function () {
    it('should create a new stubs object and return it', function () {
      var stubs = stubo('../somefile', 'someobj.theValue5', 5)

      var expected = {
        '../somefile': {
          someobj: {
            theValue5: 5
          }
        }
      }
      assert.deepEqual(stubs, expected)
    })
  })

  describe('> when a stub key is a function', function () {
    it('should automatically create a function and return the value', function () {
      var stubs = stubo('supermodule', 'someobj.funcToReturnValue5()', 5)
      assert.strictEqual(typeof stubs.supermodule.someobj.funcToReturnValue5, 'function')
      assert.strictEqual(stubs.supermodule.someobj.funcToReturnValue5(), 5)
    })
  })
})
