import { Level } from "../levels/Level";
import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
type Wall = Tile;

type WallParams = {
    path: string,
    level?: Level
}

const Wall = ({path, level = null}: WallParams): Wall => {
    let tile = Tile({path, level, solid: true});

    return tile;
}

export default Wall;