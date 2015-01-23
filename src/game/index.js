var Board = require('./Board')
// Ideally, this would be a random tetromino, but this is a simplified case
var O = require('./tetrominos').O

/* command enums
 * These cannot be objects because the loader changes references across modules, I think...
 */
var left = 'left'
var right = 'right'
var rotate = 'rotate'
var drop = 'drop'

module.exports = {
  Game: Game,
  left: left,
  right: right,
  rotate: rotate,
  drop: drop
}

function Game() {
  this.board = new Board()
  this.currentTetromino = new O()
  this.board.tetrominos.push(this.currentTetromino)
}

Game.prototype.advance = function(command) {
  if (command) {
    if (command === left) {

    } else if (command === right) {

    } else if (command === rotate) {
      this.currentTetromino.rotate()
    } else if (command === drop) {
      while(this.board.fall()) {}
      this.currentTetromino = new O()
      this.board.tetrominos.push(this.currentTetromino)
    } else {
      throw new Error('Unknown command')
    }

    return stringifyBoard.call(this) // easy spin!
  }

  var result = this.board.fall()
  if (!result) {
    this.currentTetromino = new O()
    this.board.tetrominos.push(this.currentTetromino)
  }
  return stringifyBoard.call(this)
}

function stringifyBoard() {
  return this.board.array
    .map(function(row) {
      return row
        .map(function(cell) {
          if (cell === null) return ' '
          else return cell
        }).join('')
    }).join('\n')
}