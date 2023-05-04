import { MazeObjectType } from "../enums"
import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
const Wall = ({path, level = {}}) => {
    let tile = Tile({path, level, solid: true});

    return tile;
}

export default Wall;