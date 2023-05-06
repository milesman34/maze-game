import { Level } from "../levels/Level";
import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
type Coin = Tile;

type CoinParams = {
    level?: Level,
    path: string,
    score?: number
}

const Coin = ({level = null, path, score=1}: CoinParams): Coin => {
    let tile = Tile({
        path,
        level, 
        solid: false, 

        handleCollision() {
            this.game.addScore(score);
            this.destroy();
        }
    });

    return tile;
}

export default Coin;