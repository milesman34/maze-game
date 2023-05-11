// Enum that represents the game state
enum GameState {
    Title,
    Game
}

// Direction enum
enum Direction {
    Left,
    Right,
    Up,
    Down
}

// Object type, assigned to each subclass of Tile
enum ObjectType {
    Default,
    Wall,
    Coin,
    Key,
    Lock
}

export {
    Direction,
    GameState,
    ObjectType
}