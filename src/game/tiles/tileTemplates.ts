import Coin from "./Coin";
import Wall from "./Wall";

// This file contains a list of template objects to be used for level design
const standardWall = Wall({
    path: "./assets/tiles/standard_wall.png"
});

const standardCoin = Coin({
    path: "./assets/tiles/coin.png",
    score: 1
});

const blueCoin = Coin({
    path: "./assets/tiles/blue_coin.png",
    score: 5
});

export {
    standardWall,
    standardCoin,
    blueCoin
}