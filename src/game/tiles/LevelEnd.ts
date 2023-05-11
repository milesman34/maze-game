import { ObjectType } from "../../utils/enums";
import { Room } from "../rooms/Room";
import Tile from "./Tile";

// This object represents the end of a level
type LevelEnd = Tile;

const LevelEnd = (room: Room = null): LevelEnd => {
    let tile = Tile({
        path: "./assets/level_end.png",
        room, 
        solid: false, 
        type: ObjectType.LevelEnd,

        handleCollision() {
            alert("You win!");
        }
    });

    return tile;
}

export default LevelEnd;