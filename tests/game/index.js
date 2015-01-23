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

    xdescribe('properties', function() {
      describe('next', function() {
        it('should name a tetromino', function() {
          // For now, only O is available
          game.next.should.eql('O')
        })
      })
      describe('score', function() {
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
        // Note: the only possible tetronimo is O, so it is used for all tests
        //   whew! major simplification
        describe('without commands', function() {
          it('should return a stringified board', function() {
            var result = game.advance()
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
          it('should advance', function() {
            game.advance()
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
        })

        describe('with commands', function() {
          describe('left', function() {
            it('should move the tetronimo left', function() {
              var result = game.advance()
              result.should.eql([
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
                  '          ',
                  '          '
                ].join('\n')
              )
            })
          })
          describe('right', function() {
            it('should move the tetronimo right', function() {
              var result = game.advance()
              result.should.eql([
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
                  '          ',
                  '          '
                ].join('\n')
            )
          })
          describe('rotate', function() {
            it('should freeze the tetronimo: easy spin!', function() {
              var result = game.advance()
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
            it('should move the tetronimo to the bottom', function() {
              var result = game.advance()
              result.should.eql([
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
                  '          ',
                  '    YY    ',
                  '    YY    '
                ].join('\n')
              )
            })
          })
        })

        xit('should return false if the game is lost', function() {
          // TODO: This is out of scope for this code challenge
        })
      })
    })
  })
})
