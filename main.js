import { Game } from './gameLogic/game.js';
import * as constants from './constants.js'

new p5(
    p5 => {
        let game;

        p5.setup = () => {
            p5.createCanvas(constants.width, constants.height);

            game = new Game(p5);
        }

        p5.draw = () => {
            game.update(p5);
        }
    }
);