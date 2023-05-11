import { ObjectType } from "../../utils/enums";
import { Room } from "../rooms/Room";
import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
type Coin = Tile;

type CoinParams = {
    room?: Room,
    path: string,
    score?: number
}

const Coin = ({room = null, path, score=1}: CoinParams): Coin => {
    let tile = Tile({
        path,
        room, 
        solid: false, 
        type: ObjectType.Coin,

        handleCollision() {
            this.level.addScore(score);
            this.destroy();
        }
    });

    return tile;
}

export default Coin;