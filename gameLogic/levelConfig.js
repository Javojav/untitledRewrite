import * as walls from "../enviroment/wall.js";
import * as floors from "../enviroment/floor.js";
import * as door from "../enviroment/door.js";

const levels = {
    entrada: {
        label: "entrada",
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
            floorConstructor: floors.Wood,
            doors: [
                {
                    goto: "entrada",
                    position: door.defaultPositions.top,
                    constructor: door.Door
                },
                {
                    goto: "entrada",
                    position: door.defaultPositions.bottom,
                    constructor: door.Door
                },
                {
                    goto: "entrada",
                    position: door.defaultPositions.left,
                    constructor: door.Door
                },
                {
                    goto: "entrada",
                    position: door.defaultPositions.right,
                    constructor: door.Door
                }
            ]
        },
    },
    shop: {
        label: "shop",
        enviroment: {
            size: {
                w: 650,
                h: 300
            },
            roomPos: {
                x: 75,
                y: 250
            },
            doors: [
                {
                    goto: "entrada",
                    position: door.defaultPositions.top,
                }
            ],
            wallConstructor: walls.Shop,
            floorConstructor: floors.Concrete,
        },
    }
};

export function getConfig(number, p5) {
    let config = {}, data;

    if (number == 0) {
        data = levels.entrada;
    }



    config.data = data;
    return config;
}