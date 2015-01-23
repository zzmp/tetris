module.exports = {
  Tetromino: Tetromino,
  O: O
}

function Tetromino() {

}

function O() {
  Tetromino.call(this)
  this.color = 'Y'
  this.points = [
    [0, 4],
    [0, 5],
    [1, 4],
    [1, 5]
  ]
}

O.prototype = Object.create(Tetromino.prototype)
O.prototype.rotate = function() {/* noop */}
