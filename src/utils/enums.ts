import { Point } from "./Point";

// Enum that represents the game state
enum GameState {
    Title,
    LevelSelect,
    LevelEnd,
    Game
}

// Direction enum
enum Direction {
    Left,
    Right,
    Up,
    Down
}

// Flips a direction
const flipDirection = (direction: Direction) => {
    switch (direction) {
        case Direction.Left:
        return Direction.Right;
        
        case Direction.Right:
        return Direction.Left;
        
        case Direction.Up:
        return Direction.Down;
        
        case Direction.Down:
        return Direction.Up;
    }
}

// Maps directions to point offsets
const directionOffsets = {
    [Direction.Left]: Point(-1, 0),
    [Direction.Right]: Point(1, 0),
    [Direction.Up]: Point(0, -1),
    [Direction.Down]: Point(0, 1)
}

// Object type, assigned to each subclass of Tile
enum ObjectType {
    Default,
    Wall,
    Coin,
    Key,
    Lock,
    LevelEnd,
    Portal
}

export {
    Direction,
    directionOffsets,
    flipDirection,
    GameState,
    ObjectType
}