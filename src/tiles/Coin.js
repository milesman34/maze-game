import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
const Coin = ({level = {}, path, score=1} = {}) => {
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