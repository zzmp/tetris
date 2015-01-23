// These are behavioral tests (versus the mostly unit tests for other modules)
var game = require('../../src/game')
var Game = game.Game
var left = game.left
var right = game.right
var rotate = game.rotate
var drop = game.drop

describe('Game', function() {

  it('should be a Game constructor', function() {
    (new Game()).should.be.instanceOf(Game)
  })

  describe('instance', function() {
    var game

    beforeEach(function() {
      game = new Game()
    })

    describe('properties', function() {
      describe('commands', function() {
        it('should have left', function() {
          should.exist(left)
        })
        it('should have right', function() {
          should.exist(right)
        })
        it('should have rotate', function() {
          should.exist(rotate)
        })
        it('should have drop', function() {
          should.exist(drop)
        })
      })
      xdescribe('next', function() {
        it('should name a tetromino', function() {
          // For now, only O is available
          game.next.should.eql('O')
        })
      })
      xdescribe('score', function() {
        it('should start at 0', function() {
          game.score.should.eql(0)
        })
        xit('should increment with every row clear', function() {
          // TODO: This is out of scope for this code challenge
        })
      })
    })

    describe('methods', function() {
      describe('advance', function() {
        // Note: the only possible tetromino is O, so it is used for all tests
        //   whew! major simplification
        describe('without commands', function() {
          it('should return a stringified board', function() {
            var result = game.advance()
            result.should.eql([
                '          ',
                '    YY    ',
                '    YY    ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          '
              ].join('\n')
            )
          })
          it('should advance', function() {
            game.advance()
            var result = game.advance()
            result.should.eql([
                '          ',
                '          ',
                '    YY    ',
                '    YY    ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          '
              ].join('\n')
            )
          })
        })

        describe('with commands', function() {
          describe('left', function() {
            it('should move the tetromino left', function() {
              var result = game.advance(left)
              result.should.eql([
                  '          ',
                  '   YY     ',
                  '   YY     ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          '
                ].join('\n')
              )
            })
          })
          describe('right', function() {
            it('should move the tetromino right', function() {
              var result = game.advance(right)
              result.should.eql([
                  '          ',
                  '     YY   ',
                  '     YY   ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          '
                ].join('\n')
              )
            })
          })
          describe('rotate', function() {
            it('should freeze the tetromino: easy spin!', function() {
              var result = game.advance(rotate)
              result.should.eql([
                  '    YY    ',
                  '    YY    ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          '
                ].join('\n')
              )
            })
          })
          describe('drop', function() {
            it('should move the tetromino to the bottom', function() {
              var result = game.advance(drop)
              result.should.eql([
                  '    YY    ',
                  '    YY    ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '          ',
                  '    YY    ',
                  '    YY    '
                ].join('\n')
              )
            })
          })
        })

        describe('clearing', function() {
          it('should clear on a full row', function() {
            game.advance(left)
            game.advance(left)
            game.advance(left)
            game.advance(left)
            game.advance(drop)
            game.advance(left)
            game.advance(left)
            game.advance(drop)
            game.advance(drop)
            game.advance(right)
            game.advance(right)
            game.advance(drop)
            game.advance(right)
            game.advance(right)
            game.advance(right)
            game.advance(right)
            var result = game.advance(drop)
            result.should.eql([
                '    YY    ',
                '    YY    ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          ',
                '          '
              ].join('\n')
            )
          })
        })

        xit('should return false if the game is lost', function() {
          // TODO: This is out of scope for this code challenge
        })
      })
    })
  })
})
