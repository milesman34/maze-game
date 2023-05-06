import * as PIXI from "pixi.js";
import * as constants from "./constants";

// Initialize app
const app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

export default app;