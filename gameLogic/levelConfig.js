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
                },
                {
                    goto: "nextLevel",
                    position: door.defaultPositions.right,
                    constructor: doorModel.ArrowDoor,
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

function randomPos(data, enemySize) {
    let playerStartignPos = {
        x: data.startingPosition.x,
        y: data.startingPosition.y
    };

    const minX = data.enviroment.roomPos.x + enemySize + playerStartignPos.x;
    const maxX = data.enviroment.roomPos.x + data.enviroment.size.w - enemySize;
    const minY = data.enviroment.roomPos.y;
    const maxY = data.enviroment.roomPos.y + data.enviroment.size.h - enemySize;

    let pos = {
        x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
        y: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
    };

    return pos;
 
}

function enemyGenerator(level, data) {
    let enemyArray = [];
    let enemySize = 75
    let type = null;
    
    const constructors = {
        stupid: enemys.StupidFuckingEnemy,
        random: enemys.RandomWalker,
        following: enemys.Following
    }

    if (Number.isInteger(level) == false) 
        return enemyArray;
    
    if (level <= 9) {
        type = constructors.following
    }
    
    if (level <= 6) {
        type = constructors.random
    }

    if (level <= 3) {
        type = constructors.stupid
    }


    if (level < 10) {
        for (let i = 0; i < ((level-1)%3) + 1; i++) {       
            const position = randomPos(data, enemySize);
            enemyArray.push({
                    x: position.x,
                    y: position.y,
                    size: enemySize,
                    constructor: type
                }
            );
        }
    }

    return enemyArray;
}

export function getConfig(level) {
    let config = {}, data;
    
    if (Number.isInteger(level)) {
        
        data = Object.values(levels).find(lvl => lvl.label === "normal");
    }
    else {
        data = Object.values(levels).find(lvl => lvl.label === level);
    }
    
    config.enemys = enemyGenerator(level, data);

    config.playerModelConstructor = PlayerModel;
    
    config.data = data;

    return config;
}