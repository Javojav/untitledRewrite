import { Game } from './gameLogic/game.js';

new p5(
    p5 => {
        let game;

        p5.setup = () => {
            p5.createCanvas(800, 600);
            game = new Game(p5);
        }

        p5.draw = () => {
            game.update(p5);
        }
    }
);