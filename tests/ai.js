var game = require('../src/game')
var ai = require('../src/ai')
var Game = game.Game
var left = game.left
var right = game.right
var rotate = game.rotate
var drop = game.drop

describe('ai', function() {
  var game

  beforeEach(function() {
    game = new Game()
  })


  describe('play', function() {
    describe('go as far left as possible without stacking', function() {
      it('for YY________, should do [<,<,D]', function() {
        game.advance(left)
        game.advance(left)
        game.advance(left)
        game.advance(left)
        var board = game.advance(drop)
        var result = JSON.stringify(ai(board))
        result.should.eql(JSON.stringify([
          'left', 'left', 'drop'
        ]))
      })
      it('for YYYY______, should do [D]', function() {
        game.advance(left)
        game.advance(left)
        game.advance(left)
        game.advance(left)
        game.advance(drop)
        game.advance(left)
        game.advance(left)
        var board = game.advance(drop)
        var result = JSON.stringify(ai(board))
        result.should.eql(JSON.stringify([
          'drop'
        ]))
      })
      it('for YYYYYYYY__, should do [>,>,>,>D]', function() {
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
        var board = game.advance(drop)
        var result = JSON.stringify(ai(board))
        result.should.eql(JSON.stringify([
          'right', 'right', 'right', 'right', 'drop'
        ]))
      })
    })
  })
})
