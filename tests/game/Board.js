var Board = require('../../src/game/Board')
var O = require('../../src/game/tetrominos').O
var should = require('chai').should()
var sinon = require('sinon')

describe('Board', function() {

  it('should be a Board constructor', function() {
    (new Board()).should.be.instanceOf(Board)
  })

  describe('Board instance', function() {
    var board

    beforeEach(function() {
      board = new Board()
    })

    describe('properties', function() {
      describe('.array', function() {
        it('should be an array of arrays', function() {
          board.array.should.be.an('array')
          board.array.forEach(function(row) {
            row.should.be.an('array')
          })
        })
        it('should be 10x22', function() {
          board.array.length.should.eql(22)
          board.array.forEach(function(row) {
            row.length.should.eql(10)
          })
        })
        it('should be initialized to null values', function() {
          board.array.forEach(function(row) {
            row.forEach(function(cell) {
              should.equal(cell, null)
            })
          })
        })
      })
      describe('.tetrominos', function() {
        it('should be an array', function() {
          board.tetrominos.should.be.an('array')
        })
        describe('.push', function() {
          it('should add a tetromino to the tetrominos array', function() {
            var o = new O()
            board.tetrominos.push(o)
            board.tetrominos.should.contain(o)
          })
          it('should add a tetromino to the underlying array', function() {
            board.tetrominos.push(new O())
            var row0 = board.array[0].join(',')
            var row1 = board.array[1].join(',')
            var row2 = board.array[2].join(',')
            row0.should.eql(',,,,Y,Y,,,,')
            row1.should.eql(',,,,Y,Y,,,,')
            row2.should.eql(',,,,,,,,,')
          })
          // They are essentially sibling classes - they are tightly coupled
          it('should add the underlying array to the tetrimo', function() {
            var o = new O()
            board.tetrominos.push(o)
            o.array.should.eql(board.array)
          })
        })
      })
    })

    describe('methods', function() {

      describe('.fall', function() {
        var o

        beforeEach(function() {
          o = new O()
          op = new O()
        })

        it('should call the down function of each tetromino on the board', function() {
          spy = sinon.spy()
          o.down = spy
          board.tetrominos.push(o)
          board.fall()
          spy.called.should.be.true
        })
        it('should return false if no tetromino down function does', function() {
          stub = sinon.stub().returns(false)
          o.down = stub
          board.tetrominos.push(o)
          board.fall().should.be.false
        })
        it('should return true if any tetromino down function does', function() {
          trueStub = sinon.stub().returns(true)
          falseStub = sinon.stub().returns(false)
          o.down = trueStub
          op.down = falseStub
          board.tetrominos.push(o)
          board.tetrominos.push(op)
          board.fall().should.be.true
        })
        it('should not remove the push method from .tetrominos', function() {
          var push = board.tetrominos.push
          board.fall()
          push.should.eql(board.tetrominos.push)
        })
      })

      describe('.isAlive', function() {
        describe('losing board', function() {
          it('should return false', function() {
            board.array[0][0] = 'Y'
            board.isAlive().should.be.false
          })
        })
        describe('live board', function() {
          it('should return true', function() {
            // Populate every valid cell
            board.array.forEach(function(row, ix) {
              if (ix > 1) {
                row.map(function(cell) {
                  cell = 'Y'
                })
              }
            })
            board.isAlive().should.be.true
          })
        })
      })

      describe('.check', function() {
        describe('no clearable rows', function() {
          it('should return an empty array', function() {
            var result = board.check()
            result.should.be.an('array')
            result.should.have.length(0)
          })
        })
        describe('one clearable row', function() {
          it('should return an array of row indices to clear', function() {
            var clearableRow = []
            for (var ix = 0; ix < 10; ix++)
              clearableRow.push('Y')
            board.array[21] = clearableRow
            var result = board.check()
            result.should.be.an('array')
            result.should.have.length(1)
            result.should.contain(21)
          })
        })
        describe('tetris', function() {
          it('should return an array of row indices to clear', function() {
            var clearableRow18 = []
            var clearableRow19 = []
            var clearableRow20 = []
            var clearableRow21 = []
            for (var ix = 0; ix < 10; ix++)
              clearableRow18.push('Y'), clearableRow19.push('Y'), clearableRow20.push('Y'), clearableRow21.push('Y')
            board.array[18] = clearableRow18
            board.array[19] = clearableRow19
            board.array[20] = clearableRow20
            board.array[21] = clearableRow21
            var result = board.check()
            result.should.be.an('array')
            result.should.have.length(4)
            result.should.contain(18)
            result.should.contain(19)
            result.should.contain(20)
            result.should.contain(21)
          })
        })
      })

      describe('.clear', function() {
        describe('one clearable row', function() {
          it('should clear the row', function() {
            var o = new O()
            board.tetrominos.push(o)
            board.clear([0])
            var row0 = board.array[0].join(',')
            row0.should.eql(',,,,,,,,,')
          })
          it('should modify the affected tetrominos', function() {
            var o = new O()
            board.tetrominos.push(o)
            board.clear([0])
            board.tetrominos.should.contain(o)
            // See ./tetrominos.js for the tetrominos API
            o.points.should.have.length(2)
            o.points[0][0].should.eql(1)
            o.points[1][0].should.eql(1)
          })
        })
        describe('clearable tetromino', function() {
          it('should clear the rows', function() {
            var o = new O()
            board.tetrominos.push(o)
            board.clear([0, 1])
            var row0 = board.array[0].join(',')
            var row1 = board.array[0].join(',')
            row0.should.eql(',,,,,,,,,')
            row1.should.eql(',,,,,,,,,')
          })
          it('should delete the cleared tetrominos', function() {
            var o = new O()
            board.tetrominos.push(o)
            board.clear([0, 1])
            board.tetrominos.should.not.contain(o)
          })
        })
      })
    })
  })
})