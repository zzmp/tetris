var Tetromino = require('../../src/game/tetrominos/Tetromino')
var should = require('chai').should()
var sinon = require('sinon')

describe('Tetromino', function() {

  it('should be a Tetromino constructor', function() {
    (new Tetromino()).should.be.instanceOf(Tetromino)
  })

  describe('instance', function() {
    describe('methods', function() {
      var mockBoard
      var mockO

      beforeEach(function() {
        mockO = new Tetromino()
        mockO.color = 'Y'
        mockO.points = [
          [0, 4],
          [0, 5],
          [1, 4],
          [1, 5]
        ]

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

      describe('left', function() {
        describe('tetromino actions', function() {
          describe('tetrominos to move', function() {
            it('should move all tetrominos left', function() {
              mockO.left(mockBoard.array)
              var points = JSON.stringify(mockBoard.tetrominos[0].points)
              points.should.eql(JSON.stringify([
                [0, 3],
                [0, 4],
                [1, 3],
                [1, 4]
              ]))
            })
            it('should not move tetrominos if they are blocked in part', function() {
              mockBoard.array[1][3] = 'Y'
              mockO.left(mockBoard.array)
              var points = JSON.stringify(mockBoard.tetrominos[0].points)
              points.should.eql(JSON.stringify([
                [0, 4],
                [0, 5],
                [1, 4],
                [1, 5]
              ]))
            })
            it('should return true', function() {
              var result = mockO.left(mockBoard.array)
              result.should.be.true
            })
          })

          describe('no tetrominos to move', function() {
            it('should return false', function() {
              mockBoard.tetrominos = []
              var result = mockO.left(mockBoard.array)
              result.should.be.false
            })
          })
        })

        describe('underlying board actions', function() {
          it('should mirror tetromino movement on the underlying array', function() {
            mockO.left(mockBoard.array)
            var row0 = mockBoard.array[0].join(',')
            var row1 = mockBoard.array[1].join(',')
            var row2 = mockBoard.array[2].join(',')
            row0.should.eql(',,,Y,Y,,,,,')
            row1.should.eql(',,,Y,Y,,,,,')
            row2.should.eql(',,,,,,,,,')
          })
        })
      })

      describe('right', function() {
        describe('tetromino actions', function() {
          describe('tetrominos to move', function() {
            it('should move all tetrominos right', function() {
              mockO.right(mockBoard.array)
              var points = JSON.stringify(mockBoard.tetrominos[0].points)
              points.should.eql(JSON.stringify([
                [0, 5],
                [0, 6],
                [1, 5],
                [1, 6]
              ]))
            })
            it('should not move tetrominos if they are blocked in part', function() {
              mockBoard.array[1][6] = 'Y'
              mockO.right(mockBoard.array)
              var points = JSON.stringify(mockBoard.tetrominos[0].points)
              points.should.eql(JSON.stringify([
                [0, 4],
                [0, 5],
                [1, 4],
                [1, 5]
              ]))
            })
            it('should return true', function() {
              var result = mockO.right(mockBoard.array)
              result.should.be.true
            })
          })

          describe('no tetrominos to move', function() {
            it('should return false', function() {
              mockBoard.tetrominos = []
              var result = mockO.right(mockBoard.array)
              result.should.be.false
            })
          })
        })

        describe('underlying board actions', function() {
          it('should mirror tetromino movement on the underlying array', function() {
            mockO.right(mockBoard.array)
            var row0 = mockBoard.array[0].join(',')
            var row1 = mockBoard.array[1].join(',')
            var row2 = mockBoard.array[2].join(',')
            row0.should.eql(',,,,,Y,Y,,,')
            row1.should.eql(',,,,,Y,Y,,,')
            row2.should.eql(',,,,,,,,,')
          })
        })
      })

      describe('down', function() {
        describe('tetromino actions', function() {
          describe('tetrominos to move', function() {
            it('should move all tetrominos down', function() {
              mockO.down(mockBoard.array)
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
              mockO.down(mockBoard.array)
              var points = JSON.stringify(mockBoard.tetrominos[0].points)
              points.should.eql(JSON.stringify([
                [0, 4],
                [0, 5],
                [1, 4],
                [1, 5]
              ]))
            })
            it('should return true', function() {
              var result = mockO.down(mockBoard.array)
              result.should.be.true
            })
          })

          describe('no tetrominos to move', function() {
            it('should return false', function() {
              mockBoard.tetrominos = []
              var result = mockO.down(mockBoard.array)
              result.should.be.false
            })
          })
        })

        describe('underlying board actions', function() {
          it('should mirror tetromino movement on the underlying array', function() {
            mockO.down(mockBoard.array)
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
    })
  })
})
