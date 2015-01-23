var game = require('./game')

var left = game.left
var right = game.right
var rotate = game.rotate
var drop = game.drop

module.exports = function(board) {
  var rowIx, colIx
  var results = []
  // Parse the board
  var array = board
    .split('\n')
    .map(function(row) {
      return row
        .split('')
        .map(function(cell) {
          // true spaces mark open paths
          return cell === ' ' ? true : false
        })
    })
  var rows = array.length
  var cols = array[0].length

  // Find the active block
  var rowInPlay
  for (rowIx = 0; rowIx < rows; rowIx++) {
    for (colIx = 0; colIx < cols; colIx++)
      if (!array[rowIx][colIx]) {
        rowInPlay = rowIx + 1
        break
      }
    if (rowInPlay) break
  }

  // Find the furthest left path for an O tetromino
  valids = 0
  for (colIx = 0; colIx < cols; colIx++) {
    // New blocks take the first 2 rows
    for (rowIx = rows - 1; rowIx > rowInPlay; rowIx--)
      if (!array[rowIx][colIx]) break
    if (rowIx === rowInPlay) valids++
    else valids = 0
    if (valids === 2) break
  }

  // if there is a solution
  if (colIx !== cols) {
    // new O tetromino starts with right edge at column 5
    if (colIx < 5) {
      while (5 - colIx++)
        results.push(left)
    } else if (colIx > 5) {
      while (colIx-- - 5)
        results.push(right)
    }
  }

  results.push(drop)
  return results
}