module.exports = function() {
  var self = this
  var isChanged = false

  /* tetrominos are added in order,
   * so we may observe that lower tetrominos will always be first in the queue.
   * Thus, we only need to loop the array once,
   * and it will be as if the tetrominos move _in unison_!
   */
  self.tetrominos.map(function(tetromino) {
    // if the tetromino has empty space below it
    if (tetromino.points
      // reduce the tetromino to its bottom-most points
      .reduce(function(lowPoints, point) {
        /* This abuses a feature of the built-in array functions:
         * if an index is not set, it will not be iterated over.
         */
        var row = point[0]
        var col = point[1]
        var lowRow = lowPoints[col] ?
          Math.max(lowPoints[col], row) :
          row

        lowPoints[col] = lowRow
        return lowPoints
      }, [])
      // check the next points down
      .every(function(row, col) { // see note on L14 on feature abuse
        return self.array[row + 1][col] === null
      })
    ) {
      var toggles = {}
    // then move the tetromino down
      tetromino.points = tetromino.points.map(function(point) {
        var row = point[0]
        var col = point[1]

        /* cache toggles
         * Caching allows us to toggle regardless of order,
         * so that we don't accidentally switch a cell off that a later point moves into.
         * The key is stringified, so we may use the coordinate tuple.
         */
        toggles[[row, col]] = toggles[[row, col]] || false
        toggles[[row + 1, col]] = true

        return [row + 1, col]
      })

      // replay toggles on the underlying array
      Object.keys(toggles).forEach(function(coordinate) {
        var val = toggles[coordinate]
        coordinate = coordinate.split(',')
        var row = coordinate[0]
        var col = coordinate[1]

        if (val) self.array[row][col] = tetromino.color
        else self.array[row][col] = null
      })

      isChanged = true
    }

    return tetromino
  })

  return isChanged
}