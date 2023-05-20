import * as walls from "../enviroment/wall.js";
import * as floors from "../enviroment/floor.js";
import * as doorModel from "../enviroment/door.js";
import * as door from "../entities/door.js";
import { PlayerModel } from "../enviroment/humanoid.js";
import { directions, width , height } from "../constants.js";
import * as enemys from "../entities/enemy.js";

const levels = {
    entrada: {
        label: "entrada",
        startingPosition: {
            x: width/2,
            y: height/2,
            facing: directions.right
        },
        enviroment: {
            size: {
                w: 650,
                h: 450
            },
            roomPos: {
                x: 75,
                y: 75
            },
            wallConstructor: walls.Brick,
            floorConstructor: floors.Concrete,
            doors: [
                {
                    goto: "shop",
                    position: door.defaultPositions.top,
                    constructor: doorModel.ShopDoor,
                    defaultOpen: true
                },
                {
                    goto: "nextLevel",
                    position: door.defaultPositions.right,
                    constructor: doorModel.ArrowDoor,
                    defaultOpen: true
                }
            ]
        },
    },
    shop: {
        label: "shop",
        startingPosition: {
            x: width/2,
            y: 300,
            facing: directions.right
        },
        enviroment: {
            size: {
                w: 650,
                h: 250
            },
            roomPos: {
                x: 75,
                y: 275
            },
            doors: [
                {
                    goto: "return",
                    position: door.defaultPositions.bottom,
                    constructor: doorModel.ReturnDoor,
                    defaultOpen: true
                }
            ],
            wallConstructor: walls.Shop,
            floorConstructor: floors.Wood,
        },
    },
    normal: {
        label: "normal",
        startingPosition: {
            x: 87,
            y: height/2,
            facing: directions.right
        },
        enviroment: {
            size: {
                w: 650,
                h: 450
            },
            roomPos: {
                x: 75,
                y: 75
            },
            wallConstructor: walls.Brick,
            floorConstructor: floors.Concrete,
            doors: [
                {
                    goto: "shop",
                    position: door.defaultPositions.top,
                    constructor: doorModel.ShopDoor,
                    defaultOpen: true
                },
                {
                    goto: "nextLevel",
                    position: door.defaultPositions.right,
                    constructor: doorModel.ArrowDoor,
                    defaultOpen: true
                },
                {
                    goto: null,
                    position: door.defaultPositions.left,
                    constructor: doorModel.Door,
                    defaultOpen: false
                },
            ],
        },
    },
};

export function getConfig(level) {
    let config = {}, data;
    
    if (Number.isInteger(level)) {
        
        data = Object.values(levels).find(lvl => lvl.label === "normal");
    }
    else {
        data = Object.values(levels).find(lvl => lvl.label === level);
    }
    
    config.enemys = [{
        x: 300,
        y: 300,
        size: 75,
        constructor: enemys.StupidFuckingEnemy
    }];

    config.playerModelConstructor = PlayerModel;
    
    config.data = data;

    return config;
}