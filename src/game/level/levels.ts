import { LevelTemplate } from "./LevelTemplate";
import firstLevel from "./levels/firstLevel";
import locked from "./levels/locked";
import mini from "./levels/mini";
import portalTest1 from "./levels/portalTest1";
import portalTest2 from "./levels/portalTest2";
import spiral from "./levels/spiral";


const levels = LevelTemplate.makeTemplates([
    firstLevel,
    mini,
    spiral,
    portalTest1,
    portalTest2,
    locked
]);

export default levels