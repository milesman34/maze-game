import * as PIXI from "pixi.js";
import * as constants from "./utils/constants";

// Initialize app
const app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

export default app;