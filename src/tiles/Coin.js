import Tile from "./Tile";

// This object represents a wall in the game, so it has collision
const Coin = ({level = {}} = {}) => {
    let tile = Tile({
        path: './assets/tiles/coin.png', 
        level, 
        solid: false, 

        handleCollision() {
            this.game.addScore(1);
            this.destroy();
        }
    });

    return tile;
}

export default Coin;