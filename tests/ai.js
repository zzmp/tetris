var game = require('../../src/game')
var ai = require('../../src/ai')
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
      it('for __________, should drop YY________ (<,<,<,<,D)', function() {
        ai(game.advance()).should.eql(left)
        ai(game.advance(left)).should.eql(left)
        ai(game.advance(left)).should.eql(left)
        ai(game.advance(left)).should.eql(left)
        ai(game.advance(left)).should.eql(drop)
      })
      it('for _YY_______, should drop _YYYY______ (<,D)', function() {
        game.advance(left)
        game.advance(left)
        game.advance(left)
        game.advance(drop)
        ai(game.advance()).should.eql(left)
        ai(game.advance(left)).should.eql(drop)
      })
    })
  })
})
