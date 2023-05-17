import * as walls from "../enviroment/wall.js";
import * as floors from "../enviroment/floor.js";

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
        },
        doors: {
            top: "shop"
        }
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
            wallConstructor: walls.Shop,
            floorConstructor: floors.Concrete,
        },
        doors: {
            top: "entrada" //cambiar esto tu
        }
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