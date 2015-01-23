var tetrominos = require('../../src/board/tetrominos')
var Tetromino = tetrominos.Tetromino
var O = tetrominos.O
var should = require('chai').should()
var sinon = require('sinon')

describe('tetrominos', function() {

  describe('Tetromino', function() {

    it('should be a Tetromino constructor', function() {
      (new Tetromino()).should.be.instanceOf(Tetromino)
    })
  })

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
            o.points.should.contain([0, 4])
            o.points.should.contain([0, 5])
            o.points.should.contain([1, 4])
            o.points.should.contain([1, 5])
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
})