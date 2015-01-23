var Board = require('../../src/board/Board')
var should = require('chai').should()
var sinon = require('sinon')

describe('Board', function() {

  it('should be a Board constructor', function() {
    (new Board()).should.be.instanceOf(Board)
  })

  xdescribe('Board constructor', function() {
    it('should accept a gravity function', function() {})
    it('should default to the original gravity function', function() {})
  })

  describe('Board instance', function() {
    var board

    beforeEach(function() {
      board = new Board()
    })

    describe('properties', function() {
      describe('.tetrominos', function() {
        it('should be an array', function() {})
        it('should contain tetrominos on the board', function() {})
      })
    })

    describe('methods', function() {

      describe('.fall', function() {
        it('should call the gravity function on the board', function() {})
        it('should propagate the result of the gravity function', function() {})
      })

      describe('.isAlive', function() {
        describe('losing board', function() {
          it('should return false', function() {})
        })
        describe('live board', function() {
          it('should return true', function() {})
        })
      })

      describe('.check', function() {
        describe('no clearable rows', function() {
          it('should return an empty array', function() {})
        })
        describe('one clearable row', function() {
          it('should return an array of row indices to clear', function() {})
        })
        describe('tetris', function() {
          it('should return an array of row indices to clear', function() {})
        })
      })

      describe('.clear', function() {
        describe('one clearable row', function() {
          it('should clear the row', function() {})
          it('should modify the affected tetrominos', function() {})
        })
        describe('tetris', function() {
          it('should clear the rows', function() {})
          it('should modify the affected tetrominos', function() {})
          it('should delete the cleared tetrominos', function() {})
        })
      })
    })
  })
})