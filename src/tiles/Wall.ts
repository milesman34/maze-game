import { Room } from "../rooms/Room";
import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
type Wall = Tile;

type WallParams = {
    path: string,
    room?: Room
}

const Wall = ({path, room = null}: WallParams): Wall => {
    let tile = Tile({path, room, solid: true});

    return tile;
}

export default Wall;