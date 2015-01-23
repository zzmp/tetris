var rows = 22
var cols = 10

module.exports = Board

function Board(gravity) {
  var self = this
  var colIx, rowIx, row

  this.array = []
  this.tetrominos = []

  for (rowIx = 0; rowIx < rows; rowIx++) {
    row = []
    for (colIx = 0; colIx < cols; colIx++)
      row.push(null)
    this.array.push(row)
  }

  this.tetrominos.push = function(tetromino) {
    // Add tetromino to the array
    [].push.call(self.tetrominos, tetromino)

    // Add array to tetromino - they are tightly coupled
    tetromino.array = self.array

    // Add tetromino points to underlying array
    tetromino.points.forEach(function(point) {
      var row = point[0]
      var col = point[1]

      self.array[row][col] = tetromino.color
    })
  }
}

Board.prototype.fall = function() {
  /* tetrominos are added in order,
   * so we may observe that lower tetrominos will always be first in the queue.
   * Thus, we only need to loop the array once,
   * and it will be as if the tetrominos move _in unison_!
   */
  var result = this.tetrominos
    .some(function(tetromino) {
      return tetromino.down()
    })
  return result
}

Board.prototype.isAlive = function() {
  var rowIx, colIx
  for (rowIx = 0; rowIx < 2; rowIx++)
    for (colIx = 0; colIx < cols; colIx++)
      if (this.array[rowIx][colIx])
        return false
  return true
}

Board.prototype.check = function() {
  var results = []
  var rowIx, colIx

  for (rowIx = 0; rowIx < rows; rowIx++) {
    var isFilled = true
    for (colIx = 0; colIx < cols; colIx++)
      if (!this.array[rowIx][colIx]) {
        isFilled = false
        break
      }
    if (isFilled) results.push(rowIx)
  }

  return results
}

Board.prototype.clear = function(rows) {
  var self = this
  var colIx

  rows.forEach(function(rowIx) {
    for (colIx = 0; colIx < cols; colIx++)
      self.array[rowIx][colIx] = null
  })

  self.tetrominos = self.tetrominos.filter(function(tetromino) {
    tetromino.points = tetromino.points.filter(function(point) {
      var row = point[0]
      // keep those points not in the cleared rows
      return !~rows.indexOf(row)
    })
    return tetromino.points.length
  })
}
