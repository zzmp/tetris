Tetris
===

Currently, this game does not:
- keep score
- use any piece but the O
- accept input except on a turn-by-turn basis

---

## Usage

To see a bot play tetris, type `npm start > log`.

Be sure to stop it fairly quickly, as play is fast. Then, check the `log` file you've piped to for the new-line separated boards at each turn.

## Testing

To run tests, type `npm test`.

Tests will be run as a watch script.

This was developed using TDD.
The game's mechanics are unit tested.
The actual gameplay, as well as the ai, are tested behaviorally, in more of a black-box and less rigorous fashion.
