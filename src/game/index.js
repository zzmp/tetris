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

Game.prototype.advance = advance

function advance(command) {
  var clearRows

  if (command === left) {
    if (!this.currentTetromino.left())
      return advance.call(this)
  } else if (command === right) {
    if (!this.currentTetromino.right())
      return advance.call(this)
  } else if (command === drop) {
    while(this.board.fall()) {/* noop */}
    return advance.call(this)
  } else if (command === rotate) {
    this.currentTetromino.rotate()
    return stringifyBoard.call(this) // easy spin!
  }

  var result = this.board.fall()
  if (!result) {
    // Clear any full rows
    clearRows = this.board.check()
    while (clearRows.length) {
      this.board.clear(clearRows)
      while (this.board.fall()) { /* noop */}
      clearRows = this.board.check()
    }
    // Introduce a new tetromino
    this.currentTetromino = new O()
    this.board.tetrominos.push(this.currentTetromino)
  }
  // Redraw the board
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