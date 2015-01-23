module.exports = Tetromino

function Tetromino() {}

Tetromino.prototype.left = function() {
  return move.call(this, -1)
}

Tetromino.prototype.right = function() {
  return move.call(this, 1)
}

Tetromino.prototype.down = function() {
  return move.call(this, 1, true)
}

function move(increment, isVertical) {
  var self = this
  var isChanged = false

  // if the tetromino has empty space adjacent
  if (this.points
    // reduce the tetromino to its extreme points
    .reduce(function(points, point) {
      /* This abuses a feature of the built-in array functions:
       * if an index is not set, it will not be iterated over.
       */
      var row = point[0]
      var col = point[1]
      var ext
      if (isVertical) {
        ext = points[col] ?
          Math.max(points[col], row) :
          row
      } else {
        ext = points[row] ?
          Math[~increment ? 'max' : 'min'](points[row], col) :
          col
      }

      points[isVertical ? col : row] = ext
      return points
    }, [])
    // check the adjacent points
    .every(function(j, k) { // see note on L13 on feature abuse
      var row, col
      j += increment
      if (isVertical) row = j, col = k
      else row = k, col = j
      return self.array[row][col] === null
    })
  ) {
    // then move the tetromino down
    var toggles = {}
    self.points = self.points.map(function(point) {
      var row = point[0]
      var col = point[1]

      /* cache toggles
       * Caching allows us to toggle regardless of order,
       * so that we don't accidentally switch a cell off that a later point moves into.
       * The key is stringified, so we may use the coordinate tuple.
       */
      toggles[[row, col]] = toggles[[row, col]] || false
      if (isVertical) {
        toggles[[row + increment, col]] = true
        return [row + increment, col]
      } else {
        toggles[[row, col + increment]] = true
        return [row, col + increment]
      }
    })

    // replay toggles on the underlying array
    Object.keys(toggles).forEach(function(coordinate) {
      var val = toggles[coordinate]
      coordinate = coordinate.split(',')
      var row = coordinate[0]
      var col = coordinate[1]

      if (val) self.array[row][col] = self.color
      else self.array[row][col] = null
    })

    isChanged = true
  }

  return isChanged
}