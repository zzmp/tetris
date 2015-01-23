var simple = require('../../../src/game/gravity/simple')
var should = require('chai').should()

describe('simple', function() {
  var mockBoard
  var mockO

  beforeEach(function() {
    mockO = {
      color: 'Y',
      points: [
        [0, 4],
        [0, 5],
        [1, 4],
        [1, 5]
      ]
    }
    mockBoard = {
      tetrominos: [mockO],
      array: [
        [null, null, null, null, 'Y', 'Y', null, null, null, null],
        [null, null, null, null, 'Y', 'Y', null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
      ]
    }
  })


  it('should be a function', function() {
    simple.should.be.a('function')
  })

  describe('tetromino actions', function() {
    describe('tetrominos to move', function() {
      it('should move all tetrominos down', function() {
        simple.call(mockBoard)
        var points = JSON.stringify(mockBoard.tetrominos[0].points)
        points.should.eql(JSON.stringify([
          [1, 4],
          [1, 5],
          [2, 4],
          [2, 5]
        ]))
      })
      it('should not move tetrominos if they are blocked in part', function() {
        mockBoard.array[2][5] = 'Y'
        simple.call(mockBoard)
        var points = JSON.stringify(mockBoard.tetrominos[0].points)
        points.should.eql(JSON.stringify([
          [0, 4],
          [0, 5],
          [1, 4],
          [1, 5]
        ]))
      })
      it('should return true', function() {
        var result = simple.call(mockBoard)
        result.should.be.true
      })
    })

    describe('no tetrominos to move', function() {
      it('should return false', function() {
        mockBoard.tetrominos = []
        var result = simple.call(mockBoard)
        result.should.be.false
      })
    })
  })

  describe('underlying board actions', function() {
    it('should mirror tetromino movement on the underlying array', function() {
      simple.call(mockBoard)
      var row0 = mockBoard.array[0].join(',')
      var row1 = mockBoard.array[1].join(',')
      var row2 = mockBoard.array[2].join(',')
      var row3 = mockBoard.array[3].join(',')
      row0.should.eql(',,,,,,,,,')
      row1.should.eql(',,,,Y,Y,,,,')
      row2.should.eql(',,,,Y,Y,,,,')
      row3.should.eql(',,,,,,,,,')
    })
  })
})
