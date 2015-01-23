var Tetromino = require('../../../src/game/tetrominos/Tetromino')
var O = require('../../../src/game/tetrominos/O')
var should = require('chai').should()
var sinon = require('sinon')

describe('O', function() {

  it('should be an O constructor', function() {
    (new O()).should.be.instanceOf(O)
  })

  describe('instance', function() {
    var o

    beforeEach(function() {
      o = new O()
    })

    it('should be a Tetromino', function() {
      o.should.be.an.instanceOf(Tetromino)
    })

    describe('properties', function() {
      describe('.color', function() {
        it('should be Y', function() {
          o.color.should.eql('Y')
        })
      })
      describe('.points', function() {
        it('should be an array', function() {
          o.points.should.be.an('array')
        })
        it('should describe a centered O', function() {
          o.points.should.have.length(4)
          var points = JSON.stringify(o.points)
          points.should.eql(JSON.stringify([
            [0, 4],
            [0, 5],
            [1, 4],
            [1, 5]
          ]))
        })
      })
    })

    describe('methods', function() {
      describe('.rotate', function() {
        it('should not change points', function() {
          var points = o.points
          o.rotate()
          o.points.should.eql(points)
        })
      })
    })
  })
})
