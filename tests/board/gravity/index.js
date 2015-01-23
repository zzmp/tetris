var gravity = require('../../../src/board/gravity')
var should = require('chai').should()

describe('gravity', function() {
  it('should include simple', function() {
    gravity.should.have.property('simple')
  })
})
