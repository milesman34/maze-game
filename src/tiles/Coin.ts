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

        handleCollision() {
            this.game.addScore(score);
            this.destroy();
        }
    });

    return tile;
}

export default Coin;