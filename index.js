var tetris = require('./src/game')
var ai = require('./src/ai')

var Game = tetris.Game
var game = new Game()

var board = game.advance()
var moves

while(moves = ai(board)) {
  // Make process apparent
  process.stdout.write(board)
  process.stdout.write('\n')

  moves.forEach(function(move) {
    board = game.advance(move)
  })
}
