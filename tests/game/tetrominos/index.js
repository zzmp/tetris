var tetrominos = require('../../src/game/tetrominos')
var should = require('chai').should()

describe('tetrominos', function() {

  it('should contain O', function() {
    tetrominos.should.have.property('O')
  })
)}
